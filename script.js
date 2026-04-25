'use strict'

const appData = {
    title: '',
    screens: [],
    screenPrice: 0,
    rollback: 20,
    fullPrice: 0,
    adaptive: true,
    allServicePrices: 0,
    servicePercentPrice: 0,
    services: {},

    start: function () {
        appData.asking();
        appData.addPrices();
        appData.getFullPrice(appData.screenPrice, appData.allServicePrices);
        appData.getTitle(appData.title);
        appData.getServicePercentPrices(appData.fullPrice, appData.rollback);
        appData.logger();
    },

    asking: function () {
        appData.title = prompt("Как называется ваш проект?", "Калькулятор верстки");

        for (let i = 0; i < 2; i++) {
            let name = '';
            do {
                name = prompt("Какие типы экранов нужно разработать?");
            } while (appData.isNumber(name))

            let price = 0;
            do {
                price = prompt("Сколько будет стоить данная работа?");
            } while (!appData.isNumber(price));

            appData.screens.push({ id: i, name: name, price: price })

        }

        for (let i = 0; i < 2; i++) {
            let name = '';
            do {
                name = prompt("Какой дополнительный тип услуг нужен?");
            } while (appData.isNumber(name))

            let price = 0;
            do {
                price = prompt("Сколько это будет стоить?");
            } while (!appData.isNumber(price));

            appData.services[name] = +price;
        }

        appData.adaptive = confirm("Нужен ли адаптив на сайте?");
    },

    addPrices: function () {
        for (let screen of appData.screens) {
            appData.screenPrice += +screen.price;
        }

        for (let key in appData.services) {
            appData.allServicePrices += appData.services[key];
        }
    },

    isNumber: function (num) {
        return !isNaN(parseFloat(num)) && isFinite(num)
    },


    getFullPrice: function (screen, allServ) {
        const num1 = Number(screen);
        const num2 = Number(allServ);
        appData.fullPrice = num1 + num2;
    },

    getTitle: function (title) {
        const newTitle = title.trim().toLowerCase();
        appData.title = newTitle[0].toUpperCase() + newTitle.substr(1);
    },

    getServicePercentPrices: function (price, rollback) {
        appData.servicePercentPrice = Math.ceil(price - price * (rollback / 100));
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

        console.log(appData.screens)
        // console.log(appData.getRollbackMessage(appData.fullPrice));
        // console.log(appData.allServicePrices, 'Цена за доп услуги')
        console.log(`Стоимость верстки экранов ${appData.screenPrice} долларов`);
        console.log(`Стоимость разработки сайта ${appData.fullPrice} долларов`);
        console.log(`Процент отката посреднику за работу: ${appData.fullPrice * (appData.rollback / 100)}`)

        // for (let i in appData) {
        //     if (typeof appData[i] === 'function') {
        //         console.log(`Метод объекта appData: ${i}`);
        //         // console.log(`Метод объекта appData: ${appData[i]}`); Вывод значения свойства
        //     } else {
        //         console.log(`Свойство объекта appData: ${i}`);
        //         // console.log(`Свойство объекта appData: ${appData[i]}`); Вывод самого метода 
        //     }
        // }
    },

}

appData.start();