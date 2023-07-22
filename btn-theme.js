const btnDay = document.querySelector('.btn__theme-day'),
      btnNight = document.querySelector('.btn__theme-night'),
      btnChange = document.querySelector('.btn-theme--change'),
      logo = document.querySelector('.menu__logo img');
      
 
btnDay.addEventListener('click', () => {
  btnChange.style.transform = 'translateX(0)';
  document.documentElement.style.setProperty('--color-one', 'hsl(var(--color-tono), 0%, 100%)');
  document.documentElement.style.setProperty('--color-two', 'hsl(var(--color-tono), 100%, 0%)');
  logo.src = 'img/logo-black.svg';
  
});

btnNight.addEventListener('click', () => {
  btnChange.style.transform = 'translateX(100%)';
  document.documentElement.style.setProperty('--color-one', 'hsl(var(--color-tono), 100%, 0%)');
  document.documentElement.style.setProperty('--color-two', 'hsl(var(--color-tono), 0%, 100%)');
  logo.src = 'img/logo-white.svg';
  
});

