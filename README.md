# Учебный проект "Stellar Burgers

## Step 1

Выполнил верстку макета приложения на основе классовых компонентов React, данные для отрисовки передаются из статичного массива




## Month  8  - step 1 

Все состояние перенесены в Context

## Month  8 - step 2

Все состояния приложения перенесены в Redux
Добавлен функционал перетаскивания ингридиентов Drag&Drop с помощью библиотеки React-DND
Добавлена сортировка ингридиентов в конструкторе (код взят из https://react-dnd.github.io/react-dnd/examples/sortable/simple и модернизован под приложение)
Добавлена подсветка активных табов с ингридиентами в зависимости от прокрутки(сделано на основе статьи https://habr.com/ru/post/494670/)
Частично сделаны Action creators


## Month 9 - step 1

Добавлен полностью функционал работы с пользователем(регистрация, авторизация, восстановление пароля по почте) на основе JWT токенов, хранение токенов в cookies.

Для минимизации обращений к серверу, проверку актуальной авторизации пользователя (метод Auth.getUser) выполняется только при: входе на защищенный маршрут, при отправке заказа. Все остальные маршруты на которые не должен попасть зарегестрированный пользователь закрыты по наличию AccessToken в cookies. Для хранения состояний и данных пользователя использовал Redux(в учебных материалах было сделано через Context)

Переработаны модальные окна для полной информации по ингридиентам, на основе хуков роутера. При переходе на url ингридиента открывается отдельная страница. 


## Month 9 - step 2

Сверстаны экраны ленты заказов, и истории заказов в профиле.
Добавлено подключение по WebSocket к серверу для получения заказов. 

## Month 10 - TypeScript 

Проведена типизация проекта
Вся типизация экшеном вынесена в отдельные файлы в папке types для облегчения читабильности кода
Сделан кастомных хук useInput для сбора данных со всех полей ввода где это необходимо


