import { readFileSync, writeFileSync } from 'node:fs';
const topics = JSON.parse(readFileSync(new URL('../src/data/publications.json', import.meta.url), 'utf8'));
const link = item => `- [${item.label}](${item.link ?? '/alsibir-expert/' + item.slug + '/'})`;
const intro = `---
title: 'Публикации и примеры работ'
description: 'Единый каталог публикаций, нормативной базы, примеров работ и авторских демонстрационных проектов.'
draft: false
---

На странице объединены тематический каталог публикаций, нормативная база, примеры выполненных работ и авторские демонстрационные проекты. Подробные статьи и документы открываются непосредственно из соответствующих разделов.

**Разделы страницы:** [Тематические подборки](#тематические-подборки) · [Темы публикаций](#темы-публикаций) · [Нормативная база](#normative-base) · [Примеры работ](#work-examples) · [Демонстрационные проекты](#авторские-демонстрационные-проекты) · [Навигация](#другие-способы-поиска).

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

## Примеры выполненных работ

Представлены пять примеров документации для реальных программных продуктов и проектов. Материалы позволяют оценить формализацию требований, описание интерфейсов и разработку эксплуатационной документации.

| Проект | Документ | Объём | Демонстрируемые компетенции |
| --- | --- | ---: | --- |
| [PuzzleLib](/alsibir-expert/examples/puzzlelib.pdf) | Техническое задание | 16 стр. | Структурирование и формализация требований |
| [Снежинка](/alsibir-expert/examples/snezhinka.pdf) | Техническое задание | 21 стр. | Описание функций виртуального ассистента |
| [OK Service API](/alsibir-expert/examples/api.pdf) | Описание API | 30 стр. | Документирование программных интерфейсов |
| [Цифровой аватар «Жириновский»](/alsibir-expert/examples/assistant.pdf) | Руководство оператора | 30 стр. | Разработка эксплуатационной документации |
| [ОРФО AI](/alsibir-expert/examples/orfo.pdf) | Техническое задание | 18 стр. | Анализ и документирование требований |

[Открыть портфолио с изображениями документов](/alsibir-expert/wiki/pages/portfolio/). Сведения о проектах: [«Снежинка»](https://nanosemantics.ai/customers/20), [цифровой аватар «Жириновский»](https://nanosemantics.ai/customers/21).

## Авторские демонстрационные проекты

Материалы специально разработаны для демонстрации профессиональных компетенций на условных системах и исходных данных. Они не подтверждают фактическую регистрацию, испытания, производство или внедрение условных объектов.

### АС «АЛЬФА»

[Комплект документации АС «АЛЬФА»](/alsibir-expert/wiki/portfolio/documentation/alpha/) включает 18 документов и сведения о навыках аналитика и технического писателя, которые демонстрирует каждый документ. Представлены требования, структура программного обеспечения, модели, испытательная и эксплуатационная документация, контроль замечаний и версий.

### Графические модели АС «АЛЬФА»

[Визуальный кейс: от требований к модели системы](/alsibir-expert/wiki/portfolio/analytics/alpha-graphic-models/) — 15 иллюстраций BPMN, UML, ER, прототипы интерфейса, трассировка требований и пример отчёта. Пояснения, альбом PDF и исходники PlantUML.

### Досье программного продукта

[Открыть PDF-досье](/alsibir-expert/dosies/mincifry_dossier.pdf) — семь авторских образцов, включая карточку продукта, матрицу требований, журнал замечаний и фрагмент методики испытаний. Демонстрируются анализ нормативных требований и контроль комплектности регистрационных материалов.

### Досье промышленного изделия

[Открыть PDF-досье](/alsibir-expert/dosies/minpromtorg_dossier.pdf) — семь авторских образцов, включая реестр происхождения компонентов и матрицу локализации. Демонстрируются анализ состава изделия, подготовка подтверждающих материалов и контроль согласованности сведений.

### Другие направления

| Проект | Демонстрируемые компетенции |
| --- | --- |
| [Системный анализ](/alsibir-expert/wiki/portfolio/analytics/system-analysis/) | Требования, сценарии, модели процессов и взаимодействий |
| [Техническая документация](/alsibir-expert/wiki/portfolio/documentation/technical-documentation/) | Состав комплекта, оформление и контроль качества |
| [Автоматизация документов](/alsibir-expert/wiki/portfolio/ai/document-automation/) | Шаблоны, обработка текстов и автоматизированные проверки |
| [Регистрационные досье](/alsibir-expert/wiki/portfolio/registration/software-registration/) | Реестры подтверждений и проверка согласованности |

## Другие способы поиска

- [Все публикации по дате](/alsibir-expert/blog/).
- [Все теги статей](/alsibir-expert/tags/) — сквозные признаки: технологии, стандарты, инструменты и виды материалов.
- [Примеры выполненных работ](#work-examples) и [авторские демонстрационные проекты](#авторские-демонстрационные-проекты).
- [Карта сайта](/alsibir-expert/wiki/pages/sitemap/) — полный навигационный перечень страниц.
- [О специалисте](/alsibir-expert/wiki/pages/about/), [услуги](/alsibir-expert/wiki/pages/services/) и [контакты](/alsibir-expert/wiki/pages/contact/).

Каждый материал относится к одной основной теме; теги позволяют находить связанные статьи из разных тем. Адреса ранее опубликованных материалов сохранены.
`;
writeFileSync(new URL('../src/content/docs/publications.md', import.meta.url), intro + table + '\n\n' + sections + ending);
