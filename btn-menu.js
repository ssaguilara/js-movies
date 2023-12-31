const btnMenu = document.querySelector('.btn-menu'),
      menuContainer = document.querySelector('.menu__container'),
      menuList = [...document.querySelectorAll('.menu__list li a')],
      btnMenuClose = document.querySelector('.btn-menu-close');

btnMenu.addEventListener('click', Menudropdown);

function Menudropdown() {
    menuContainer.classList.toggle('menu__container--dropdown');
}

btnMenuClose.addEventListener('click', closeMenu);

menuList.forEach(element => {element.addEventListener("click", closeMenu)});

window.addEventListener("resize", function () {
  if (window.innerWidth > 700)
  closeMenu(); 
});

function closeMenu() {
    menuContainer.classList.remove('menu__container--dropdown')
}