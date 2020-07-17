const inputTelLength = 11;
const scrollbarLength = 16;
const desktopWidth = 1023
let headerContainer = document.querySelector('.header .container')
let headerNav = document.querySelector('.header__nav')
let burger = document.querySelector('.header__button')
let headerList = document.querySelector('.header__list')
let success = document.querySelector('.success')
let inputs = document.querySelectorAll('.tours__input')
let tabs = document.querySelectorAll('.tours__item')
let links = document.querySelectorAll('.places__item-link')
let wrappers = document.querySelectorAll('.places__item-wrapper')
var inputTel = document.getElementById('tel')
var inputTelPopup = document.getElementById('popup-tel')
let form = document.querySelector('.questions__form');
let popupForm = document.querySelector('.buy__form');
let errorTel = document.querySelector('.questions__error--tel');
let errorTelPopup = document.querySelector('.buy__error--tel')
let errorMail = document.querySelector('.questions__error--mail');
let errorMailPopup = document.querySelector('.buy__error--mail')
let inputMail = document.getElementById('mail');
let popupMail = document.getElementById('popup-mail');
let mailRegExp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/
let body = document.querySelector('.body')
let succesButton = document.querySelector('.success__button')
let closePopup = document.querySelector('.buy__close')
let popup = document.querySelector('.buy')
let descButtons = document.querySelectorAll('.tours__buy')
let pricesButtons = document.querySelectorAll('.prices__buy')

let removeActiveClass = () => {
  for (let i = 0; i < tabs.length; i++) {
    tabs[i].classList.remove('tours__item--active')
  }
}
let addActiveClass = (i) => {
  if (inputs[i].checked) {
    tabs[i].classList.add('tours__item--active')
  }
}
let onError = (error, input) => {
  error.style.display = 'block'
  input.style.border = '1px solid #FE7865'

  setTimeout(() => {
    input.style = '';
    error.style = '';
  }, 3000)
}
let onButtonClick = (arr) => {
  arr.forEach(element => {
    element.addEventListener('click', (evt) => {
      evt.preventDefault();
      popup.style.display = 'block'
      inputTelPopup.focus()
      body.style.overflow = 'hidden'
      body.style.height = '100vh'
    })
  });
}
let popupClose = (button, popup) => {
  button.addEventListener('click', () => {
    popup.style = '';
    body.style = ''
  })
  
  window.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      popup.style = '';
      body.style = ''
    }
  })
  
  popup.addEventListener('click', (evt) => {
    if (evt.target.tagName === 'SECTION') {
      popup.style = '';
      body.style = ''
    }
  })
}

// Меню
headerNav.classList.add('header__nav--js');
headerList.classList.add('header__list--js');
burger.classList.add('header__button--js');

burger.addEventListener('click', () => {
  headerNav.classList.toggle('header__nav--js');
  headerNav.classList.toggle('header__nav--open');
  headerList.classList.toggle('header__list--js');
  burger.classList.toggle('header__button--js');
  burger.classList.toggle('header__button--open');
})

window.addEventListener('resize', () => {
  let resize = document.querySelector('body').offsetWidth;

  if (resize > desktopWidth) {
    headerNav.classList.add('header__nav--js');
    headerList.classList.add('header__list--js');
    burger.classList.add('header__button--js');
    headerNav.classList.remove('header__nav--open');
  }
});

// Табы
for (let i = 0; i < inputs.length; i++) {
  addActiveClass(i);
}
for (let i = 0; i < inputs.length; i++) {
  links[i].addEventListener('click', () => {
    inputs[i].checked = true
    removeActiveClass();
    addActiveClass(i);
  })
  inputs[i].addEventListener('change', () => {
    removeActiveClass();
    addActiveClass(i);
  })
}

// Управление клавиатурой в карточках
links.forEach((element, i) => {
  element.addEventListener('focus', () => {
    wrappers[i].style.opacity = 1;
  })

  element.addEventListener('blur', () => {
    wrappers[i].style = ''
  })
});

// Маска формы
var phoneMask = IMask(
  inputTel, {
    mask: '+{7} (000) -000 -00 -00'
  });
var phonePopupMask = IMask(
  inputTelPopup, {
    mask: '+{7} (000) -000 -00 -00'
  });

// Валидация
form.addEventListener('submit', (evt) => {
  if (phoneMask.unmaskedValue.length < inputTelLength) {
    evt.preventDefault();
    onError(errorTel, inputTel);
  } else {
    evt.preventDefault();
    success.style.display = 'block'
    body.style.overflow = 'hidden'
    body.style.height = '100vh'

    localStorage.setItem('phone', phoneMask.unmaskedValue)
    localStorage.setItem('mail', inputMail.value)
  }

  if (inputMail.value === '') {
  } else if (!(mailRegExp.test(inputMail.value))) {
    evt.preventDefault();
    onError(errorMail, inputMail)
    success.style.display = ''
  }
});

popupForm.addEventListener('submit', (evt) => {
  if (phonePopupMask.unmaskedValue.length < inputTelLength) {
    evt.preventDefault();
    onError(errorTelPopup, inputTelPopup);
  } else {
    evt.preventDefault();
    success.style.display = 'block'
    popup.style.display = ''

    localStorage.setItem('phone', phonePopupMask.unmaskedValue)
    localStorage.setItem('mail', popupMail.value)
  }

  if (popupMail.value === '') {
  } else if (!(mailRegExp.test(popupMail.value))) {
    evt.preventDefault();
    onError(errorMailPopup, popupMail)
    success.style.display = ''
    popup.style.display = 'block'
  }
});

// Local storage
if (!(localStorage.getItem('mail') === null)) {
  popupMail.value = localStorage.getItem('mail')
  inputMail.value = localStorage.getItem('mail')
}
if (!(localStorage.getItem('phone') === null)) {
  phonePopupMask.value = localStorage.getItem('phone')
  phoneMask.value = localStorage.getItem('phone')
}

// Попапы
onButtonClick(descButtons);
onButtonClick(pricesButtons);
popupClose(closePopup, popup);
popupClose(succesButton, success);