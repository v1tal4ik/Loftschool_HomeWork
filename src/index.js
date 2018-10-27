/* ДЗ 1 - Функции */

/*
 Задание 1:

 1.1: Добавьте к функции параметр с любым именем
 1.2: Функция должна возвращать аргумент, переданный ей в качестве параметра

 Пример:
   returnFirstArgument(10) вернет 10
   returnFirstArgument('привет') вернет `привет`

 Другими словами: функция должна возвращать в неизменном виде то, что поступает ей на вход
 */
function returnFirstArgument(arg) {
    return arg;
}
console.log("Задание 1:", returnFirstArgument('Hello world!'));

/*
 Задание 2:

 2.1: Функция должна возвращать сумму переданных аргументов

 Пример:
   sumWithDefaults(10, 20) вернет 30
   sumWithDefaults(2, 4) вернет 6

 2.1 *: Значение по умолчанию для второго аргумента должно быть равно 100

 Пример:
   sumWithDefaults(10) вернет 110
 */
function sumWithDefaults(a, b) {
    b = b || 100;
    return a + b;
}
console.log("Задание 2:", sumWithDefaults(10, 20));
console.log("Задание 2.1:", sumWithDefaults(10));

/*
 Задание 3:

 Функция должна принимать другую функцию и возвращать результат вызова этой функции

 Пример:
   returnFnResult(() => 'привет') вернет 'привет'
 */
function returnFnResult(fn) {
    return fn();
}

var result_arrow = returnFnResult(() => 'Стрелочная функции сработала!'); //передача function Arrow

var result_declaration = returnFnResult(function () {
    return 'Function declaration сработала!';
}); //передача function Declaration

console.log('Задание 3:', result_arrow);
console.log('Задание 3:', result_declaration);




/*
 Задание 4:

 Функция должна принимать число и возвращать новую функцию (F)
 При вызове функции F, переданное ранее число должно быть увеличено на единицу и возвращено из F

 Пример:
   var f = returnCounter(10);

   console.log(f()); // выведет 11
   console.log(f()); // выведет 12
   console.log(f()); // выведет 13
 */
function returnCounter(number) {
    return function F() {
        number = number || 0;
        number++;
        return number;
    };
}

var f = returnCounter(10);
console.log('Задание 4:', f(), f(), f());


/*
 Задание 5 *:

 Функция должна возвращать все переданные ей аргументы в виде массива
 Количество переданных аргументов заранее неизвестно

 Пример:
   returnArgumentsArray(1, 2, 3) вернет [1, 2, 3]
 */
function returnArgumentsArray(...arr) {
    return arr;
}

console.log('Задание 5:', returnArgumentsArray(1, 2, 3, 4, true, 'hello'));
/*
 Задание 6 *:

 Функция должна принимать другую функцию (F) и некоторое количество дополнительных аргументов
 Функция должна привязать переданные аргументы к функции F и вернуть получившуюся функцию

 Пример:
   function sum(a, b) {
     return a + b;
   }

   var newSum = bindFunction(sum, 2, 4);

   console.log(newSum()) выведет 6
 */


function sum(numbers) {
    return function () {
        let result = 0;
        for (let i = 0; i < numbers.length; i++) {
            result += numbers[i];
        }
        return result;
    };
}


function bindFunction(fn, ...numbers) {
    return fn(numbers);
}

var newSum = bindFunction(sum, 2, 4);

console.log('Задание 6:',newSum());

//console.log('Задание 6: newSum = ', bindFunction(sum,10,-20.02,30.56,2,false,true));


export {
    returnFirstArgument,
    sumWithDefaults,
    returnArgumentsArray,
    returnFnResult,
    returnCounter,
    bindFunction
}