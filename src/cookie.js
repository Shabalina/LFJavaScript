import {isMatching} from './towns';
/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */
 
/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');


function isCookieNameSet(inputName){  
    var name =  inputName + '=';
    var cookieList = document.cookie.split(';');
    for(var i = 0; i <cookieList.length; i++){
        var c = cookieList[i];
        while (c.charAt(0) === ' '){
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0){
            return i;
        }
    }
    return false;
  }    

function addNewRow (name, value){   
  var newRow = listTable.insertRow(-1);
  var nameCell = newRow.insertCell(0);
  var valCell = newRow.insertCell(1);
  var delCell = newRow.insertCell(2);  
  nameCell.innerHTML = name;
  valCell.innerHTML = value;
  var delButton = document.createElement('BUTTON');
  delButton.innerHTML = 'Delete';  
  delButton.onclick = function(event){
      var target = event.target;
      cookieDel(target.closest('tr').cells[0].innerHTML);
      target.closest('tr').remove(); 
      }
  delCell.appendChild(delButton);     
}

function clearTable(){
  for (var i=0; i <listTable.rows.length;){
    listTable.deleteRow(i);
  }
  return;
}

function editTable(row, value){
  listTable.rows[row].cells[1].innerHTML = value;
}

function cookieDel(delName){
document.cookie = delName + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
}

function dressCode(chunk){
  if (document.cookie){
    clearTable();
    var cookieList = document.cookie.split('; ');
    for (let cookie of cookieList){
      if (isMatching(cookie, chunk)){
        var [name, value] = cookie.split('=');
        addNewRow(name, value);
      }
    }
  }
}

function createDefaultTable(){
  if (document.cookie){    
    clearTable();
    let cookieList = document.cookie.split('; ');
    for (let cookie of cookieList){
        var [name, value] = cookie.split('=');
        addNewRow(name, value);
    }
  }
}

filterNameInput.addEventListener('keyup', function() {   
  if (!filterNameInput.value){
    createDefaultTable()
    return;
  }
  dressCode(filterNameInput.value);
  })

addButton.addEventListener('click', () => {
  if (filterNameInput.value){
    document.cookie = `${addNameInput.value}=${addValueInput.value}`; 
    dressCode(filterNameInput.value);
    return;
  }
  if (document.cookie){
    var cookieRow = isCookieNameSet(addNameInput.value);
    if (cookieRow){
        document.cookie = `${addNameInput.value}=${addValueInput.value}`; 
        editTable(cookieRow, addValueInput.value);
        return;
    }    
  }
  document.cookie = `${addNameInput.value}=${addValueInput.value}`; 
  addNewRow(addNameInput.value, addValueInput.value);
});

