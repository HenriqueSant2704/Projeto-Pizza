//==============================================================================================================================

// Carrossel dos card mais pedidos

//==============================================================================================================================

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

//==============================================================================================================================

// Cards e controle de quantidade

//==============================================================================================================================

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
        card.classList.toggle("mostrando");

        if (!card.classList.contains("mostrando")) {
          qtd = 1;
          qtdSpan.textContent = qtd;
        }
      }
    }
  });

  btnAdd.addEventListener("click", (e) => {
    e.stopPropagation();
    card.classList.add("mostrando");
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
      card.classList.remove("mostrando");
      qtd = 1;
      qtdSpan.textContent = qtd;
    } else {
      qtdSpan.textContent = qtd;
    }
  });
});



//======================================================================================================================

// esconder os sabores

//======================================================================================================================

const caixaSabores = document.querySelector('.caixa-sabores');
const header = caixaSabores.querySelector('.select-header');

header.addEventListener('click', () => {
  caixaSabores.classList.toggle('active');
});


//======================================================================================================================

// selecionar com a div

//======================================================================================================================

document.querySelectorAll('.item-sabor').forEach(item => {
    
    const checkbox = item.querySelector('input[type="checkbox"]');
    if (!checkbox) return; 

    const caixaSabores = item.closest('.caixa-sabores');

    const statusSpan = caixaSabores.querySelector('.status-obrigatorio span');
 
    const statusDiv = caixaSabores.querySelector('.status-obrigatorio');
    

    item.addEventListener('click', (e) => {
        
        // Lógica para marcar/desmarcar
        if (e.target !== checkbox) {
            checkbox.checked = !checkbox.checked;
        }
        item.classList.toggle('selected', checkbox.checked);

//=================================================================================================================

// verifica se o checkbox esta selecionado ou nao, e muda o texto do status

//==================================================================================================================

    
    const allCheckboxes = caixaSabores.querySelectorAll('.item-sabor input[type="checkbox"]');

        
    const isAnyChecked = Array.from(allCheckboxes).some(cb => cb.checked);

       
    if (isAnyChecked) {
        statusSpan.textContent = 'Selecionado';
        statusDiv.classList.add('status-selecionado'); 
    } else {
        statusSpan.textContent = 'Obrigatório';
        statusDiv.classList.remove('status-selecionado'); 
    }
      
    });
});


//======================================================================================================================



//======================================================================================================================