import { readFileSync, writeFileSync } from 'node:fs';
const topics = JSON.parse(readFileSync(new URL('../src/data/publications.json', import.meta.url), 'utf8'));
const link = item => `- [${item.label}](${item.link ?? '/alsibir-expert/' + item.slug + '/'})`;
const intro = `---
title: 'Публикации и практические материалы'
description: 'Единый каталог публикаций, нормативной базы, примеров работ и авторских демонстрационных проектов.'
draft: false
---

Статьи и инструкции по системному анализу, технической документации и инструментам. Тематические подборки помогают изучить подходы к работе, а портфолио — оценить их применение в документах и моделях.

<aside class="aps-crosslink"><p>Для оценки профессиональных навыков представлены полные документы, графические модели и авторские проекты.</p><p><a class="aps-button" href="/alsibir-expert/wiki/pages/portfolio/">Посмотреть портфолио: документы и диаграммы</a></p></aside>

**Разделы страницы:** [Тематические подборки](#тематические-подборки) · [Темы публикаций](#темы-публикаций) · [Нормативная база](#normative-base) · [Примеры работ](#work-examples) · [Навигация](#другие-способы-поиска).

## Тематические подборки

Материалы по основным направлениям профессиональной деятельности. Подборки объединяют публикации о взаимосвязанных аспектах системного анализа, технического документирования и подготовки регистрационных материалов.

<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr));gap:1rem;margin:1.25rem 0 2rem;">
  <section style="border:1px solid var(--sl-color-gray-5);border-radius:0.75rem;padding:1.15rem;background:var(--sl-color-gray-6);">
    <h3 style="margin-top:0;font-size:1.1rem;">Техническая документация</h3>
    <p>Состав документов по ГОСТ 19, формализация технического задания и контроль качества документации.</p>
    <p style="margin-bottom:0;"><a href="/alsibir-expert/blog/documentation/01_gost19_documents/">Состав комплекта</a> · <a href="/alsibir-expert/blog/documentation/clear-technical-specification/">Техническое задание</a> · <a href="/alsibir-expert/blog/documentation/05_document_quality/">Контроль качества</a></p>
  </section>
  <section style="border:1px solid var(--sl-color-gray-5);border-radius:0.75rem;padding:1.15rem;background:var(--sl-color-gray-6);">
    <h3 style="margin-top:0;font-size:1.1rem;">Системный анализ</h3>
    <p>Сбор исходных данных, моделирование процессов и трассируемость требований до испытаний.</p>
    <p style="margin-bottom:0;"><a href="/alsibir-expert/blog/analytics/project-discovery-ai/">Исходные данные</a> · <a href="/alsibir-expert/blog/modeling/08_bpmn_uml_plantuml/">BPMN, UML и PlantUML</a> · <a href="/alsibir-expert/blog/analytics/06_requirements_to_tests/">Трассируемость</a></p>
  </section>
  <section style="border:1px solid var(--sl-color-gray-5);border-radius:0.75rem;padding:1.15rem;background:var(--sl-color-gray-6);">
    <h3 style="margin-top:0;font-size:1.1rem;">Регистрационные досье</h3>
    <p>Подготовка материалов для реестров Минцифры России, Минпромторга и ГИСП, примеры комплектов.</p>
    <p style="margin-bottom:0;"><a href="/alsibir-expert/blog/registries/01_mincifry_registry_software/">Реестр Минцифры</a> · <a href="/alsibir-expert/blog/registries/02_minpromtorg_registry_industry/">Минпромторг и ГИСП</a> · <a href="/alsibir-expert/wiki/pages/portfolio/#авторские-комплекты-документации">Примеры комплектов</a></p>
  </section>
</div>

## Темы публикаций

| Тема | Материалов |
| --- | ---: |
`;
const table = topics.map(t => `| [${t.title}](#${t.id}) | ${t.items.length} |`).join('\n');
const sections = topics.map(t => `<span id="${t.id}"></span>\n\n## ${t.title}\n\nМатериалов: ${t.items.length}.\n\n${t.items.map(link).join('\n')}`).join('\n\n');
const ending = `

<span id="normative-base"></span>

## Нормативная база

При разработке технической документации учитываются назначение программного обеспечения, автоматизированной системы или изделия, применимые стандарты и требования к комплектности документов.

| Система стандартов | Назначение |
| --- | --- |
| **ГОСТ 19 (ЕСПД)** | Состав, содержание и оформление программной документации |
| **ГОСТ 34** | Документация автоматизированных систем, требования и испытания |
| **ГОСТ 21 (СПДС)** | Проектная и рабочая документация в строительстве |
| **ЕСКД** | Конструкторская документация на изделия |

Для изучения порядка применения стандартов представлены статьи [о составе документации ПО](/alsibir-expert/blog/documentation/software-documentation/), [ГОСТ 19](/alsibir-expert/blog/documentation/01_gost19_documents/), [ГОСТ 34](/alsibir-expert/blog/documentation/02_gost34_traceability/) и [оформлении СПДС в Word](/alsibir-expert/blog/standards/spds-microsoft-word/).

**Примечание.** Перед практическим применением необходимо сверять действующую редакцию, область применения и обязательность требований нормативного документа с официальными источниками.

<span id="work-examples"></span>

## Примеры работ из портфолио

Примеры документов и моделей собраны в [портфолио](/alsibir-expert/wiki/pages/portfolio/). Ниже размещена компактная витрина работ; полный каталог содержит документы, пояснения и ссылки на просмотр.

<span id="авторские-демонстрационные-проекты"></span>

Авторские проекты, реальные документы и регистрационные досье представлены в [полном портфолио](/alsibir-expert/wiki/pages/portfolio/).

## Другие способы поиска

- [Все публикации по дате](/alsibir-expert/blog/).
- [Все теги статей](/alsibir-expert/tags/) — сквозные признаки: технологии, стандарты, инструменты и виды материалов.
- [Примеры выполненных работ](#work-examples) и [авторские демонстрационные проекты](#авторские-демонстрационные-проекты).
- [Карта сайта](/alsibir-expert/wiki/pages/sitemap/) — полный навигационный перечень страниц.
- [О специалисте](/alsibir-expert/wiki/pages/about/), [услуги](/alsibir-expert/wiki/pages/services/) и [контакты](/alsibir-expert/wiki/pages/contact/).

Каждый материал относится к одной основной теме; теги позволяют находить связанные статьи из разных тем. Адреса ранее опубликованных материалов сохранены.

## Подходы в готовых работах

<div class="aps-related-grid">
<article class="aps-card"><a href="/alsibir-expert/wiki/portfolio/documentation/alpha/"><img src="/alsibir-expert/images/evidence/alpha-project-collage.webp" alt="АС «АЛЬФА»: комплект документации" loading="lazy" width="1600" height="1100"/></a><h3>АС «АЛЬФА» — документация</h3><p>Требования, архитектура, API, руководства и испытания. Состав комплекта и демонстрируемые навыки.</p><p><a href="/alsibir-expert/wiki/portfolio/documentation/alpha/">Открыть комплект</a></p></article>
<article class="aps-card"><a href="/alsibir-expert/wiki/portfolio/analytics/alpha-graphic-models/"><img src="/alsibir-expert/images/graphdemo/02-system-context.svg" alt="Контекстная схема АС «АЛЬФА»" loading="lazy" width="1000" height="650"/></a><h3>АС «АЛЬФА» — графические модели</h3><p>BPMN, UML, ER, прототипы интерфейса и трассировка требований. 15 иллюстраций с пояснениями.</p><p><a href="/alsibir-expert/wiki/portfolio/analytics/alpha-graphic-models/">Открыть модели</a></p></article>
<article class="aps-card"><a href="/alsibir-expert/wiki/pages/portfolio/#real-documents"><img src="/alsibir-expert/images/evidence/api-project-card.png" alt="Пример реального документа: описание API" loading="lazy" width="1600" height="1100"/></a><h3>Реальные документы</h3><p>Три технических задания, описание API и руководство оператора. Полные документы доступны для просмотра.</p><p><a href="/alsibir-expert/wiki/pages/portfolio/#real-documents">Посмотреть документы</a></p></article>
</div>
<p><a class="aps-button" href="/alsibir-expert/wiki/pages/portfolio/">Всё портфолио</a></p>
`;
writeFileSync(new URL('../src/content/docs/publications.md', import.meta.url), intro + table + '\n\n' + sections + ending);
