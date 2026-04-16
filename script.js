let title = "Проектик";
let screens = "Простые, Сложные, Интерактивные";
let screenPrice = 2500;
let rollback = 20;
let fullPrice = 5000;
let adaptive = false;


console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);
console.log(`Стоимость верстки экранов ${screenPrice} долларов`);
console.log(`Стоимость разработки сайта ${fullPrice} долларов`);
console.log(screens.toLowerCase().split(', '));
console.log(`Процент отката посреднику за работу: ${fullPrice * (rollback / 100)}`)