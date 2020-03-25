//меню-бургер
$(".burger").click(function () {
  $(".mobile-menu").addClass("active");
});


$(".close").click(function () {
  $(".mobile-menu").removeClass("active");
});


$(".mobile-menu__link").click(function () {
  $(".mobile-menu").removeClass("active");
});


// слайдер
const left = document.querySelector("#left");
const right = document.querySelector("#right");
const slider = document.querySelector("#slider");

right.addEventListener("click", function (e) {
  loop("right", e);
});

left.addEventListener("click", function (e) {
  loop("left", e);
});

function loop(direction, e) {
  e.preventDefault();
  if (direction === "right") {
    slider.appendChild(slider.firstElementChild);
  } else {
    slider.insertBefore(slider.lastElementChild, slider.firstElementChild);
  }
}









//карта
ymaps.ready(init);
var myMap;

function init() {
  myMap = new ymaps.Map("map", {
    center: [55.75399400, 37.62209300],
    zoom: 13,
    controls: []
  });
  myMap.behaviors.disable('scrollZoom');
}
