//////// меню-бургер ////////

document.querySelector('.burger').onclick = function () {
  document.querySelector('.mobile-menu').classList.add('active');
}

document.querySelector('.mobile-menu__list').onclick = function () {
  document.querySelector('.mobile-menu').classList.remove('active');
}

document.querySelector('.close').onclick = function () {
  document.querySelector('.mobile-menu').classList.remove('active');
}

//////// TEAM-ACCO ////////
var accoItems = {
  self: document.querySelectorAll('.team__common'),
  avatar: document.querySelectorAll('.team__foto'),
  link: document.querySelectorAll('.team__title'),
  drop: document.querySelectorAll('.team__hiden'),
  computedHeight: []
};

var media = window.matchMedia('(max-width: 768px)');
var avatarComputedHeight = [];

window.onload = function () { 
}

for (let i = 0; i < accoItems.self.length; i++) {  
  accoItems.link[i].addEventListener('click', function () {    
    for (let x = 0; x < accoItems.self.length; x++) {
      if (x != i && accoItems.self[x].classList.contains('team__common--active')) {
        accoItems.self[x].classList.remove('team__common--active');
        if (media.matches) {
          accoItems.drop[x].style.height = '';
          accoItems.avatar[x].style.height = '';
        }
      }
    }   
    if (accoItems.self[i].classList.contains('team__common--active')) {
      accoItems.self[i].classList.remove('team__common--active');

      if (media.matches) {
        accoItems.drop[i].style.height = '';
        accoItems.avatar[i].style.height = '';
      }

    } else {
      accoItems.self[i].classList.add('team__common--active');

      if (media.matches) {
        accoItems.drop[i].style.height = accoItems.computedHeight[i];
        accoItems.avatar[i].style.height = avatarComputedHeight[i];
      }

    }
  });
}

//////// MENU-ACCO ////////
let accMenu = () => {

  let calculateWidth = () => {
    let windowWidth = $(window).width();
    let links = $(".accordeon__title");
    let linksWidth = links.width();
    let reqWidth = windowWidth - linksWidth * links.length;

    return reqWidth > 550 ? 550 : reqWidth;
  };

  let oTeamLink = document.querySelectorAll(".accordeon__title");
  oTeamLink.forEach(function (personName) {
    personName.addEventListener("click", function (e) {
      e.preventDefault();
      let activePerson = document.querySelector(".accordeon__section.active");
      let otherPerson = document.querySelectorAll(".accordeon__section");

      if (activePerson) { 
        let teamAccordeonDetails = activePerson.querySelector(".accordeon__content");
        teamAccordeonDetails.style.width = "0px";
        activePerson.classList.remove("active");
      }

      if (!activePerson || activePerson.querySelector(".accordeon__title") !== this) {

        let currentPerson = this.closest(".accordeon__section");
        currentPerson.classList.remove("hidden");
        currentPerson.classList.add("active");

        let currentPersonInfo = currentPerson.querySelector(".accordeon__content");
        currentPersonInfo.style.width = calculateWidth() + 'px';
      }
    })
  })

};
accMenu();


//////// SLIDERS ////////

function Slider(selector) {
  this.target = document.querySelector(selector);
  this.buttons = this.target.querySelectorAll('[data-vector]');
  var list = this.target.querySelector('ul');
  this.countSlides = list.children.length;
  this.currentSlideIndex = 0;
  list.style.transform = `translateX(-100%)`;

  //Добавляет копии первого в конец, и последнего в начало слайдера
  //Сделано для бесконечной прокрутки
  function addElems() {
    var newElemAfterLast = document.createElement('li');
    var newElemBeforeFirst = document.createElement('li');

    newElemAfterLast.classList = list.firstElementChild.classList;
    newElemBeforeFirst.classList = list.lastElementChild.classList;

    newElemAfterLast.innerHTML = list.firstElementChild.innerHTML;
    newElemBeforeFirst.innerHTML = list.lastElementChild.innerHTML;

    list.appendChild(newElemAfterLast);
    list.insertBefore(newElemBeforeFirst, list.firstElementChild);
  }

  //Переключение на следующий слайд
  this.next = function () {
    if (this.currentSlideIndex <= this.countSlides - 1) {
      this.currentSlideIndex++;
    }
  }
  //Переключение на следующий слайд
  this.previous = function () {
    if (this.currentSlideIndex >= 0) {
      this.currentSlideIndex--;
    }
  }

  // Переключение слайдера
  this.changeSlide = function (index, timeout) {
    list.style.transform = `translateX(${-(index * 100) - 100}%)`;
    if (this.currentSlideIndex == this.countSlides) {
      this.currentSlideIndex = 0;
      setTimeout(() => {
        list.style.transition = 'none';

        list.style.transform = `translateX(-100%)`;

        setTimeout(() => {
          (list.style.transition = '')
        }, 30);

      }, timeout);
    } else if (this.currentSlideIndex == -1) {
      this.currentSlideIndex = this.countSlides - 1;
      setTimeout(() => {
        list.style.transition = 'none';
        list.style.transform = `translateX(${-(this.countSlides * 100)}%)`;
        setTimeout(() => {
          (list.style.transition = '')
        }, 30);

      }, timeout);
    }
  }

  addElems();

  this.addListenersForArrows = () => {
    for (let i = 0; i < this.buttons.length; i++) {
      this.buttons[i].addEventListener('click', (e) => {

        e.preventDefault();

        var vector = this.buttons[i].dataset.vector;
        this[vector](); // Вызывается ф-я next или previous в зависимости от нажатой кнопки

        this.changeSlide(this.currentSlideIndex, 500);

      });
    }
  }
}

// Слайдер батончики
var barsSlider = new Slider('#sec3');

barsSlider.addListenersForArrows();


// Слайдер отзывы
var reviewsSlider = new Slider('#commentSlider');

var clickTarget;

var activeButton = reviewsSlider.target.querySelector('.comment__switch-link--active');

var timerId = setInterval(function () {

  activeButton.classList.remove('comment__switch-link--active');

  reviewsSlider.next();

  reviewsSlider.changeSlide(reviewsSlider.currentSlideIndex, 2000);


  if (reviewsSlider.currentSlideIndex >= 0 && reviewsSlider.currentSlideIndex < reviewsSlider.countSlides) {
    reviewsSlider.buttons[reviewsSlider.currentSlideIndex].classList.add('comment__switch-link--active');

    activeButton = reviewsSlider.buttons[reviewsSlider.currentSlideIndex];
  }

}, 5000)

reviewsSlider.target.addEventListener('click', function (e) {

  e.preventDefault();

  clearInterval(timerId);

  if (e.target.closest('[data-vector]')) {

    clickTarget = e.target.closest('[data-vector]');

    if (!clickTarget.classList.contains('comment__switch-link--active')) {

      activeButton.classList.remove('comment__switch-link--active');
      clickTarget.classList.add('comment__switch-link--active');
      reviewsSlider.changeSlide(clickTarget.dataset.vector - 1, 2000);
      activeButton = clickTarget;
    }
  }
});

//простой слайдер (работает)
// const left = document.querySelector("#left");
// const right = document.querySelector("#right");
// const slider = document.querySelector("#slider");

// right.addEventListener("click", function (e) {
//   loop("right", e);
// });

// left.addEventListener("click", function (e) {
//   loop("left", e);
// });

// function loop(direction, e) {
//   e.preventDefault();
//   if (direction === "right") {
//     slider.appendChild(slider.firstElementChild);
//   } else {
//     slider.insertBefore(slider.lastElementChild, slider.firstElementChild);
//   }
// }


// слайдер с touch не работает
// const slide = (function() {
//   const left = document.querySelector('.slider__arrow--left');
//   const right = document.querySelector('.slider__arrow--right');
//   const slider = document.querySelector('.slider');
//   const itemCount = document.querySelectorAll('.slider__item').length;
//   let pos = 0;
//   let flag = true;
//   let clientX, clientY;

//   function setTransform() {
//     if (flag) {
//       flag = false;

//       slider.style.transform = `translateX(${-pos * slider.offsetWidth}px)`;
//       setTimeout(() => flag = true, ms);
//     }
//   }
//   function prev() {
//     pos == 0 ? pos = itemCount - 1 : pos--;
//     setTransform();
//   }
//   function next() {
//     pos == itemCount - 1 ? pos = 0 - 1 : pos++;
//     setTransform();
//   }

//   function addListeners() {
//     left.addEventListener('click', prev);
//     right.addEventListener('click', next);
//     window.addEventListener('resize', setTransform);
//   }
//   //touch
//   slider.addEventListener('touchstart', function(e) {
//     clientX = e.touches[0].clientX;
//     // console.log('точка по оси Х косание' + clientX);
//     clientY = e.touches[0].clientY;   
//   });

//   slider.addEventListener('touchend', function(e) {
//     let deltaX, deltaY;
//     deltaX = e.changedTouches[0].clientX - clientX;
//     // console.log(deltaX);
//     deltaY = e.changedTouches[0].clientY - clientY;
//     let mod = Math.abs(deltaX) - Math.abs(deltaY);
//     // console.log(mod);

//     if (deltaX < 0) {
//       next();
//     } else if (deltaX > 0) {
//       prev();
//     }
//   });

//   return{
//     init: addListeners
//   }

// }) ();

// slide.init();


//////// PLAYER ////////
(function () {
  const player = document.querySelector('.player')
  const playerStart = document.querySelector('.player__play')
  const video = document.querySelector('.player__video')
  const playerPlaybackBtn = document.querySelector('.player__playback-btn')
  const playerPlayback = document.querySelector('.player__playback')
  const playerVolBtn = document.querySelector('.player__vol')
  const playerVolume = document.querySelector('.player__volume')
  const playerVolumeBtn = document.querySelector('.player__volume-btn')
  const playerSplash = document.querySelector('.player__splash')

  playerStart.addEventListener('click', () => {
    if (video.paused) {
      video.play();
      player.classList.add('player--active')
    }
    else {
      video.pause();
      player.classList.remove('player--active')
    }
  })

  playerSplash.addEventListener('click', () => {
    video.play()
  })

  video.addEventListener('play', () => {
    player.classList.add('player--active')
  })

  video.addEventListener('timeupdate', (event) => {
    const completedSec = video.currentTime;
    const completedPercent = (completedSec / video.duration) * 100;
    playerPlaybackBtn.style.left = `${completedPercent}%`
  });

  video.addEventListener('ended', function () {
    video.currentTime = 0;
    player.classList.remove('player--active')
  });

  playerPlayback.addEventListener('click', (e) => {
    const bar = $(e.currentTarget);
    const newButtonPosition = e.pageX - bar.offset().left;
    const buttonPosPercent = (newButtonPosition / bar.width()) * 100;
    const newPlayerTimeSec = (video.duration / 100) * buttonPosPercent;
    playerPlaybackBtn.style.left = `${buttonPosPercent}%`
    video.currentTime = newPlayerTimeSec
  })

  playerVolBtn.addEventListener('click', () => {
    video.volume = !video.volume
    const volPos = video.volume ? 100 : 0
    playerVolumeBtn.style.left = `${volPos}%`
  })

  playerVolume.addEventListener('click', (e) => {
    const bar = $(e.currentTarget);
    const newButtonPosition = e.pageX - bar.offset().left;
    const buttonPosPercent = (newButtonPosition / bar.width()) * 100;
    const newPlayerVolume = (1 / 100) * buttonPosPercent;
    playerVolumeBtn.style.left = `${buttonPosPercent}%`
    video.volume = newPlayerVolume
  })
})()

//////// ФОРМА ////////

const orderForm = document.querySelector('#orderForm');
// const submitBtn = document.querySelector('#submitBtn');
submitBtn = orderForm.elements.submit;

submitBtn.addEventListener('click', function (event) {

  if (orderForm.checkValidity()) {
    event.preventDefault();
    const data = new FormData();
    data.append("name", orderForm.elements.username.value);
    data.append("phone", orderForm.elements.phone.value);
    data.append("comment", orderForm.elements.comment.value);
    data.append("to", "avacode777@yandex.ru");

    orderForm.elements.reset.click();

    // Создание AJAX запроса
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail/fail', true);
    xhr.responseType = 'json';
    xhr.send(data);

    // Создание экземпляра модального окна
    var modal = new Overlay('#overlayTemplate');

    // Высвечивание модального окна(окно ожидания ответа)
    modal.toggleClsButtonVisibility();
    modal.openOverlay("Ожидание ответа сервера");

    // Обработчик события ответа от сервера
    xhr.addEventListener('load', () => {
      modal.toggleClsButtonVisibility();

      // Смена текста в модальном окне
      modal.changeMessage(xhr.response.message);
    });
  }
});

//МОДАЛКА
function Overlay(templateSelector) {
  const template = document.querySelector(templateSelector);
  const overlay = createOverlay(template);
  const backGround = overlay.querySelector('.overlay');
  const msgContainer = overlay.querySelector('.modal__title');
  const closeBtn = overlay.querySelector('button');

  function createOverlay() {
    let overlay = document.createElement('div');
    overlay.innerHTML = template.innerHTML;
    return overlay;
  }

  this.openOverlay = (message) => {
    document.body.appendChild(overlay);
    msgContainer.textContent = message;
    document.body.style.overflow = 'hidden';
  }

  this.closeOverlay = () => {
    document.body.removeChild(overlay);
    document.body.style.overflow = '';
  }

  this.changeMessage = (newMessage) => {
    msgContainer.textContent = newMessage;
  }

  var eventHandler = (e) => {
    e.preventDefault();
    if (e.target === closeBtn || e.target === backGround) {
      this.closeOverlay();
    }
  }

  var isCloseBtnVisible = true;

  this.toggleClsButtonVisibility = () => {

    if (isCloseBtnVisible) {
      closeBtn.style.display = 'none';
      isCloseBtnVisible = false;
      overlay.removeEventListener('click', eventHandler);
    } else {
      closeBtn.style.display = '';
      isCloseBtnVisible = true;
      overlay.addEventListener('click', eventHandler);
    }
  }

  overlay.addEventListener('click', eventHandler);

}


// //////// СКРОЛЛ СЕКЦИЙ ////////

function OnePage(selector) {

  this.container = $(selector); //Родитель слайдов
  this.slides = this.container.children(); //Объект со слайдами
  var viewport = $(window); //Объект окна
  this.slidesCount = this.slides.length;//Кол-во слайдов
  var slideHeight = this.slides.outerHeight();//Высота слайда
  this.slideIndex = this.slides.first().index();//Номер слайда, от 0

  var isScrollDown;

  //Переменные связанные с пагинацией
  var pagList,
    pagItems,
    activePagItem,
    pagButton,
    activePagClass;
  //Ф-я добавления пагинации(опционально)
  this.addPagination = (selector, item, activeClass) => {
    pagList = $(selector);
    activePagClass = activeClass;

    this.slides.each((ndx) => {
      let clone = item.clone();
      clone.find('a').attr('data-vector', `${ndx}`);
      clone.appendTo(pagList);
    })

    pagItems = pagList.children();
    activePagItem = pagItems.eq(this.slideIndex);
    activePagItem.addClass(activePagClass);

    pagList.on('click', '[data-vector]', (e) => {
      e.preventDefault();
      pagButton = $(e.target);
      this.slideIndex = pagButton.attr('data-vector');
      this.changeSlide(this.slideIndex);

      activePagItem.removeClass(activePagClass);
      activePagItem = pagButton.parent();
      activePagItem.addClass(activePagClass);

    });
  }

  // Ограничение кол-ва вызовов переданной ф-ии
  var isDelayOn;
  function debounce(foo, time) {
    if (isDelayOn) {
      //do nothing
    } else {
      isDelayOn = true;
      window.setTimeout(() => {
        isDelayOn = false;
      }, time);
      foo();
    }
  }



  //Смена индекса слайда
  this.changeIndex = (isNext, index) => {
    if (isNext && index < this.slidesCount - 1) {
      index++;
    } else if (!isNext && index > 0) {
      index--;
    }
    return index;
  }

  //Смена слайда по индексу
  this.changeSlide = (index) => {
    $('html, body').stop(true, false).animate({
      'scrollTop': (index * slideHeight)
    }, 600);

    //Если добавлена пагинация
    if (pagList) {
      activePagItem.removeClass(activePagClass);
      activePagItem = pagItems.eq(index);
      activePagItem.addClass(activePagClass);
    }
  }

  this.wheelResponse = (isDown) => {
    if (isDown) {
      isScrollDown = true;
      this.slideIndex = this.changeIndex(isScrollDown, this.slideIndex);
      this.changeSlide(this.slideIndex);
    } else {
      isScrollDown = false;
      this.slideIndex = this.changeIndex(isScrollDown, this.slideIndex);
      this.changeSlide(this.slideIndex);
    }
  }

  //Обраб-к соб-й на прокрутку мыши 
  viewport.on('wheel', (event) => {

    var isDown = event.originalEvent.deltaY > 0 ? true : false;
    debounce(() => { this.wheelResponse(isDown) }, 600);
  })

  //Обраб-к соб-й на свайп
  var ts;
  viewport.on('touchstart', (e) => {
    ts = e.originalEvent.touches[0].clientY;
  });

  viewport.on('touchmove', (e) => {
    var te = e.originalEvent.changedTouches[0].clientY;
    var isDown;
    if (ts > te) {
      isDown = true;
    } else {
      isdown = false;
    }
    debounce(() => { this.wheelResponse(isDown) }, 600);
  });

}

var scroll = new OnePage('#mainContent');

var paginItem = $('<li>', {
  attr: { 'class': 'pagination__item' }
});
paginItem.html('<a href="" class="pagination__link"></a>');

scroll.addPagination('#mainPagination', paginItem, 'pagination__item--active');

// Обработчик событий на меню
$('body').on('click', '[href*="#"]', (e) => {
  e.preventDefault();
  let item = $(e.target.hash);

  scroll.slideIndex = item.index();
  scroll.changeSlide(scroll.slideIndex);
});

//////// КАРТА ////////

ymaps.ready(init);

var placemarks = [
  {
    latitude: 55.759213,
    longitude: 37.580373,
    hintContent: '<div class="map__hint">Кудринская площадь, 1с1<div/>',
    balloonContent: 'Самые полезные батончики тут'
  },
  {
    latitude: 55.76171756261773,
    longitude: 37.62473673710627,
    hintContent: '<div class="map__hint">улица Кузнецкий Мост, 22<div/>',
    balloonContent: 'Самые полезные батончики тут'
  },
  {
    latitude: 55.75058524334155,
    longitude: 37.60834307560727,
    hintContent: '<div class="map__hint">улица Воздвиженка, 3/5с7<div/>',
    balloonContent: 'Самые полезные батончики тут'
  },
  {
    latitude: 55.74809213458788,
    longitude: 37.5850829590301,
    hintContent: '<div class="map__hint">улица Арбат, 46с8<div/>',
    balloonContent: 'Самые полезные батончики тут'
  }
];

function init() {
  var map = new ymaps.Map("map", {
    center: [55.7482, 37.6106],
    zoom: 14,
    controls: ['zoomControl'],
    behaviors: ['drag']
  });

  placemarks.forEach(function (obj) {
    var placemark = new ymaps.Placemark([obj.latitude, obj.longitude], {
      hintContent: obj.hintContent,
      balloonContent: obj.balloonContent
    },
      {
        iconLayout: 'default#image',
        iconImageHref: './images/sec9/marker.svg',
        iconImageSize: [46, 57],
        // iconImageOffset: [-23, -57]
      });

    map.geoObjects.add(placemark);
  });

}