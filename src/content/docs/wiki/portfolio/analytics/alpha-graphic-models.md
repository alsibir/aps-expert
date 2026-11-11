---
title: 'АС «АЛЬФА»: от требований к визуальной модели системы'
description: '15 графических материалов на одном проекте: BPMN, UML, ER, прототипы интерфейса, трассировка требований и визуализация данных. Пояснения, исходники PlantUML и общий альбом.'
sidebar:
  label: 'АЛЬФА — графические модели'
draft: false
---

Графические модели помогают согласовать требования, объяснить устройство системы и подготовить понятную документацию. Здесь один проект показан с разных сторон: бизнес-процесс, действия пользователей, взаимодействие компонентов, данные, инфраструктура, интерфейс и испытания.

**15 иллюстраций — один сквозной пример.** Каждый материал сопровождается пояснением и перечнем навыков аналитика и технического писателя, которые можно оценить по представленному результату.

АС «АЛЬФА» версии 1.0.0 — демонстрационная веб-система регистрации и обработки внутренних обращений. Проект специально подготовлен для профессионального портфолио. Организации, данные и инфраструктура условные; наличие работающего продукта, внедрение и факт проведения испытаний не утверждаются.

<div class="aps-graphdemo-summary">
<p><strong>Посмотреть целиком:</strong> <a href="/alsibir-expert/images/graphdemo/alpha-graphic-album.pdf" target="_blank" rel="noopener">Открыть графический альбом PDF</a></p>
<p><strong>Получить исходники:</strong> <a href="/alsibir-expert/images/graphdemo/alpha-graphdemo.zip" download>Скачать PlantUML, SVG и альбом — ZIP, 2,57 МБ</a></p>
<p><a href="/alsibir-expert/wiki/portfolio/documentation/alpha/">Комплект документации «АЛЬФА»</a> · <a href="/alsibir-expert/wiki/pages/portfolio/">Все примеры работ</a></p>
</div>

## Какие задачи решает графическое описание

| Задача | Материал |
| --- | --- |
| Кто выполняет действия и как обрабатываются развилки | [1. BPMN 2.0](#diagram-01) |
| Что входит в систему и кто с ней взаимодействует | [2. Контекстная схема](#diagram-02) |
| Какие действия доступны каждой роли | [3. UML Use Case](#diagram-03) |
| При каких условиях заявка сохраняется | [4. UML Activity](#diagram-04) |
| Как взаимодействуют интерфейс, сервер и база данных | [5. UML Sequence](#diagram-05) |
| Какие переходы разрешены и кто их выполняет | [6. UML State Machine](#diagram-06) |
| Как распределены функции программного продукта | [7. UML Component](#diagram-07) |
| На каких узлах работает система | [8. UML Deployment](#diagram-08) |
| Какие данные хранятся и как они связаны | [9. ER · нотация «воронья лапка»](#diagram-09) |
| Какие понятия и правила определяют поведение системы | [10. UML Class](#diagram-10) |
| Как представить сведения и действия на экране | [11. PlantUML Salt · прототип интерфейса](#diagram-11) |
| Как пользователь достигает результата | [12. Карта пользовательского сценария](#diagram-12) |
| Как объяснить действие в руководстве пользователя | [13. Аннотированный макет](#diagram-13) |
| Чем подтверждается выполнение требования | [14. Связи «требование — реализация — тест»](#diagram-14) |
| Какие сведения помогают оценить очередь обращений | [15. Макет отчёта · синтетические данные](#diagram-15) |

Изображения открываются в полном размере по нажатию. SVG сохраняет чёткость при увеличении. Альбом PDF открывается для просмотра; скачивание архива и исходников требует подтверждения.

## От процесса к устройству системы

Модели используют общие роли и статусы. Пользователь создаёт свои заявки; Оператор принимает и обрабатывает их. Администратор управляет учётными записями и конфигурацией, Аудитор читает журнал аудита. Статусы и коды требований сверены с опубликованным комплектом документации.

<a id="diagram-01"></a>

## 1. Процесс обработки обращения

**BPMN 2.0 · Кто выполняет действия и как обрабатываются развилки?**

<figure class="aps-graphdemo-figure">
<a href="/alsibir-expert/images/graphdemo/01-bpmn-process.svg" target="_blank" rel="noopener" aria-label="Открыть рисунок 1 в полном размере"><img src="/alsibir-expert/images/graphdemo/01-bpmn-process.svg" alt="Процесс обработки обращения — BPMN 2.0" loading="lazy" decoding="async" width="1116" height="626"/></a>
<figcaption>Рисунок 1 — Процесс обработки обращения</figcaption>
</figure>

Пул «Обработка обращения» разделён на дорожки Пользователя и Оператора. Показаны начальное и конечное события, задачи, исключающий шлюз и потоки управления. После подачи обращения Оператор принимает заявку и фиксирует решение. Пользователь проверяет результат: закрывает заявку либо возвращает её в работу. Это обзорный сценарий; уточнение сведений и отмена дополнительно раскрыты в модели состояний.

**Демонстрируемые навыки:** Моделирование бизнес-процессов; распределение ответственности; анализ альтернативных сценариев; применение элементов BPMN.

[Открыть SVG](/alsibir-expert/images/graphdemo/01-bpmn-process.svg) · <a href="/alsibir-expert/images/graphdemo/plantuml/01-bpmn-process.puml" download>Скачать исходник PlantUML</a>

<a id="diagram-02"></a>

## 2. Границы системы и окружение

**Контекстная схема · Что входит в систему и кто с ней взаимодействует?**

<figure class="aps-graphdemo-figure">
<a href="/alsibir-expert/images/graphdemo/02-system-context.svg" target="_blank" rel="noopener" aria-label="Открыть рисунок 2 в полном размере"><img src="/alsibir-expert/images/graphdemo/02-system-context.svg" alt="Границы системы и окружение — Контекстная схема" loading="lazy" decoding="async" width="1149" height="523"/></a>
<figcaption>Рисунок 2 — Границы системы и окружение</figcaption>
</figure>

Веб-система обеспечивает регистрацию и обработку внутренних обращений. Пользователь работает со своими заявками, Оператор — со всеми заявками. Администратор управляет учётными записями и конфигурацией, Аудитор читает журнал аудита. Эти роли не объединяются в одну учётную запись. Электронная почта показана как канал доставки уведомлений, резервное хранилище — как часть эксплуатационного окружения.

**Демонстрируемые навыки:** Определение границ системы; анализ участников и интеграций; описание информационных потоков.

[Открыть SVG](/alsibir-expert/images/graphdemo/02-system-context.svg) · <a href="/alsibir-expert/images/graphdemo/plantuml/02-system-context.puml" download>Скачать исходник PlantUML</a>

<a id="diagram-03"></a>

## 3. Функции и роли пользователей

**UML Use Case · Какие действия доступны каждой роли?**

<figure class="aps-graphdemo-figure">
<a href="/alsibir-expert/images/graphdemo/03-use-cases.svg" target="_blank" rel="noopener" aria-label="Открыть рисунок 3 в полном размере"><img src="/alsibir-expert/images/graphdemo/03-use-cases.svg" alt="Функции и роли пользователей — UML Use Case" loading="lazy" decoding="async" width="477" height="904"/></a>
<figcaption>Рисунок 3 — Функции и роли пользователей</figcaption>
</figure>

Варианты использования фиксируют функциональный состав и ограничения доступа. Администратор не получает доступ к содержанию заявок, Аудитор — к вложениям. Права проверяются сервером для каждой операции; назначение роли не заменяет проверку доступа к конкретному объекту.

**Демонстрируемые навыки:** Выявление функциональных требований; моделирование ролей; разграничение доступа; UML Use Case.

[Открыть SVG](/alsibir-expert/images/graphdemo/03-use-cases.svg) · <a href="/alsibir-expert/images/graphdemo/plantuml/03-use-cases.puml" download>Скачать исходник PlantUML</a>

<a id="diagram-04"></a>

## 4. Алгоритм регистрации заявки

**UML Activity · При каких условиях заявка сохраняется?**

<figure class="aps-graphdemo-figure">
<a href="/alsibir-expert/images/graphdemo/04-registration-activity.svg" target="_blank" rel="noopener" aria-label="Открыть рисунок 4 в полном размере"><img src="/alsibir-expert/images/graphdemo/04-registration-activity.svg" alt="Алгоритм регистрации заявки — UML Activity" loading="lazy" decoding="async" width="748" height="1510"/></a>
<figcaption>Рисунок 4 — Алгоритм регистрации заявки</figcaption>
</figure>

Пользователь заполняет форму, сервер проверяет сеанс, роль USER, ключ идемпотентности и значения полей. Тема содержит от 5 до 120 символов, описание — от 10 до 4000. Новая заявка получает статус NEW и версию 1. Заявка, событие аудита и событие outbox фиксируются в одной транзакции.

**Демонстрируемые навыки:** Детализация алгоритмов; анализ условий и ошибок; формализация проверяемого поведения; UML Activity.

[Открыть SVG](/alsibir-expert/images/graphdemo/04-registration-activity.svg) · <a href="/alsibir-expert/images/graphdemo/plantuml/04-registration-activity.puml" download>Скачать исходник PlantUML</a>

<a id="diagram-05"></a>

## 5. Обмен сообщениями при регистрации

**UML Sequence · Как взаимодействуют интерфейс, сервер и база данных?**

<figure class="aps-graphdemo-figure">
<a href="/alsibir-expert/images/graphdemo/05-registration-sequence.svg" target="_blank" rel="noopener" aria-label="Открыть рисунок 5 в полном размере"><img src="/alsibir-expert/images/graphdemo/05-registration-sequence.svg" alt="Обмен сообщениями при регистрации — UML Sequence" loading="lazy" decoding="async" width="1878" height="1390"/></a>
<figcaption>Рисунок 5 — Обмен сообщениями при регистрации</figcaption>
</figure>

Диаграмма раскрывает основной успешный сценарий, отказ при ошибке валидации и асинхронную доставку уведомления. Событие outbox записывается вместе с заявкой, а обработчик выполняет доставку отдельно. Ограничение UNIQUE(event_id, recipient_id) защищает от повторного создания внутреннего уведомления.

**Демонстрируемые навыки:** Описание REST-взаимодействий; транзакционные границы; асинхронная обработка; UML Sequence.

[Открыть SVG](/alsibir-expert/images/graphdemo/05-registration-sequence.svg) · <a href="/alsibir-expert/images/graphdemo/plantuml/05-registration-sequence.puml" download>Скачать исходник PlantUML</a>

<a id="diagram-06"></a>

## 6. Жизненный цикл заявки

**UML State Machine · Какие переходы разрешены и кто их выполняет?**

<figure class="aps-graphdemo-figure">
<a href="/alsibir-expert/images/graphdemo/06-request-states.svg" target="_blank" rel="noopener" aria-label="Открыть рисунок 6 в полном размере"><img src="/alsibir-expert/images/graphdemo/06-request-states.svg" alt="Жизненный цикл заявки — UML State Machine" loading="lazy" decoding="async" width="1371" height="897"/></a>
<figcaption>Рисунок 6 — Жизненный цикл заявки</figcaption>
</figure>

Статусы и роли соответствуют опубликованной модели данных АС «АЛЬФА». Оператор принимает заявку, запрашивает уточнение и фиксирует решение. Автор может отменить новую заявку, закрыть решённую или вернуть её в работу. CLOSED и CANCELLED — терминальные состояния. При принятии заявки ответственный назначается текущим Оператором.

**Демонстрируемые навыки:** Разработка статусных моделей; анализ полномочий; проверка полноты переходов; UML State Machine.

[Открыть SVG](/alsibir-expert/images/graphdemo/06-request-states.svg) · <a href="/alsibir-expert/images/graphdemo/plantuml/06-request-states.puml" download>Скачать исходник PlantUML</a>

<a id="diagram-07"></a>

## 7. Логическая архитектура

**UML Component · Как распределены функции программного продукта?**

<figure class="aps-graphdemo-figure">
<a href="/alsibir-expert/images/graphdemo/07-components.svg" target="_blank" rel="noopener" aria-label="Открыть рисунок 7 в полном размере"><img src="/alsibir-expert/images/graphdemo/07-components.svg" alt="Логическая архитектура — UML Component" loading="lazy" decoding="async" width="1158" height="808"/></a>
<figcaption>Рисунок 7 — Логическая архитектура</figcaption>
</figure>

Логические компоненты разделяют пользовательский интерфейс, обработку запросов, контроль доступа, аудит и уведомления. Это функциональная декомпозиция: она не означает, что каждому компоненту соответствует отдельный микросервис. Внешние интерфейсы и зависимости показаны отдельно от размещения на серверах.

**Демонстрируемые навыки:** Декомпозиция системы; описание интерфейсов; анализ зависимостей; UML Component.

[Открыть SVG](/alsibir-expert/images/graphdemo/07-components.svg) · <a href="/alsibir-expert/images/graphdemo/plantuml/07-components.puml" download>Скачать исходник PlantUML</a>

<a id="diagram-08"></a>

## 8. Размещение компонентов

**UML Deployment · На каких узлах работает система?**

<figure class="aps-graphdemo-figure">
<a href="/alsibir-expert/images/graphdemo/08-deployment.svg" target="_blank" rel="noopener" aria-label="Открыть рисунок 8 в полном размере"><img src="/alsibir-expert/images/graphdemo/08-deployment.svg" alt="Размещение компонентов — UML Deployment" loading="lazy" decoding="async" width="1050" height="1203"/></a>
<figcaption>Рисунок 8 — Размещение компонентов</figcaption>
</figure>

Схема размещения показывает браузер, обратный прокси, сервер приложения, СУБД, файловое хранилище и резервное копирование. Узлы изображают логические роли инфраструктуры и не задают количество физических серверов. Схема используется при подготовке требований к окружению и эксплуатационных процедур.

**Демонстрируемые навыки:** Описание инфраструктуры; сопоставление артефактов и узлов; подготовка эксплуатационной документации; UML Deployment.

[Открыть SVG](/alsibir-expert/images/graphdemo/08-deployment.svg) · <a href="/alsibir-expert/images/graphdemo/plantuml/08-deployment.puml" download>Скачать исходник PlantUML</a>

<a id="diagram-09"></a>

## 9. Логическая модель данных

**ER · нотация «воронья лапка» · Какие данные хранятся и как они связаны?**

<figure class="aps-graphdemo-figure">
<a href="/alsibir-expert/images/graphdemo/09-data-model.svg" target="_blank" rel="noopener" aria-label="Открыть рисунок 9 в полном размере"><img src="/alsibir-expert/images/graphdemo/09-data-model.svg" alt="Логическая модель данных — ER · нотация «воронья лапка»" loading="lazy" decoding="async" width="603" height="1245"/></a>
<figcaption>Рисунок 9 — Логическая модель данных</figcaption>
</figure>

Показан основной фрагмент модели: роли, пользователи, заявки, справочник статусов, комментарии и вложения. Каждая учётная запись имеет ровно одну роль. У заявки один автор, а ответственный может отсутствовать до принятия в работу. Полная модель дополнительно включает аудит, уведомления и outbox.

**Демонстрируемые навыки:** Выделение сущностей; определение ключей и кратностей; анализ целостности; моделирование данных.

[Открыть SVG](/alsibir-expert/images/graphdemo/09-data-model.svg) · <a href="/alsibir-expert/images/graphdemo/plantuml/09-data-model.puml" download>Скачать исходник PlantUML</a>

<a id="diagram-10"></a>

## 10. Предметная модель

**UML Class · Какие понятия и правила определяют поведение системы?**

<figure class="aps-graphdemo-figure">
<a href="/alsibir-expert/images/graphdemo/10-domain-classes.svg" target="_blank" rel="noopener" aria-label="Открыть рисунок 10 в полном размере"><img src="/alsibir-expert/images/graphdemo/10-domain-classes.svg" alt="Предметная модель — UML Class" loading="lazy" decoding="async" width="1278" height="869"/></a>
<figcaption>Рисунок 10 — Предметная модель</figcaption>
</figure>

Диаграмма классов описывает предметные объекты и операции, а не физическую структуру таблиц. Для заявки показаны регистрация, проверка возможности перехода и изменение статуса. Заметки фиксируют ограничения: длины полей, контроль версии и выбор ответственного с ролью OPERATOR.

**Демонстрируемые навыки:** Объектное моделирование; формализация понятий и инвариантов; различение предметной модели и структуры БД; UML Class.

[Открыть SVG](/alsibir-expert/images/graphdemo/10-domain-classes.svg) · <a href="/alsibir-expert/images/graphdemo/plantuml/10-domain-classes.puml" download>Скачать исходник PlantUML</a>

<a id="diagram-11"></a>

## 11. Прототип карточки заявки

**PlantUML Salt · прототип интерфейса · Как представить сведения и действия на экране?**

<figure class="aps-graphdemo-figure">
<a href="/alsibir-expert/images/graphdemo/11-interface-wireframe.svg" target="_blank" rel="noopener" aria-label="Открыть рисунок 11 в полном размере"><img src="/alsibir-expert/images/graphdemo/11-interface-wireframe.svg" alt="Прототип карточки заявки — PlantUML Salt · прототип интерфейса" loading="lazy" decoding="async" width="520" height="435"/></a>
<figcaption>Рисунок 11 — Прототип карточки заявки</figcaption>
</figure>

Карточка показана для автора заявки в состоянии RESOLVED. Поэтому доступны подтверждение результата и возврат в работу; действия Оператора здесь не отображаются. Прототип фиксирует состав информации и расположение элементов. Это проектный макет, а не снимок работающего продукта.

**Демонстрируемые навыки:** Прототипирование; проектирование ролевых состояний интерфейса; определение состава полей и действий.

[Открыть SVG](/alsibir-expert/images/graphdemo/11-interface-wireframe.svg) · <a href="/alsibir-expert/images/graphdemo/plantuml/11-interface-wireframe.puml" download>Скачать исходник PlantUML</a>

<a id="diagram-12"></a>

## 12. Переходы между экранами

**Карта пользовательского сценария · Как пользователь достигает результата?**

<figure class="aps-graphdemo-figure">
<a href="/alsibir-expert/images/graphdemo/12-screen-navigation.svg" target="_blank" rel="noopener" aria-label="Открыть рисунок 12 в полном размере"><img src="/alsibir-expert/images/graphdemo/12-screen-navigation.svg" alt="Переходы между экранами — Карта пользовательского сценария" loading="lazy" decoding="async" width="905" height="514"/></a>
<figcaption>Рисунок 12 — Переходы между экранами</figcaption>
</figure>

Карта связывает список заявок, форму создания и карточку. При ошибках валидации пользователь остаётся на форме с сохранёнными значениями. Сценарий подтверждения решения показан отдельно от создания заявки, чтобы не создавать впечатление немедленного выполнения обращения.

**Демонстрируемые навыки:** Проектирование навигации; описание успешных и ошибочных сценариев; согласование интерфейса и функциональных требований.

[Открыть SVG](/alsibir-expert/images/graphdemo/12-screen-navigation.svg) · <a href="/alsibir-expert/images/graphdemo/plantuml/12-screen-navigation.puml" download>Скачать исходник PlantUML</a>

<a id="diagram-13"></a>

## 13. Пояснения к элементам интерфейса

**Аннотированный макет · Как объяснить действие в руководстве пользователя?**

<figure class="aps-graphdemo-figure">
<a href="/alsibir-expert/images/graphdemo/13-annotated-interface.svg" target="_blank" rel="noopener" aria-label="Открыть рисунок 13 в полном размере"><img src="/alsibir-expert/images/graphdemo/13-annotated-interface.svg" alt="Пояснения к элементам интерфейса — Аннотированный макет" loading="lazy" decoding="async" width="603" height="556"/></a>
<figcaption>Рисунок 13 — Пояснения к элементам интерфейса</figcaption>
</figure>

Нумерованные выноски связывают элементы карточки с инструкцией. 1 — номер заявки для поиска; 2 — статус и версия; 3 — результат работы Оператора; 4 — подтверждение результата или возврат в работу. В отличие от прототипа, акцент сделан на объяснении действий читателю.

**Демонстрируемые навыки:** Разработка технических иллюстраций; оформление выносок; согласование подписей и инструкции; описание результата действия.

[Открыть SVG](/alsibir-expert/images/graphdemo/13-annotated-interface.svg) · <a href="/alsibir-expert/images/graphdemo/plantuml/13-annotated-interface.puml" download>Скачать исходник PlantUML</a>

<a id="diagram-14"></a>

## 14. Трассировка требований и испытаний

**Связи «требование — реализация — тест» · Чем подтверждается выполнение требования?**

<figure class="aps-graphdemo-figure">
<a href="/alsibir-expert/images/graphdemo/14-requirement-trace.svg" target="_blank" rel="noopener" aria-label="Открыть рисунок 14 в полном размере"><img src="/alsibir-expert/images/graphdemo/14-requirement-trace.svg" alt="Трассировка требований и испытаний — Связи «требование — реализация — тест»" loading="lazy" decoding="async" width="796" height="610"/></a>
<figcaption>Рисунок 14 — Трассировка требований и испытаний</figcaption>
</figure>

Регистрации заявки соответствует FR-002, а проверке регистрации — T-002. Отдельно показаны изменение статуса FR-004 и тест T-004. Направления satisfy и verify связывают реализацию и проверку с требованием. Схема задаёт программу проверки и не подтверждает фактическое прохождение испытаний.

**Демонстрируемые навыки:** Управление требованиями; анализ покрытия; подготовка испытаний; контроль согласованности проектных материалов.

[Открыть SVG](/alsibir-expert/images/graphdemo/14-requirement-trace.svg) · <a href="/alsibir-expert/images/graphdemo/plantuml/14-requirement-trace.puml" download>Скачать исходник PlantUML</a>

<a id="diagram-15"></a>

## 15. Представление показателей

**Макет отчёта · синтетические данные · Какие сведения помогают оценить очередь обращений?**

<figure class="aps-graphdemo-figure">
<a href="/alsibir-expert/images/graphdemo/15-reporting-dashboard.svg" target="_blank" rel="noopener" aria-label="Открыть рисунок 15 в полном размере"><img src="/alsibir-expert/images/graphdemo/15-reporting-dashboard.svg" alt="Представление показателей — Макет отчёта · синтетические данные" loading="lazy" decoding="async" width="637" height="463"/></a>
<figcaption>Рисунок 15 — Представление показателей</figcaption>
</figure>

Пример отчётной формы показывает распределение 120 заявок по статусам. Значения полностью синтетические: NEW — 24, IN_PROGRESS — 36, WAITING — 12, RESOLVED — 18, CLOSED — 24, CANCELLED — 6. Панель является предложением по представлению данных; отдельная функция аналитической отчётности в опубликованном ТЗ версии 1.0.0 не заявлена.

**Демонстрируемые навыки:** Визуализация данных; выбор показателей; согласование чисел и графики; проектирование отчётных форм.

[Открыть SVG](/alsibir-expert/images/graphdemo/15-reporting-dashboard.svg) · <a href="/alsibir-expert/images/graphdemo/plantuml/15-reporting-dashboard.puml" download>Скачать исходник PlantUML</a>

## Как обеспечивается согласованность моделей

Действия процесса сопоставляются с функциями системы, функции — с компонентами, информационные объекты — с моделью данных, а требования — с предусмотренными проверками. Графические материалы не заменяют текстовые спецификации: они раскрывают разные стороны одного решения.

Для регистрации используется требование **FR-002** и тест **T-002**; для изменения статуса — **FR-004** и **T-004**. Во всех моделях сохраняются одинаковые значения NEW, IN_PROGRESS, WAITING, RESOLVED, CLOSED и CANCELLED.

Отчётная панель приведена как дополнительное предложение по визуализации данных. Её показатели синтетические, а сама функция не приписывается утверждённому составу версии 1.0.0.

При подготовке изображений учитываются корректность нотации, читаемость подписей, смысл направлений и кратностей связей, соответствие тексту, возможность увеличения и редактирования исходника.

## Инструменты и редактируемые материалы

Все опубликованные изображения скомпилированы из текстовых исходников PlantUML. UML и ER подготовлены средствами PlantUML; прототип карточки — средствами Salt. Для BPMN и макета отчёта используется Graphviz в режиме `@startdot` PlantUML: обозначения BPMN заданы явно, диаграмма деятельности UML не выдаётся за BPMN.

| Средство | Что представлено в этом кейсе |
| --- | --- |
| BPMN | Процесс с пулом, дорожками, событиями, задачами и исключающими шлюзами |
| UML | Варианты использования, деятельность, последовательность, состояния, компоненты, развёртывание и классы |
| ER | Сущности, ключи и кратности связей в нотации «воронья лапка» |
| PlantUML и Salt | Редактируемые текстовые исходники, прототип интерфейса и единое оформление |
| Graphviz через PlantUML | Компоновка схемы BPMN и макета отчёта |

Архив содержит исходники `.puml`, общий файл оформления `theme.puml`, изображения SVG, графический альбом PDF и описание состава. Файлы демонстрируют воспроизводимую подготовку графики: изменение модели можно внести в исходник и повторно скомпилировать.

## Просмотр и скачивание

- [Открыть графический альбом PDF](/alsibir-expert/images/graphdemo/alpha-graphic-album.pdf) — все 15 иллюстраций с подписями, пояснениями и навыками в одном файле.
- <a href="/alsibir-expert/images/graphdemo/alpha-graphdemo.zip" download>Скачать исходники, SVG и альбом — ZIP, 2,57 МБ</a>.
- <a href="/alsibir-expert/images/graphdemo/plantuml/theme.puml" download>Скачать общий файл оформления PlantUML</a> — требуется вместе с исходниками UML и ER для повторной компиляции.
- [Открыть комплект документации АС «АЛЬФА»](/alsibir-expert/wiki/portfolio/documentation/alpha/).

## Обсудить подготовку схем и документации

Графические материалы могут быть подготовлены для обследования, согласования требований, проектирования, испытаний, внедрения и эксплуатации информационной системы.

[Связаться с автором проекта](/alsibir-expert/wiki/pages/contact/) · [Запросить резюме аналитика или технического писателя](/alsibir-expert/wiki/pages/resume/).
