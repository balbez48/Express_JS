const getString = function (str) {

    if (typeof str !== "string") {
        return 'Это не строка';
    }

    const newStr = str.trim();
    const lenStr = newStr.length;
    if (lenStr > 30) {
        return newStr.slice(0, 29) + '...'
    }
}

console.log(getString('— Если строка более 30 знаков - то после 30го символа часть текста скрывается и вместо них появляются три точки (...)'))
console.log(getString(true));
console.log(getString(150));