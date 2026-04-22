'use strict'

let title;
let screens;
let screenPrice;
let rollback = 20;
let fullPrice;
let adaptive;

let allServicePrices;
let servicePercentPrice;

let service1;
let service2;

const isNumber = function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num)
}

const asking = function () {
    title = prompt("Как называется ваш проект?", "Калькулятор верстки");
    screens = prompt("Какие типы экранов нужно разработать?", "Простые, Сложные, Интерактивные");

    do {
        screenPrice = prompt("Сколько будет стоить данная работа?");
    } while (!isNumber(screenPrice));
    adaptive = confirm("Нужен ли адаптив на сайте?");
}

const getAllServicePrices = function () {
    let sum = 0;

    for (let i = 0; i < 2; i++) {
        if (i === 0) {
            service1 = prompt("Какой дополнительный тип услуг нужен?");
        } else if (i === 1) {
            service2 = prompt("Какой дополнительный тип услуг нужен?");
        }

        let ask;

        do {
            ask = prompt("Сколько это будет стоить?");
        } while (!isNumber(ask));

        sum += Number(ask);
    }

    return sum;
}

function getFullPrice(screen, allServ) {
    const num1 = Number(screen);
    const num2 = Number(allServ);
    return num1 + num2;
}

const getTitle = function (title) {
    const newTitle = title.trim().toLowerCase();
    return newTitle[0].toUpperCase() + newTitle.substr(1);
}

const getServicePercentPrices = function (price, rollback) {
    return Math.ceil(price - price * (rollback / 100));
}

const showTypeOf = function (obj) {
    console.log(typeof obj);
}

const getRollbackMessage = function (price) {
    if (price > 30_000) {
        return "Даем скидку в 10%";
    } else if (price >= 15_000 && price < 30_000) {
        return "Даем скидку в 5%";
    } else if (price > 0 && price < 15_000) {
        return "Скидка не предусмотрена";
    } else {
        return "Что то пошло не так";
    }
}

asking()
allServicePrices = getAllServicePrices();
fullPrice = getFullPrice(screenPrice, allServicePrices);
title = getTitle(title);
servicePercentPrice = getServicePercentPrices(fullPrice, rollback)


showTypeOf(title);
showTypeOf(fullPrice);
showTypeOf(adaptive);

console.log(getRollbackMessage(fullPrice));
console.log(allServicePrices, 'Цена за доп услуги')
console.log(`Стоимость верстки экранов ${screenPrice} долларов`);
console.log(`Стоимость разработки сайта ${fullPrice} долларов`);
console.log(screens.toLowerCase().split(', '));
console.log(`Процент отката посреднику за работу: ${fullPrice * (rollback / 100)}`)