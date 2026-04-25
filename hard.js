/*
Необходимо выполнить в отдельном js файле, подключенному к отдельной HTML странице

1) Создать массив week и записать в него дни недели в виде строк

Вывести на экран все дни недели
Каждый из них с новой строчки
Выходные дни - курсивом
Текущий день - жирным шрифтом(использовать объект даты)
 */

const week = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
const date = new Date();
const curDay = date.getDay() - 1;
console.log(curDay)

const body = document.querySelector('.body');

week.forEach((day, index) => {
    let elem = document.createElement('p');
    if (curDay === index) {

        elem.innerHTML = `${week[index]}`;
        body.append(elem)
    } else if (index === 5 || index === 6) {

        elem.innerHTML = `${week[index]}`;
        body.append(elem)
    } else {
        elem.innerHTML = `${week[index]}`;
        body.append(elem)
    }
})