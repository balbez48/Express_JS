const lang = prompt('Введите язык (формат: "ru" "en" ): ');

if (lang === 'ru') {
    console.log('Дни недели на русском (if): \nПонедельник \nВторник \nСреда \nЧетверг \nПятница \nСуббота \nВоскресенье');
} else if (lang === 'en') {
    console.log('Дни недели на английском (if): \nMonday \nTuesday \nWednesday \nThursday \nFriday \nSaturday \nSunday');
} else {
    console.log('Ввод неверен');
}

switch (lang) {
    case "ru": {
        console.log('Дни недели на русском (case): \nПонедельник \nВторник \nСреда \nЧетверг \nПятница \nСуббота \nВоскресенье');
    } break
    case "en": {
        console.log('Дни недели на английском (case): \nMonday \nTuesday \nWednesday \nThursday \nFriday \nSaturday \nSunday');
    } break
    default: {
        console.log('Ввод неверен');
    }
}

const matrixDays = [
    ['ru', 'Дни недели на русском (матрица): \nПонедельник \nВторник \nСреда \nЧетверг \nПятница \nСуббота \nВоскресенье'],
    ['en', 'Дни недели на английском (матрица): \nMonday \nTuesday \nWednesday \nThursday \nFriday \nSaturday \nSunday'],
]

const index = (lang === 'ru' ? 0 : 1);
console.log(matrixDays[index][1]);


const namePerson = prompt('Имя испытуемого кодом: ');
console.log(namePerson === 'Артем' ? 'Директор' :
    namePerson === 'Александр' ? 'преподаватель' : 'студент')