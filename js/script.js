/* Задания на урок:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */

"use strict";

const movieDB = {
  movies: [
    "Логан",
    "Лига справедливости",
    "Ла-ла лэнд",
    "Одержимость",
    "Скотт Пилигрим против всех",
    "Ахуйло",
  ],
};

const adv = document.querySelectorAll(".promo__adv img"),
  genre = (document.querySelector(".promo__genre").textContent = "Драма"),
  poster = (document.querySelector(".promo__bg").style.backgroundImage =
    'url("img/bg.jpg")'),
  movieListElements = document.querySelectorAll(".promo__interactive-item"),
  movieList = document.querySelector(".promo__interactive-list"),
  confirmBtn = document.querySelector("#confirm"),
  input = document.querySelector("#textInput"),
  deleteBtns = document.querySelectorAll(".delete"),
  checkbox = document.querySelector("input[type='checkbox']");

const sliceMovieTitile = () => {
  movieDB.movies.forEach((film, i, arr) => {
    if (film.length > 21) {
      arr[i] = film.slice(0, 21) + "...";
    }
  });
  return movieDB;
};

const makeFavourite = () => {
  if (checkbox.checked) {
    console.log("Добавляем любимый фильм");
  }
};

const getMovieList = () => {
  sliceMovieTitile();

  movieDB.movies.sort();
  movieList.innerHTML = "";
  movieDB.movies.forEach((film, i) => {
    movieList.innerHTML += `
           <li class="promo__interactive-item">${i + 1}. ${film}
                  <div class="delete"></div>
           </li>
          `;
  });
};

const addMovieInList = (e) => {
  e.preventDefault();
  if (!input.value.trim()) {
    return;
  }
  movieDB.movies.push(input.value);

  makeFavourite();
  getMovieList();

  input.value = "";
};

const deleteMovieInList = (removedMovie) => {
  movieDB.movies.forEach((film, i, arr) => {
    if (film === removedMovie) {
      arr.splice(i, 1);
    }
  });

  getMovieList();
};

getMovieList();

confirmBtn.addEventListener("click", addMovieInList);

movieList.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    deleteMovieInList(e.target.parentElement.textContent.slice(3).trim());
  }
});

adv.forEach((item) => {
  item.remove();
});
