"""Build the PDF album and deterministic ZIP from the tracked graphdemo sources.
Requires Python reportlab, Node.js, and the project's sharp dependency.
Run after: PLANTUML_JAR=/path/plantuml-1.2025.10.jar npm run graphdemo:render
"""
from pathlib import Path
from tempfile import TemporaryDirectory
from subprocess import run
from xml.etree import ElementTree as ET
from zipfile import ZipFile, ZipInfo, ZIP_DEFLATED
import json
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4, A3, A2, landscape
from reportlab.lib.colors import HexColor
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle
from xml.sax.saxutils import escape

root=Path(__file__).resolve().parents[1]
output=root/'public/images/graphdemo'
source=root/'src/diagrams/graphdemo'
catalog=json.loads((source/'catalog.json').read_text())
font=Path('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf')
bold=font.with_name('DejaVuSans-Bold.ttf')
pdfmetrics.registerFont(TTFont('DejaVu',str(font)))
pdfmetrics.registerFont(TTFont('DejaVu-Bold',str(bold)))
ink=HexColor('#172536');blue=HexColor('#235AC6');muted=HexColor('#536477')
style=ParagraphStyle('body',fontName='DejaVu',fontSize=10,leading=15,textColor=ink)
heading=ParagraphStyle('heading',fontName='DejaVu-Bold',fontSize=20,leading=26,textColor=ink)

def para(c,text,x,y,width,sty=style):
 p=Paragraph(escape(text),sty);_,h=p.wrap(width,10000);p.drawOn(c,x,y-h);return y-h

def frame(c,w,h,num):
 c.setFillColor(blue);c.rect(0,h-8,w,8,fill=1,stroke=0)
 c.setFont('DejaVu',9);c.setFillColor(muted)
 c.drawString(40,25,'АПС · АС «АЛЬФА» · Графические модели · Демонстрационный проект')
 c.drawRightString(w-40,25,str(num))

with TemporaryDirectory(prefix='alpha-graphdemo-') as tmp:
 tmp=Path(tmp)
 run(['node','--input-type=module','-e', '''
import sharp from 'sharp';
import fs from 'node:fs';
const catalog=JSON.parse(fs.readFileSync('src/diagrams/graphdemo/catalog.json','utf8'));
for(const item of catalog){
 await sharp('public/images/graphdemo/'+item.slug+'.svg',{density:144})
 .flatten({background:'#ffffff'}).png().toFile(process.argv[1]+'/'+item.slug+'.png');
}
''',str(tmp)],cwd=root,check=True)
 pdf=output/'alpha-graphic-album.pdf'
 c=canvas.Canvas(str(pdf),pagesize=A4,invariant=1,pageCompression=1)
 c.setTitle('АС «АЛЬФА»: от требований к визуальной модели системы')
 c.setAuthor('Александр Сибиряков · АПС')
 w,h=A4;frame(c,w,h,1)
 y=para(c,'АС «АЛЬФА»',40,h-64,w-80,heading)
 y=para(c,'От требований к визуальной модели системы',40,y-16,w-80,heading)
 y=para(c,'15 иллюстраций · BPMN · UML · ER · интерфейс · требования · показатели',40,y-24,w-80)
 y=para(c,'Авторский демонстрационный проект. Организации, данные и инфраструктура условные. Наличие работающего продукта, внедрение и факт проведения испытаний не утверждаются.',40,y-20,w-80)
 y-=24
 for i,item in enumerate(catalog,1):
  c.setFillColor(ink);c.setFont('DejaVu',10)
  c.drawString(40,y,f'{i:02}. {item["title"]}');y-=23
 y=para(c,'Требования, роли и статусы сверены с опубликованным комплектом АС «АЛЬФА» версии 1.0.0. Макет отчётной панели является отдельным предложением; значения полностью синтетические.',40,y-12,w-80)
 para(c,'Исходники PlantUML и SVG доступны на странице кейса. Формат страниц выбран по размеру модели для сохранения читаемости подписей.',40,y-16,w-80)
 c.linkURL('https://alsibir.github.io/aps-expert/wiki/portfolio/analytics/alpha-graphic-models/',(40,40,w-40,66),relative=0)
 c.setFillColor(blue);c.setFont('DejaVu',10);c.drawString(40,50,'Открыть страницу графического кейса на сайте АПС')
 c.showPage()
 for i,item in enumerate(catalog,1):
  svg=ET.parse(output/(item['slug']+'.svg')).getroot()
  iw=float(svg.get('width').replace('px','').replace('pt',''))
  ih=float(svg.get('height').replace('px','').replace('pt',''))
  # Select the smallest standard format preserving a readable model scale.
  choices=sorted([size for p in [A4,A3,A2] for size in [p,landscape(p)]],key=lambda size:size[0]*size[1])
  w,h=next((size for size in choices if min((size[0]-80)/iw,(size[1]-310)/ih)>=0.63),landscape(A2))
  c.setPageSize((w,h));frame(c,w,h,i+1)
  c.bookmarkPage(item['slug']);c.addOutlineEntry(f'{i}. {item["title"]}',item['slug'],level=0)
  y=para(c,f'{i}. {item["title"]}',40,h-40,w-80,heading)
  y=para(c,item['notation']+' · '+item['question'],40,y-10,w-80)
  bottom=205; top=y-18
  scale=min((w-80)/iw,(top-bottom)/ih)
  dw,dh=iw*scale,ih*scale
  c.drawImage(str(tmp/(item['slug']+'.png')),40+(w-80-dw)/2,bottom+(top-bottom-dh)/2,width=dw,height=dh)
  c.setStrokeColor(HexColor('#D9E1E9'));c.line(40,192,w-40,192)
  y=para(c,f'Рисунок {i} — {item["title"]}',40,179,w-80)
  y=para(c,item['description'],40,y-10,w-80)
  para(c,'Демонстрируемые навыки: '+item['skills'],40,y-10,w-80)
  c.showPage()
 c.save()
readme='''АС «АЛЬФА» — графический демонстрационный кейс

15 иллюстраций одного условного проекта, пояснения и навыки.
Данные синтетические; факт эксплуатации и испытаний не заявляется.

Состав:
  plantuml/ — 15 исходников .puml и общий theme.puml;
  svg/ — 15 скомпилированных изображений SVG;
  alpha-graphic-album.pdf — общий альбом, 16 страниц;
  catalog.json — подписи, пояснения и демонстрируемые навыки.

Исходник theme.puml должен находиться рядом с исходниками UML и ER.
BPMN и отчётная форма используют поддерживаемый PlantUML режим @startdot.
BPMN: обзор процесса; отмена и уточнение раскрыты моделью состояний.
Отчётная форма — предложение, не заявленная функция версии 1.0.0.

Повторная сборка: PlantUML 1.2025.10, Java, Graphviz, DejaVu Sans.
Пример из каталога plantuml:
  java -jar /path/plantuml-1.2025.10.jar -charset UTF-8 -tsvg "??-*.puml"
В репозитории сайта:
  PLANTUML_JAR=/path/plantuml-1.2025.10.jar npm run graphdemo:render
  python3 scripts/package-graphdemo.py
Для PDF: Python reportlab, системные шрифты DejaVu, npm-зависимости проекта.
Скрипт требует доступ к Node.js и Graphviz через PATH.

https://alsibir.github.io/aps-expert/wiki/portfolio/analytics/alpha-graphic-models/
'''
(output/'README.txt').write_text(readme)
archive=output/'alpha-graphdemo.zip'
entries=[('README.txt',(output/'README.txt').read_bytes()),('catalog.json',(source/'catalog.json').read_bytes()),('alpha-graphic-album.pdf',pdf.read_bytes())]
entries += [('plantuml/'+p.name,p.read_bytes()) for p in sorted((source/'plantuml').glob('*.puml'))]
entries += [('svg/'+item['slug']+'.svg',(output/(item['slug']+'.svg')).read_bytes()) for item in catalog]
with ZipFile(archive,'w',compression=ZIP_DEFLATED,compresslevel=9) as z:
 for name,data in entries:
  info=ZipInfo(name,(2026,11,11,0,0,0));info.compress_type=ZIP_DEFLATED;z.writestr(info,data)
size=f'{archive.stat().st_size/1024/1024:.2f}'.replace('.',',')+' МБ'
page=root/'src/content/docs/wiki/portfolio/analytics/alpha-graphic-models.md'
page.write_text(page.read_text().replace('ARCHIVE_SIZE',size))
print(f'PDF: {pdf.stat().st_size} bytes; ZIP: {size}; entries: {len(entries)}')
