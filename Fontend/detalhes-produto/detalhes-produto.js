//=====================================================================

// Carrossel dos card mais pedidos

//=====================================================================

const lista = document.querySelector('.lista-mais-pedidos');

const btnLeft = document.querySelector('.btn-carrossel.left');
const btnRight = document.querySelector('.btn-carrossel.right');

if (btnLeft && btnRight) {
  btnLeft.addEventListener('click', () => lista.scrollBy({ left: -220, behavior: 'smooth' }));
  btnRight.addEventListener('click', () => lista.scrollBy({ left: 220, behavior: 'smooth' }));
}

let isDown = false;
let startX;
let scrollLeft;

lista.addEventListener('mousedown', (e) => {
  isDown = true;
  startX = e.pageX - lista.offsetLeft;
  scrollLeft = lista.scrollLeft;
});

lista.addEventListener('mouseleave', () => isDown = false);
lista.addEventListener('mouseup', () => isDown = false);

lista.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - lista.offsetLeft;
  const walk = (x - startX) * 1.5;
  lista.scrollLeft = scrollLeft - walk;
});

//=====================================================================

// Cards e controle de quantidade

//=====================================================================

const cards = document.querySelectorAll(".card-pedidos");

cards.forEach((card) => {
  const btnAdd = card.querySelector(".btn-add");
  const controle = card.querySelector(".controle-qtd");
  const qtdSpan = card.querySelector(".qtd");
  const btnMais = card.querySelector(".mais");
  const btnMenos = card.querySelector(".menos");
  let qtd = 1;

  let mouseDownX = 0;
  let mouseUpX = 0;


  card.addEventListener("mousedown", (e) => {
    mouseDownX = e.clientX;
  });

  card.addEventListener("mouseup", (e) => {
    mouseUpX = e.clientX;
    const diff = Math.abs(mouseDownX - mouseUpX);
    if (diff < 5) {

      if (!e.target.closest(".btn-add, .mais, .menos")) {
        if (controle.style.display === "flex") {
          controle.style.display = "none";
          btnAdd.style.display = "block";
          qtd = 1;
          qtdSpan.textContent = qtd;
        } else {
          btnAdd.style.display = "none";
          controle.style.display = "flex";
        }
      }
    }
  });

  btnAdd.addEventListener("click", (e) => {
    e.stopPropagation();
    btnAdd.style.display = "none";
    controle.style.display = "flex";
  });

  btnMais.addEventListener("click", (e) => {
    e.stopPropagation();
    qtd++;
    qtdSpan.textContent = qtd;
  });

  btnMenos.addEventListener("click", (e) => {
    e.stopPropagation();
    qtd--;
    if (qtd <= 0) {
      controle.style.display = "none";
      btnAdd.style.display = "block";
      qtd = 1;
      qtdSpan.textContent = qtd;
    } else {
      qtdSpan.textContent = qtd;
    }
  });
});


//=============================================================

//

//=============================================================