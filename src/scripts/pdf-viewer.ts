import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';
import { EventBus, PDFLinkService, PDFViewer } from 'pdfjs-dist/legacy/web/pdf_viewer.mjs';

const base = import.meta.env.BASE_URL.replace(/\/?$/, '/');
const assets = base + 'pdfjs/';
pdfjsLib.GlobalWorkerOptions.workerSrc = assets + 'pdf.worker.min.mjs';
const element = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;
const status = element('reader-status');
const errorPanel = element('reader-error');
const download = element<HTMLAnchorElement>('download-pdf');
const returnLink = element<HTMLAnchorElement>('return-link');
const pageNumber = element<HTMLInputElement>('page-number');
const previous = element<HTMLButtonElement>('previous-page');
const next = element<HTMLButtonElement>('next-page');
const zoomIn = element<HTMLButtonElement>('zoom-in');
const zoomOut = element<HTMLButtonElement>('zoom-out');
const fitWidth = element<HTMLButtonElement>('fit-width');
const params = new URLSearchParams(location.search);
const eventBus = new EventBus();
const linkService = new PDFLinkService({ eventBus, externalLinkTarget: 2, externalLinkRel: 'noopener noreferrer' });
const container = element('viewerContainer');
const viewer = new PDFViewer({
  container,
  eventBus,
  linkService,
  maxCanvasPixels: 8388608, // Bound memory use on phones; visible pages are rendered lazily.
});
linkService.setViewer(viewer);
let pdf: pdfjsLib.PDFDocumentProxy | undefined;
let file: URL;

function localUrl(value: string | null): URL | undefined {
  if (!value) return;
  try {
    const url = new URL(value, location.origin);
    if (url.origin === location.origin && url.pathname.startsWith(base) && !url.username && !url.password) return url;
  } catch { /* Show a readable error below for an invalid document address. */ }
}
function showError(message: string) {
  status.hidden = true;
  element('reader-error-text').textContent = message;
  errorPanel.hidden = false;
}
function updateControls() {
  if (!pdf) return;
  const page = viewer.currentPageNumber;
  if (document.activeElement !== pageNumber) pageNumber.value = String(page);
  previous.disabled = page <= 1;
  next.disabled = page >= pdf.numPages;
  element('zoom-level').textContent = Math.round(viewer.currentScale * 100) + '%';
  zoomOut.disabled = viewer.currentScale <= 0.25;
  zoomIn.disabled = viewer.currentScale >= 4;
}

const source = localUrl(params.get('return'));
if (source && source.pathname !== location.pathname) returnLink.href = source.href;

previous.addEventListener('click', () => { viewer.currentPageNumber = Math.max(1, viewer.currentPageNumber - 1); });
next.addEventListener('click', () => { if (pdf) viewer.currentPageNumber = Math.min(pdf.numPages, viewer.currentPageNumber + 1); });
function goToPage() {
  if (!pdf) return;
  const value = Number(pageNumber.value);
  if (Number.isInteger(value) && value >= 1 && value <= pdf.numPages) viewer.currentPageNumber = value;
  pageNumber.value = String(viewer.currentPageNumber);
  updateControls();
}
pageNumber.addEventListener('change', goToPage);
pageNumber.addEventListener('keydown', event => {
  if (event.key === 'Enter') { event.preventDefault(); goToPage(); pageNumber.blur(); }
});
zoomIn.addEventListener('click', () => { viewer.currentScale = Math.min(4, viewer.currentScale * 1.2); });
zoomOut.addEventListener('click', () => { viewer.currentScale = Math.max(0.25, viewer.currentScale / 1.2); });
fitWidth.addEventListener('click', () => { viewer.currentScaleValue = 'page-width'; });
element('retry').addEventListener('click', () => location.reload());
eventBus.on('pagechanging', updateControls);
eventBus.on('scalechanging', updateControls);
eventBus.on('pagesinit', () => {
  viewer.currentScaleValue = 'page-width';
  pageNumber.disabled = fitWidth.disabled = false;
  const hash = location.hash || file.hash;
  if (hash) linkService.setHash(hash.slice(1));
  updateControls();
});
eventBus.on('pagerendered', () => { status.hidden = true; });
let width = container.clientWidth;
new ResizeObserver(() => {
  if (pdf && width !== container.clientWidth && viewer.currentScaleValue === 'page-width') viewer.currentScaleValue = 'page-width';
  width = container.clientWidth;
}).observe(container);

async function openDocument() {
  const requested = localUrl(params.get('file'));
  if (!requested || !/\.pdf$/i.test(requested.pathname)) {
    showError('Не указан PDF-документ сайта. Вернитесь к материалу и выберите ссылку просмотра.');
    element('retry').hidden = true;
    return;
  }
  file = requested;
  let filename = file.pathname.split('/').pop() || 'Документ.pdf';
  try { filename = decodeURIComponent(filename); } catch { /* Keep the encoded filename. */ }
  element('document-title').textContent = filename.replace(/_/g, ' ');
  element('document-title').title = filename;
  document.title = filename.replace(/_/g, ' ') + ' — Просмотр PDF — Сайт АПС';
  download.href = file.href;
  download.download = filename;
  download.hidden = false;
  try {
    const loadingTask = pdfjsLib.getDocument({
      url: file.href,
      cMapUrl: assets + 'cmaps/',
      cMapPacked: true,
      standardFontDataUrl: assets + 'standard_fonts/',
      wasmUrl: assets + 'wasm/',
      iccUrl: assets + 'iccs/',
      isEvalSupported: false,
      enableXfa: false,
    });
    loadingTask.onProgress = ({ loaded, total }) => {
      status.textContent = total > 0 ? `Загрузка документа: ${Math.min(100, Math.round(loaded / total * 100))} %` : 'Загрузка документа…';
    };
    loadingTask.onPassword = (updatePassword, reason) => {
      const password = window.prompt(reason === pdfjsLib.PasswordResponses.INCORRECT_PASSWORD ? 'Неверный пароль. Введите пароль PDF:' : 'Введите пароль PDF:');
      if (password === null) {
        void loadingTask.destroy();
        showError('Открытие защищённого документа отменено.');
      } else updatePassword(password);
    };
    pdf = await loadingTask.promise;
    element('page-count').textContent = `из ${pdf.numPages}`;
    pageNumber.max = String(pdf.numPages);
    status.textContent = 'Подготовка страниц…';
    viewer.setDocument(pdf);
    linkService.setDocument(pdf);
  } catch (error) {
    console.error('PDF preview failed:', error);
    showError('Не удалось открыть документ. Проверьте подключение и повторите попытку. Автоматическое скачивание не выполняется.');
  }
}
void openDocument();
