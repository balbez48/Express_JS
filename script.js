'use strict'

let title = prompt("Как называется ваш проект?");
let screens = prompt("Какие типы экранов нужно разработать?", "Простые, Сложные, Интерактивные");
let screenPrice = +prompt("Сколько будет стоить данная работа?");
let rollback = 20;
let fullPrice;
let adaptive = confirm("Нужен ли адаптив на сайте?");

const service1 = prompt("Какой дополнительный тип услуги нужен?");
const servicePrice1 = +prompt("Сколько это будет стоить?");
const service2 = prompt("Какой дополнительный тип услуги нужен?");
const servicePrice2 = +prompt("Сколько это будет стоить?");


const getAllServicePrices = function (serv1, serv2) {
    return serv1 + serv2;
}

function getFullPrice(screen, allServ) {
    return screen + allServ;
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
    } else if (price > 15_000 && price < 30_000) {
        return "Даем скидку в 5%";
    } else if (price > 0 && price < 15_000) {
        return "Скидка не предусмотрена";
    } else {
        return "Что то пошло не так";
    }
}

const allServicePrices = getAllServicePrices(servicePrice1, servicePrice2);
fullPrice = getFullPrice(screenPrice, allServicePrices);
title = getTitle(title);
const servicePercentPrice = getServicePercentPrices(fullPrice, rollback)
console.log(getRollbackMessage(fullPrice));

showTypeOf(title);
showTypeOf(fullPrice);
showTypeOf(adaptive);

console.log(`Стоимость верстки экранов ${screenPrice} долларов`);
console.log(`Стоимость разработки сайта ${fullPrice} долларов`);
console.log(screens.toLowerCase().split(', '));
console.log(`Процент отката посреднику за работу: ${servicePercentPrice}`)