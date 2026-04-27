/*
1) Выведите на страницу текущую дату и время в 2-х форматах:
    a) 'Сегодня Вторник, 4 февраля 2020 года, 21 час 5 минут 33 секунды'
    б) '04.02.2020 - 21:05:33'
2) Для вывода в формате (а) напишите функцию, которая будет менять склонение слов в зависимости от числа, "час, часов, часа"
3) Для вывода в формате (б) напишите функцию, которая будет добавлять 0 перед значениями которые состоят из одной цифры (из 9:5:3 1.6.2019 сделает 09:05:03 01.06.2019)
4) С помощью функции setInterval, реализуйте обновление даты и времени каждую секунду
 */

function DateA(date) {
    const week = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
    const months = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];
    const day = date.getDay();
    const month = date.getMonth();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    function checkHours(num) {
        let nameHours = '';
        if (num === 0) {
            return nameHours = 'часов';
        } else if (num === 1) {
            return nameHours = 'час';
        } else if (num > 1 && num < 5) {
            return nameHours = 'часа';
        } else if (num > 4) {
            return nameHours = 'часов';
        }
    }

    return `Сегодня ${week[day]}, ${day} ${months[month]} ${year} года, ${hours} ${checkHours(hours)} ${minutes} минут ${seconds} секунды`
}


function DateB(date) {
    const day = date.getDay();
    const month = date.getMonth();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const array = [day, month, hours, minutes, seconds];
    for (let i in array) {
        if (array[i] < 10) {
            array[i] = '0' + array[i];
        }
    }
    return array[2] + ':' + array[3] + ':' + array[4] + ' ' + array[0] + '.' + array[1] + '.' + year //09:05:03 01.06.2019
}

const interval = setInterval(() => {
    let curDate = new Date()
    console.log(DateA(curDate));
    // console.log(DateB(curDate));
}, 1000) 