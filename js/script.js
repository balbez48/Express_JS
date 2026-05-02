'use strict'

/*
1) Перевести весь проект на стрелочные функции (кроме методов объекта) +

2) В нашем объекте везде использовать this как ссылку на объект appData. +
Если какой то обработчик ломает контекст - привязать нужный контекст в виде объекта appData.

3) Блокировать (свойство disabled) все input[type=text] и select с левой 
стороны после нажатия кнопки Рассчитать, после этого кнопка Рассчитать 
пропадает и появляется кнопка Сброс (id=reset)

4) В объекте реализовать метод reset(), срабатывающий по нажатию на кнопку Сброс. 
Метод reset() должен привести объект к исходному состоянию:

Кнопка Сброс должна замениться на кнопку Рассчитать
Должны быть убраны все дополнительные элементы (которые добавлялись динамически) и значения полей ввода
Все input[type=text] и select должны быть разблокированы


Метод reset должен всю программу возвращать в исходное состояние
Метод reset() пишем самостоятельно, никаких перезагрузок страницы. Метод должен быть расписан наподобие start().
*/

const nameTitle = document.getElementsByTagName('h1')[0];
const calcBtn = document.getElementById('start');
const resetBtn = document.getElementById('reset');

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

let arrayScreens = document.querySelectorAll('.screen');
const cloneScreen = arrayScreens[0].cloneNode(true);



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
        this.addTitle();

        calcBtn.addEventListener('click', () => {
            if (this.checkBtn()) {
                this.start();
                arrayScreens.forEach((screen) => {
                    const select = screen.querySelector('select');
                    const input = screen.querySelector('input');
                    select.disabled = true;
                    input.disabled = true;
                })
                calcBtn.style.display = 'none';
                resetBtn.style.display = ''

            } else {
                alert('Выберите тип экранов и укажите количество!');
            }
        })

        resetBtn.addEventListener('click', () => {
            this.reset();
            arrayScreens.forEach((screen) => {
                const select = screen.querySelector('select');
                const input = screen.querySelector('input');
                select.disabled = !true;
                input.disabled = !true;
            })
            calcBtn.style.display = '';
            resetBtn.style.display = 'none'

        })

        //Здесь обновляю rollback
        rangeBtn.addEventListener('input', () => {
            rangeTitle.textContent = rangeBtn.value + '%';
            this.rollback = +rangeBtn.value;
        })

        plusBtn.addEventListener('click', () => {
            this.addScreenBlock();
        })
    },

    reset: function () {
        this.clearScreens();
        this.clearServices();
        this.clearPrices();
        this.clearShowResult();
        console.log(this)
    },

    start: function () {
        this.addScreens();
        this.addServices();
        this.addPrices();
        this.showResult();
    },

    clearShowResult: function () {
        arrayInputs[0].value = 0;
        arrayInputs[1].value = 0;
        arrayInputs[2].value = 0;
        arrayInputs[3].value = 0;
        arrayInputs[4].value = 0;
    },

    showResult: function () {
        arrayInputs[0].value = this.screenPrice;
        arrayInputs[1].value = this.countScreens;
        arrayInputs[2].value = this.servicePricesPercent + this.servicePricesNumber;
        arrayInputs[3].value = this.fullPrice;
        arrayInputs[4].value = this.servicePercentPrice;
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

    clearScreens: function () {
        let curScreens = document.querySelectorAll('.screen')
        for (let i = 1; i < curScreens.length; i++) {
            curScreens[i].remove();
        }

        const screenDefault = document.querySelectorAll('.screen')[0];
        const screenDefaultSelect = screenDefault.querySelector('select');
        const screenDefaultInput = screenDefault.querySelector('input');

        screenDefaultInput.value = '';
        screenDefaultSelect.value = '';

        arrayScreens = document.querySelectorAll('.screen');
        this.screens = [];
        this.countScreens = 0;


    },

    addScreens: function () {
        arrayScreens = document.querySelectorAll('.screen')

        arrayScreens.forEach((screen, index) => {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            const selectName = select.options[select.selectedIndex].textContent;


            this.screens.push({
                id: index,
                name: selectName,
                price: +select.value * +input.value,
                count: +input.value
            })
        })
    },

    clearServices: function () {
        itemsPercent.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');
            check.checked = false
        })
        this.servicesPercent = {};

        itemsNumber.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');
            check.checked = false
        })
        this.servicesNumber = {};

        rangeBtn.value = 0;
        rangeTitle.textContent = 0 + '%'
        this.rollback = 0

    },

    addServices: function () {
        itemsPercent.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if (check.checked) {
                this.servicesPercent[label.textContent] = +input.value
            }

        })

        itemsNumber.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if (check.checked) {
                this.servicesNumber[label.textContent] = +input.value
            }

        })
    },

    addScreenBlock: function () {
        const cloneScreen = arrayScreens[0].cloneNode(true);
        arrayScreens[arrayScreens.length - 1].after(cloneScreen);

    },

    clearPrices: function () {
        this.screenPrice = 0;
        this.fullPrice = 0;
        this.servicePricesPercent = 0;
        this.servicePricesNumber = 0;
        this.servicePercentPrice = 0;
    },

    addPrices: function () {
        for (let screen of this.screens) {
            this.screenPrice += +screen.price;
            this.countScreens += +screen.count;
        }

        for (let key in this.servicesNumber) {
            this.servicePricesNumber += this.servicesNumber[key];
        }

        for (let key in this.servicesPercent) {
            this.servicePricesPercent += +this.screenPrice * (+this.servicesPercent[key] / 100);
        }

        this.fullPrice = +this.screenPrice + this.servicePricesNumber + this.servicePricesPercent;
        this.servicePercentPrice = Math.ceil(this.fullPrice - this.fullPrice * (this.rollback / 100));
    },


    logger: function () {

        console.log(this.screens)
        // console.log(appData.getRollbackMessage(appData.fullPrice));
        // console.log(appData.allServicePrices, 'Цена за доп услуги')
        console.log(`Стоимость верстки экранов ${this.screenPrice} долларов`);
        console.log(`Стоимость разработки сайта ${this.fullPrice} долларов`);
        console.log(`Процент отката посреднику за работу: ${this.fullPrice * (this.rollback / 100)}`)

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