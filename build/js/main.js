//меню-бургер

document.querySelector('.burger').onclick = function () {
  document.querySelector('.mobile-menu').classList.add('active');
}

document.querySelector('.mobile-menu__list').onclick = function () {
  document.querySelector('.mobile-menu').classList.remove('active');
}

document.querySelector('.close').onclick = function () {
  document.querySelector('.mobile-menu').classList.remove('active');
}

// team

// let acc = document.querySelector(".team__title");
// let i;

// for (i = 0; i < acc.length; i++) {
//   acc[i].addEventListener("click", function () {
//     this.classList.toggle("active");
//     let panel = this.nextElementSibling;
//     if (panel.style.maxHeight) {
//       panel.style.maxHeight = null;
//     } else {
//       panel.style.maxHeight = panel.scrollHeight + "px";
//     }
//   });
// }


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






//карта
ymaps.ready(init);

var placemarks =  [
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

  placemarks.forEach(function(obj) {
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
