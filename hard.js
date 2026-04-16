let num = 266219;
let len = String(num).length;
let prod = 1;
for (let i = 0; i < len; i++) {
    prod *= num % 10;
    num -= num % 10
    num /= 10;
    console.log(num);
}
console.log(prod);