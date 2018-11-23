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

loadCookie();


function loadCookie() {
    listTable.innerHTML = '';
    let array_cookie = document.cookie.split('; ').map((array) => {
        return array.split('=');
    });
    for (let i = 0; i < array_cookie.length; i++) {
        let element = createTR(array_cookie[i]);
        listTable.appendChild(element);
    }
}


addButton.addEventListener('click', () => {
    if (filterNameInput.value) {
        //если в фильтре есть значиние
        if (isMatching(addValueInput.value, filterNameInput.value)) {
            //если задаваемое значение соответсвуєт фильтру
            setCookie(addNameInput.value, addValueInput.value); //добавляєм новую куку в браузер
            let array_cookie = document.cookie.split('; ').map((array) => {
                return array.split('=');
            }); //array_cookie - cписок всех кук в браузере

            let element = createTR(array_cookie[array_cookie.length - 1]); //формируем новий елемент с последий добавленой куки
            listTable.appendChild(element); //добавляєм его в таблицу
            setTimeout(() => {
                addNameInput.value = '';
                addValueInput.value = '';
            }, 100);
        } else {
            //если задаваемое значение не соответсвуєт фильтру
            let cookies = document.querySelectorAll('.NameOfcookie');
            for(let name of cookies){
                if(name.innerHTML === addNameInput.value){
                    //если имя такой куки уже есть
                    console.log('name true');
                    name.parentElement.remove();
                }
            }
            //если задаваемое значение не соответсвуєт фильтру, устанавливаем новую куку только в браузер
            setCookie(addNameInput.value, addValueInput.value);
            setTimeout(() => {
                addNameInput.value = '';
                addValueInput.value = '';
            }, 100);
        }
    } else {
        //если в фильтре нет значиние
        setCookie(addNameInput.value, addValueInput.value);
        loadCookie();
        setTimeout(() => {
            addNameInput.value = '';
            addValueInput.value = '';
        }, 100);
    }

});


filterNameInput.addEventListener('keyup', function (e) {
    listTable.innerHTML = '';
    let array_cookie = document.cookie.split('; ').map((array) => {
        return array.split('=');
    });
    //console.log(array_cookie[0][1]);
    for (let i = 0; i < array_cookie.length; i++) {
        if (e.target.value === '') {
            loadCookie();
        } else {
            if ((isMatching(array_cookie[i][0], e.target.value)) || (isMatching(array_cookie[i][1], e.target.value))) {
                let element = createTR(array_cookie[i]);
                listTable.appendChild(element);
            }
        }
    }
});

const btn_d = document.querySelectorAll('.delete-btn');

document.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON' && e.target.className === 'delete-btn') {
        console.log(e.target.className);
        e.target.parentNode.remove();
        deleteCookie(e.target.parentNode.querySelector('.NameOfcookie').textContent);
    }
});


function createTR(element) {
    let tr = document.createElement('tr');
    let name = document.createElement('th');
    let value = document.createElement('th');

    let btn = document.createElement('button');
    btn.classList.add('delete-btn');
    btn.innerHTML = "X";

    name.classList.add('NameOfcookie');
    value.classList.add('valueOfcookie');
    name.innerHTML = element[0];
    value.innerHTML = element[1];

    tr.appendChild(name);
    tr.appendChild(value);
    tr.appendChild(btn);
    return tr;
}


function isMatching(full, chunk) {
    return full.toUpperCase().includes(chunk.toUpperCase());
}


// устанавливает cookie с именем name и значением value
// options - объект с свойствами cookie (expires, path, domain, secure)
function setCookie(name, value, options) {
    options = options || {};

    var expires = options.expires;

    if (typeof expires == "number" && expires) {
        var d = new Date();
        d.setTime(d.getTime() + expires * 1000);
        expires = options.expires = d;
    }
    if (expires && expires.toUTCString) {
        options.expires = expires.toUTCString();
    }

    value = encodeURIComponent(value);

    var updatedCookie = name + "=" + value;

    for (var propName in options) {
        updatedCookie += "; " + propName;
        var propValue = options[propName];
        if (propValue !== true) {
            updatedCookie += "=" + propValue;
        }
    }

    document.cookie = updatedCookie;
}

// удаляет cookie с именем name
function deleteCookie(name) {
    setCookie(name, "", {
        expires: -1
    })
}