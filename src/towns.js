import {loadAndSortTowns} from './index';

/*
 Страница должна предварительно загрузить список городов из
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 и отсортировать в алфавитном порядке.

 При вводе в текстовое поле, под ним должен появляться список тех городов,
 в названии которых, хотя бы частично, есть введенное значение.
 Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.

 Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 После окончания загрузки городов, надпись исчезает и появляется текстовое поле.

 Разметку смотрите в файле towns-content.hbs

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер

 *** Часть со звездочкой ***
 Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 При клике на кнопку, процесс загруки повторяется заново
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

/*
 Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 */
function loadTowns() {
  return loadAndSortTowns();
}

/*
 Функция должна проверять встречается ли подстрока chunk в строке full
 Проверка должна происходить без учета регистра символов

 Пример:
   isMatching('Moscow', 'moscow') // true
   isMatching('Moscow', 'mosc') // true
   isMatching('Moscow', 'cow') // true
   isMatching('Moscow', 'SCO') // true
   isMatching('Moscow', 'Moscov') // false
 */
function isMatching(full, chunk){  
  function checkMatch(index){
    for (var char of chunkArr){
      if(fullArr[index] !== char){
        return false;
      }
      index++;
    }
    return true;
  }

  var fullArr = full.toUpperCase().split('');
  var chunkArr = chunk.toUpperCase().split('');
  for (var i = 0; i< fullArr.length; i++){
      if (chunkArr[0] === fullArr[i]){
        if (fullArr.lenght - i < chunkArr.length){
          return false;
        }
        if (checkMatch(i)){
          return true;
        }
      }
    }
  return false;  
  }

/* Блок с надписью "Загрузка" */
const loadingBlock = homeworkContainer.querySelector('#loading-block');
/* Блок с текстовым полем и результатом поиска */
const filterBlock = homeworkContainer.querySelector('#filter-block');
/* Текстовое поле для поиска по городам */
const filterInput = homeworkContainer.querySelector('#filter-input');
/* Блок с результатами поиска */
const filterResult = homeworkContainer.querySelector('#filter-result');
//var result;
var prom = loadTowns();
prom.then(function(result){
  loadingBlock.style.display = 'none';
  filterBlock.style.removeProperty('display');
  
  filterInput.addEventListener('keyup', function() {  
    filterResult.innerHTML = '';
    for (let key in result){
      if( isMatching(result[key].name, filterInput.value)){
      //  console.log(result[key].name, filterInput.value)
        const resItem = document.createElement('div');
        resItem.textContent = result[key].name;
        filterResult.appendChild(resItem);
        }
      }
    })  
  });

export {
    loadTowns,
    isMatching
};
