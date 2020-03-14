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

//accordeon
var section = $('.accordeon__section');

function toggleAccordion() {
  section.removeClass('active');
  $(this).addClass('active');
}

section.on('click', toggleAccordion);