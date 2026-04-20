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

fullPrice = screenPrice + servicePrice1 + servicePrice2;
const servicePercentPrice = Math.ceil(fullPrice - fullPrice * (rollback / 100));

if (fullPrice > 30_000) {
    console.log("Даем скидку в 10%");
} else if (fullPrice > 15_000 && fullPrice < 30_000) {
    console.log("Даем скидку в 5%");
} else if (fullPrice > 0 && fullPrice < 15_000) {
    console.log("Скидка не предусмотрена");
} else {
    console.log("Что то пошло не так");
}

console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);
console.log(`Стоимость верстки экранов ${screenPrice} долларов`);
console.log(`Стоимость разработки сайта ${fullPrice} долларов`);
console.log(screens.toLowerCase().split(', '));
console.log(`Процент отката посреднику за работу: ${fullPrice * (rollback / 100)}`)