// Табы
let inputs = document.querySelectorAll('.tours__input')
let tabs = document.querySelectorAll('.tours__item')

for (let i = 0; i < inputs.length; i++) {
  if (inputs[i].checked) {
    tabs[i].classList.add('tours__item--active')
  }
}

for (let i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener('change', () => {
    for (let i = 0; i < tabs.length; i++) {
      tabs[i].classList.remove('tours__item--active')
    }
    if (inputs[i].checked) {
      tabs[i].classList.add('tours__item--active')
    }
  })
}