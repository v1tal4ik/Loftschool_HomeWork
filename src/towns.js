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

const homeworkContainer = document.querySelector('#homework-container');

function loadTowns() {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json');
        xhr.send();
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status >= 400) {
                reject(xhr.status);
            } else {
                let cities = xhr.response;
                let cities_sort = cities.sort(sortAlphabet);
                resolve(cities_sort);
            }
        });
        
        xhr.addEventListener('error',()=>{
            reject(xhr.status);
        })


        function sortAlphabet(a, b) {
            if (a.name < b.name) {
                return -1
            };
            if (a.name > b.name) {
                return 1
            };
            return 0;
        }

    });
}

function isMatching(full, chunk) {
    return full.toUpperCase().includes(chunk.toUpperCase());
}



/* Блок с надписью "Загрузка" */
let loadingBlock = homeworkContainer.querySelector('#loading-block');
/* Блок с текстовым полем и результатом поиска */
const filterBlock = homeworkContainer.querySelector('#filter-block');
/* Текстовое поле для поиска по городам */
const filterInput = homeworkContainer.querySelector('#filter-input');
/* Блок с результатами поиска */
const filterResult = homeworkContainer.querySelector('#filter-result');


var result = loadTowns();
result.then(
    (towns) => {
        loadingBlock.style.display = 'none';
        filterBlock.style.display = 'block';

        filterInput.addEventListener('keyup', function (e) {
            filterResult.innerHTML = '';
            for (let city of towns) {
                if (filterInput.value == '') {
                    filterResult.innerHTML = '';
                } else {
                    if (isMatching(city.name, filterInput.value)) {
                        let div = document.createElement('div');
                        div.classList.add('city-item');
                        div.textContent = city.name;
                        filterResult.appendChild(div);
                    }
                }

            }
        });
    },
    (status) => {
        console.log(status);
        const errorBlock = document.createElement('div');
        errorBlock.classList.add('errorBlock');

        const errorText = document.createElement('p');
        errorText.classList.add('errorText');
        errorText.innerHTML = status + ' - Не вдалося загрузити';

        const repeatBtn = document.createElement('button');
        repeatBtn.classList.add('repeatBtn');
        repeatBtn.textContent = "Повторить";

        errorBlock.appendChild(errorText);
        errorBlock.appendChild(repeatBtn);

        loadingBlock.style.display = 'none';
        homeworkContainer.insertBefore(errorBlock, filterBlock);


        repeatBtn.addEventListener('click', () => {
             
        })
    });

export {
    loadTowns,
    isMatching
};