// Табы
let inputs = document.querySelectorAll('.tours__input')
let tabs = document.querySelectorAll('.tours__item')
let links = document.querySelectorAll('.places__item-link')
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
let wrappers = document.querySelectorAll('.places__item-wrapper')

links.forEach((element, i) => {
  element.addEventListener('focus', () => {
    console.log(wrappers[i])
    wrappers[i].style.opacity = 1;
  })

  element.addEventListener('blur', () => {
    console.log(wrappers[i])
    wrappers[i].style = ''
  })
});

// Маска формы
var input = document.getElementById('tel')
var phoneMask = IMask(
  input, {
    mask: '+{7} (000) -000 -00 -00'
  });

//Валидация
let star = document.getElementById('star')
const inputValueLength = 21

console.log(input.value.length === 0)
input.addEventListener('input', () => {
  if (input.value.length = 0) {
    input.setCustomValidity('Вы пропустили это поле')
  } else if (inputValueLength > input.value.length) {
    star.style.display = ''
    input.setCustomValidity('Введите 10 цифр номера')
  } else {
    star.style.display = 'none'
    input.setCustomValidity('')
  }
})