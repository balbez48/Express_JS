'use strict'

/*
Получить заголовок "Калькулятор верстки" через метод getElementsByTagName. (тэг h1, получить именно элемент, а не коллекцию)
Получить кнопки "Рассчитать" и "Сброс" через метод getElementsByClassName. (класс handler_btn)
Получить кнопку "+" под выпадающим списком через метод querySelector. (класс screen-btn)
Получить все элементы с классом other-items в две разные переменные. В первую элементы у которых так же присутствует класс percent, во вторую элементы у которых так же присутствует класс number через метод querySelectorAll.
Получить input type=range через его родителя с классом rollback одним запросом через метод querySelector.
Получить span с классом range-value через его родителя с классом rollback одним запросом через метод querySelector.
Получить все инпуты с классом total-input справа через метод getElementsByClassName. (класс total-input, получить именно элементы, а не коллекции)
Получить все блоки с классом screen в изменяемую переменную ( let ) через метод querySelectorAll (далее мы будем переопределять ее значение)
*/


const nameTitle = document.getElementsByTagName('h1')[0];
const calcBtn = document.getElementsByClassName('handler_btn')[0];
const resetBtn = document.getElementsByClassName('handler_btn')[1];
const plusBtn = document.querySelector('.screen-btn');
console.log(plusBtn)

const items1 = document.querySelectorAll('.other-items.percent');
const items2 = document.querySelectorAll('.other-items.number');

const rangeBtn = document.querySelector('.rollback > input');
const rangeTitle = document.querySelector('.rollback > span');


const collectionInputs = document.getElementsByClassName('total-input');
const arrayInputs = [];
for (let i = 0; i < collectionInputs.length; i++) {
    arrayInputs[i] = collectionInputs[i];
}

let arrayScreens = document.querySelectorAll('.screen')


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

// appData.start();