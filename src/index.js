import { error } from "util";

/* ДЗ 6 - Асинхронность и работа с сетью */

/*
 Задание 1:

 Функция должна возвращать Promise, который должен быть разрешен через указанное количество секунду

 Пример:
   delayPromise(3) // вернет promise, который будет разрешен через 3 секунды
 */
function delayPromise(seconds) {
  var prom = new Promise(r => setTimeout(r, seconds*1000));
  return prom;  
}

/*
 Задание 2:

 2.1: Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json

 2.2: Элементы полученного массива должны быть отсортированы по имени города

 Пример:
   loadAndSortTowns().then(towns => console.log(towns)) // должна вывести в консоль отсортированный массив городов
 */
function loadAndSortTowns(){

    function sortOn(property){
      return function(a, b){
          if (a[property] < b[property]){
              return -1;
          }else if (a[property] > b[property]){
              return 1;
          } else {
              return 0;   
          }
      }
  }

  return new Promise(function(resolve, reject){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json', true);    
    xhr.onload = function(){
        if (xhr.status >= 400){
          // обработать ошибку
          console.log(xhr.status + ': ' + xhr.statusText); 
        } else {
          var cities = JSON.parse(xhr.responseText);
          resolve(cities.sort(sortOn("name")));
        }        
    }
    xhr.onerror = function(){
      reject(new Error("Network Error"));
    }
    xhr.send();
  })  
}

export {
    delayPromise,
    loadAndSortTowns
};
