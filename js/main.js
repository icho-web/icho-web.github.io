"use strict";

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