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

//slick-slider
// $(document).ready(function () {
//   $('.slider').slick({
//     prevArrow: $('.slider_arrow_left'),
//     nextArrow: $('.slider_arrow_right')


//   });
// });


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
