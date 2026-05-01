'use strict'

/*
1) Запретить нажатие кнопки Рассчитать если не выбран ни один тип экрана в выпадающем списке и не введено их количество. +
Учесть что блоков с типом экранов может быть несколько, но пустых (незаполненных) элементов быть не должно

2) Повесить на input[type=range] (в блоке с классом .rollback) обработчик события. +
При перемещении ползунка значение под ним (в элементе span) должно меняться. 
А так же это значение должно заноситься в свойство rollback нашего объекта для последующих расчетов!

3) В нашем объекте присутствует метод getServicePercentPrice. +
Данный метод рассчитывает доход с учетом отката посреднику. 
Перенести его логику в метод addPrices и выводить в поле с подписью "Стоимость с учетом отката"

4) В методе addScreens мы добавляем в свойство appData.screens новые объекты. 
Добавить свойство count в которое занести количество экранов из input. +
В методе addPrices посчитать общее количество экранов и вывести +
на страницу итоговое значение в поле с подписью "Количество экранов"

5) Удалить из проекта метод getRollbackMessage +
*/

const nameTitle = document.getElementsByTagName('h1')[0];
const calcBtn = document.getElementsByClassName('handler_btn')[0];
const resetBtn = document.getElementsByClassName('handler_btn')[1];
const plusBtn = document.querySelector('.screen-btn');

const itemsPercent = document.querySelectorAll('.other-items.percent');
const itemsNumber = document.querySelectorAll('.other-items.number');

const rollbackBlock = document.querySelector('.rollback');
const rangeTitle = rollbackBlock.querySelector('span');
const rangeBtn = rollbackBlock.querySelector('input[type=range]');



const collectionInputs = document.getElementsByClassName('total-input');
const arrayInputs = [];
for (let i = 0; i < collectionInputs.length; i++) {
    arrayInputs[i] = collectionInputs[i];
}

let arrayScreens = document.querySelectorAll('.screen')

const appData = {
    title: '',
    screens: [],
    countScreens: 0,
    screenPrice: 0,
    rollback: 0,
    fullPrice: 0,
    adaptive: true,
    servicePricesPercent: 0,
    servicePricesNumber: 0,
    servicePercentPrice: 0, //откат посреднику
    servicesPercent: {},
    servicesNumber: {},

    init: function () {
        appData.addTitle();

        calcBtn.addEventListener('click', () => {
            if (appData.checkBtn()) {
                appData.start();
            } else {
                alert('Выберите тип экранов и укажите количество!');
            }
        })

        //Здесь обновляю rollback
        rangeBtn.addEventListener('input', () => {
            rangeTitle.textContent = rangeBtn.value + '%';
            appData.rollback = +rangeBtn.value;
        })

        plusBtn.addEventListener('click', () => {
            appData.addScreenBlock();
        })
    },

    start: function () {
        alert('Рассчет начать!')
        appData.addScreens();
        appData.addServices();
        appData.addPrices();
        // appData.logger();
        appData.showResult();
    },

    showResult: function () {
        arrayInputs[0].value = appData.screenPrice;
        arrayInputs[1].value = appData.countScreens;
        arrayInputs[2].value = appData.servicePricesPercent + appData.servicePricesNumber;
        arrayInputs[3].value = appData.fullPrice;
        arrayInputs[4].value = appData.servicePercentPrice;
        console.log(appData)
    },

    //метод проверяет все ли поля заполнены, то есть не являются === ''
    checkBtn: function () {
        let count = 0;
        arrayScreens = document.querySelectorAll('.screen')
        arrayScreens.forEach((screen) => {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            if (select.value !== '' && input.value !== '') {
                count++
            }
        })

        if (count === arrayScreens.length) {
            return true;
        } else {
            return false;
        }
    },

    addTitle: function () {
        document.title = title.textContent;
    },

    addScreens: function () {
        arrayScreens = document.querySelectorAll('.screen')

        arrayScreens.forEach((screen, index) => {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            const selectName = select.options[select.selectedIndex].textContent;

            appData.screens.push({
                id: index,
                name: selectName,
                price: +select.value * +input.value,
                count: +input.value
            })
        })
    },

    addServices: function () {
        itemsPercent.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if (check.checked) {
                appData.servicesPercent[label.textContent] = +input.value
            }

        })

        itemsNumber.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if (check.checked) {
                appData.servicesNumber[label.textContent] = +input.value
            }

        })
    },

    addScreenBlock: function () {
        const cloneScreen = arrayScreens[0].cloneNode(true);
        arrayScreens[arrayScreens.length - 1].after(cloneScreen)
    },

    addPrices: function () {
        for (let screen of appData.screens) {
            appData.screenPrice += +screen.price;
            appData.countScreens += +screen.count;
        }

        for (let key in appData.servicesNumber) {
            appData.servicePricesNumber += appData.servicesNumber[key];
        }

        for (let key in appData.servicesPercent) {
            appData.servicePricesPercent += +appData.screenPrice * (+appData.servicesPercent[key] / 100);
        }

        appData.fullPrice = +appData.screenPrice + appData.servicePricesNumber + appData.servicePricesPercent;
        appData.servicePercentPrice = Math.ceil(appData.fullPrice - appData.fullPrice * (appData.rollback / 100));
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

appData.init();