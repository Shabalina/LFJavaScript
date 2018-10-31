/* ДЗ 2 - работа с массивами и объеектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */
function forEach(array, fn) {
  for(var i=0; i<array.length; i++){
    fn(array[i], i, array);
  }
}

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */
function map(array, fn) {
  var newArr = [];
  for(var i=0; i<array.length; i++){
    newArr.push(fn(array[i], i, array));  
  }
  return newArr;
}

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */
function reduce(array, fn, initial) {
  var init = initial ? 0 : 1;
  initial = initial || array[0];

  for(var i=init; i<array.length; i++){
    initial = fn(initial, array[i], i, array);
  }
  return initial;
}

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {
  var allNamesUp = Object.getOwnPropertyNames(obj).join(',').toUpperCase();
  return allNamesUp.split(',');  
}

/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */
function slice(array, from = 0, to = array.length) {  
  var slicedArr = [];
  to = to >= 0 ? to : (array.length + to);
  to = to <= array.length ? to : array.length;
  if (from<0){
    from = from <(-array.length) ? 0 : array.length + from;
    }
  for(var i=from; i<to; i++){
    slicedArr.push(array[i]);
  }
  return slicedArr;  
}

/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
  var handler = {
    set: function(obj, prop, value) {
      if (!Number.isInteger(value)) {
          throw new TypeError('The value is not an integer');
      }  
      obj[prop] = value*value;       
    }    
  }
  return new Proxy(obj, handler); 
}

export {
    forEach,
    map,
    reduce,
    upperProps,
    slice,
    createProxy
};
