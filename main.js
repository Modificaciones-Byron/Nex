const redesSociales = document.querySelector('.redes-sociales');
const botones = document.querySelectorAll('.redes-sociales a');

redesSociales.addEventListener('mouseenter', () => {
  botones.forEach((boton, i) => {
    setTimeout(() => {
      boton.style.transform = 'translateY(-10px)';
    }, i * 100);
  });
});

redesSociales.addEventListener('mouseleave', () => {
  botones.forEach((boton, i) => {
    setTimeout(() => {
      boton.style.transform = 'translateY(0)';
    }, i * 100);
  });
});
