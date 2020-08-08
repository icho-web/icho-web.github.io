"use strict";

(function () {
  var DESKTOP = 1200;
  var TABLET = 768;
  var MOBILE = 320;
  var DESKTOP_SLIDER_COUNT = 4;
  var TABLET_SLIDER_COUNT = 2;
  var MOBILE_SLIDER_COUNT = 1;
  var buttonLeft = document.querySelector('.coaches__button--left');
  var buttonRight = document.querySelector('.coaches__button--right');
  var slides = document.querySelectorAll('.coaches__slider-item');
  var slideIndex;
  var slideLength;
  var summand;

  var mediaQueries = function mediaQueries(query) {
    return window.matchMedia("(min-width:" + query + "px)").matches;
  };

  var sliderPagination = function sliderPagination(cond, exp) {
    if (cond) {
      for (var i = slideIndex; i < slideLength; i++) {
        slides[i].classList.remove('coaches__slider-item--active');
        slides[i + exp].classList.add('coaches__slider-item--active');
      }

      slideLength = slideLength + exp;
      slideIndex = slideIndex + exp;
    }
  };

  var updatedSummand;

  var summandUpdate = function summandUpdate() {
    if (mediaQueries(DESKTOP)) {
      updatedSummand = DESKTOP_SLIDER_COUNT;
    } else if (mediaQueries(TABLET)) {
      updatedSummand = TABLET_SLIDER_COUNT;
    } else if (mediaQueries(MOBILE)) {
      updatedSummand = MOBILE_SLIDER_COUNT;
    }

    return updatedSummand;
  };

  var slideCount = function slideCount() {
    if (mediaQueries(DESKTOP)) {
      summand = DESKTOP_SLIDER_COUNT;
      slideLength = DESKTOP_SLIDER_COUNT;
    } else if (mediaQueries(TABLET)) {
      summand = TABLET_SLIDER_COUNT;
      slideLength = TABLET_SLIDER_COUNT;
    } else if (mediaQueries(MOBILE)) {
      summand = MOBILE_SLIDER_COUNT;
      slideLength = MOBILE_SLIDER_COUNT;
    }

    slideIndex = 0;

    for (var l = 0; l < slides.length; l++) {
      slides[l].classList.remove('coaches__slider-item--active');
    }

    for (var j = 0; j < slideLength; j++) {
      slides[j].classList.add('coaches__slider-item--active');
    }

    buttonLeft.disabled = true;
    buttonRight.disabled = false;
    window.setCursor(buttonLeft);
    window.setCursor(buttonRight);
  };

  window.setCursor = function (button) {
    if (button.disabled === true) {
      button.style.cursor = 'not-allowed';
    } else {
      button.style.cursor = 'pointer';
    }
  };

  slideCount();
  window.addEventListener('resize', slideCount);
  buttonRight.addEventListener('click', function () {
    if (slides.length - slideLength >= summandUpdate()) {
      sliderPagination(slideLength < slides.length, +summand);
      buttonLeft.disabled = false;
      window.setCursor(buttonLeft);
    } else {
      summand = slides.length % summandUpdate();
      sliderPagination(slideLength < slides.length, +summand);
      buttonLeft.disabled = false;
      window.setCursor(buttonLeft);
    }

    if (slides.length === slideLength) {
      buttonRight.disabled = true;
      window.setCursor(buttonRight);
    }
  });
  buttonLeft.addEventListener('click', function () {
    if (summand < summandUpdate()) {
      sliderPagination(slideIndex > 0, -summand);
      summand = summandUpdate();
      buttonRight.disabled = false;
      window.setCursor(buttonRight);
    } else {
      sliderPagination(slideIndex > 0, -summand);
      buttonRight.disabled = false;
      window.setCursor(buttonRight);
    }

    if (slideIndex === 0) {
      buttonLeft.disabled = true;
      window.setCursor(buttonLeft);
    }
  });
})();

(function () {
  var buttonLeft = document.querySelector('.reviews__button--left');
  var buttonRight = document.querySelector('.reviews__button--right');
  var slides = document.querySelectorAll('.reviews__slide');
  var slideIndex;
  var slideLength;
  var summand = 1;

  var sliderPagination = function sliderPagination(cond, exp) {
    if (cond) {
      for (var i = slideIndex; i < slideLength; i++) {
        slides[i].classList.remove('reviews__slide--active');
        slides[i + exp].classList.add('reviews__slide--active');
      }

      slideLength = slideLength + exp;
      slideIndex = slideIndex + exp;
    }
  };

  var slideCount = function slideCount() {
    slideIndex = 0;
    slideLength = 1;

    for (var l = 0; l < slides.length; l++) {
      slides[l].classList.remove('reviews__slide--active');
    }

    for (var j = 0; j < slideLength; j++) {
      slides[j].classList.add('reviews__slide--active');
    }

    buttonRight.disabled = false;
    buttonLeft.disabled = true;
    window.setCursor(buttonLeft);
    window.setCursor(buttonRight);
  };

  slideCount();
  window.addEventListener('resize', slideCount);
  buttonRight.addEventListener('click', function (evt) {
    if (slides.length > slideLength) {
      sliderPagination(true, summand);
      buttonLeft.disabled = false;
      buttonLeft.style.cursor = 'pointer';
    }

    if (slides.length === slideLength) {
      buttonRight.disabled = true;
      buttonRight.style.cursor = 'not-allowed';
    }
  });
  buttonLeft.addEventListener('click', function () {
    if (slideIndex > 0) {
      sliderPagination(true, -summand);
      buttonRight.disabled = false;
      buttonRight.style.cursor = 'pointer';
    }

    if (slideIndex === 0) {
      buttonLeft.disabled = true;
      buttonLeft.style.cursor = 'not-allowed';
    }
  });
})();

var inputs = document.querySelectorAll('.season__button input');
var tabs = document.querySelectorAll('.season__tab');
inputs.forEach(function (element, i) {
  element.addEventListener('change', function () {
    tabs.forEach(function (element) {
      element.classList.remove('season__tab--open');
    });

    if (element.checked) {
      tabs[i].classList.add('season__tab--open');
    }
  });
});
var NUMBER_LENGTH = 11;
var REGEX_NAME = /^[A-ZА-Я][a-za-я]+\s([A-ZА-Я][a-za-я]+\s[A-ZА-Я][a-za-я]+|[A-ZА-Я][a-za-я]+)/;
var form = document.querySelector('.contacts__form');
var inputTel = document.getElementById('tel');
var inputName = document.getElementById('name');
var maskOptions = {
  mask: '0-000-000-00-00'
};
var mask = IMask(inputTel, maskOptions);
form.addEventListener('input', function (evt) {
  if (mask.unmaskedValue.length < NUMBER_LENGTH) {
    evt.preventDefault();
    inputTel.setCustomValidity('Номер должен содержать ' + NUMBER_LENGTH + ' цифр');
  } else {
    inputTel.setCustomValidity('');
  }

  if (REGEX_NAME.test(inputName.value)) {
    inputName.setCustomValidity('');
  } else {
    evt.preventDefault();
    inputName.setCustomValidity('Введите корректное имя');
  }
});