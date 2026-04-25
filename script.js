'use strict'

const appData = {
    title: '',
    screens: '',
    screenPrice: 0,
    rollback: 20,
    fullPrice: 0,
    adaptive: true,
    allServicePrices: 0,
    servicePercentPrice: 0,
    service1: '',
    service2: '',

    start: function () {
        appData.asking();
        appData.allServicePrices = appData.getAllServicePrices();
        appData.fullPrice = appData.getFullPrice(appData.screenPrice, appData.allServicePrices);
        appData.title = appData.getTitle(appData.title);
        appData.servicePercentPrice = appData.getServicePercentPrices(appData.fullPrice, appData.rollback);
        appData.logger();
    },

    asking: function () {
        appData.title = prompt("Как называется ваш проект?", "Калькулятор верстки");
        appData.screens = prompt("Какие типы экранов нужно разработать?", "Простые, Сложные, Интерактивные");

        do {
            appData.screenPrice = prompt("Сколько будет стоить данная работа?");
        } while (!appData.isNumber(appData.screenPrice));

        appData.adaptive = confirm("Нужен ли адаптив на сайте?");
    },

    isNumber: function (num) {
        return !isNaN(parseFloat(num)) && isFinite(num)
    },

    getAllServicePrices: function () {
        let sum = 0;

        for (let i = 0; i < 2; i++) {
            if (i === 0) {
                appData.service1 = prompt("Какой дополнительный тип услуг нужен?");
            } else if (i === 1) {
                appData.service2 = prompt("Какой дополнительный тип услуг нужен?");
            }

            let ask;

            do {
                ask = prompt("Сколько это будет стоить?");
            } while (!appData.isNumber(ask));

            sum += Number(ask);
        }

        return sum;
    },

    getFullPrice: function (screen, allServ) {
        const num1 = Number(screen);
        const num2 = Number(allServ);
        return num1 + num2;
    },

    getTitle: function (title) {
        const newTitle = title.trim().toLowerCase();
        return newTitle[0].toUpperCase() + newTitle.substr(1);
    },

    getServicePercentPrices: function (price, rollback) {
        return Math.ceil(price - price * (rollback / 100));
    },

    getRollbackMessage: function (price) {
        if (price > 30_000) {
            return "Даем скидку в 10%";
        } else if (price >= 15_000 && price < 30_000) {
            return "Даем скидку в 5%";
        } else if (price > 0 && price < 15_000) {
            return "Скидка не предусмотрена";
        } else {
            return "Что то пошло не так";
        }
    },

    logger: function () {

        console.log(appData.getRollbackMessage(appData.fullPrice));
        console.log(appData.allServicePrices, 'Цена за доп услуги')
        console.log(`Стоимость верстки экранов ${appData.screenPrice} долларов`);
        console.log(`Стоимость разработки сайта ${appData.fullPrice} долларов`);
        console.log(appData.screens.toLowerCase().split(', '));
        console.log(`Процент отката посреднику за работу: ${appData.fullPrice * (appData.rollback / 100)}`)

        for (let i in appData) {
            if (typeof appData[i] === 'function') {
                console.log(`Метод объекта appData: ${i}`);
                // console.log(`Метод объекта appData: ${appData[i]}`); Вывод значения свойства
            } else {
                console.log(`Свойство объекта appData: ${i}`);
                // console.log(`Свойство объекта appData: ${appData[i]}`); Вывод самого метода 
            }
        }
    },

}

appData.start();