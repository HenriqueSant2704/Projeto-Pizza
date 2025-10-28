// ==========================================
// Area Menu
//===========================================

// pesquisa (Input)

const menuLupa = document.querySelector('.iconis-menu button:first-child'); 
const inputMenu = document.querySelector('.input-menu');
const inputField = document.querySelector('.input-menu input');
const btnFechar = document.querySelector('.input-menu .X');


menuLupa.addEventListener('click', () => {
  menuLupa.style.opacity = '0';
  menuLupa.style.visibility = 'hidden';
  menuLupa.style.pointerEvents = 'none';

  inputMenu.classList.add('show');
  inputField.focus();
  
});


btnFechar.addEventListener('click', () => {
  inputMenu.classList.remove('show');
  inputField.blur();

  setTimeout(() => {
    menuLupa.style.opacity = '1';
    menuLupa.style.visibility = 'visible';
    menuLupa.style.pointerEvents = 'auto';
  }, 100);
});

//====================================================================

// Carrossel

//====================================================================
const slides = document.querySelectorAll('.carrosel .slide');
const prev = document.querySelector('.carrosel .prev');
const next = document.querySelector('.carrosel .next');
let current = 0;

function showSlide(index) {
  slides.forEach(slide => slide.classList.remove('active'));
  slides[index].classList.add('active');
}

function nextSlide() {
  current = (current + 1) % slides.length;
  showSlide(current);
}

function prevSlide() {
  current = (current - 1 + slides.length) % slides.length;
  showSlide(current);
}

next.addEventListener('click', nextSlide);
prev.addEventListener('click', prevSlide);

const carrosel = document.querySelector('.carrosel');
let autoSlideInterval = setInterval(nextSlide, 7000);

carrosel.addEventListener('mouseenter', () => {
  clearInterval(autoSlideInterval); 
});

carrosel.addEventListener('mouseleave', () => {
  autoSlideInterval = setInterval(nextSlide, 7000); 
});

//=======================================================================

// Seleção de Comidas

//========================================================================

document.querySelectorAll('.tipo-guia a').forEach(link => {
  const img = link.querySelector('img');
  const originalSrc = img.getAttribute('src');

 
  const hoverSources = {
    'comida.png': '../../assets/icons/comidas/comida-branca.png',
    'peixe-e-batata-frita.png': '../../assets/icons/comidas/-batata-frita-branco.png',
    'pizza.png': '../../assets/icons/comidas/Pizza-branco.png',
    'copo-de-refrigerante-com-canudo.png': '../../assets/icons/comidas/copobranco.png',
    'porção.png': '../../assets/icons/comidas/peixe-e-batata-frita-branco.png'
  };

  
  const nomeArquivo = originalSrc.split('/').pop();


  link.addEventListener('mouseenter', () => {
    if (hoverSources[nomeArquivo]) {
      img.setAttribute('src', hoverSources[nomeArquivo]);
    }
  });

  link.addEventListener('mouseleave', () => {
    img.setAttribute('src', originalSrc);
  });
});

//=========================================================================

// Carrossel das Pizzas

//=========================================================================

document.querySelectorAll('.carrossel-container').forEach(container => {
    const carrossel = container.querySelector('.carrossel-mais-pedidos');
    const btnEsquerda = container.querySelector('.btn-seta.esquerda');
    const btnDireita = container.querySelector('.btn-seta.direita');

    const scrollAmount = 300; 

    btnEsquerda.addEventListener('click', () => { 
        carrossel.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });

    btnDireita.addEventListener('click', () => {
        carrossel.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });
});
;

// ==========================================
// Area Menu User
//===========================================

const btnUser = document.querySelector('.btn-user');
const userMenu = document.querySelector('.user-menu');

btnUser.addEventListener('click', () => {
    userMenu.style.display = userMenu.style.display === 'flex' ? 'none' : 'flex';
});

document.addEventListener('click', (e) => {
    if (!btnUser.contains(e.target) && !userMenu.contains(e.target)) {
        userMenu.style.display = 'none';
    }
});

  
// ==========================================

// Menu do Lateral

//===========================================

document.addEventListener('DOMContentLoaded', () => {
    const btnAbrir = document.querySelector('.mais-menu'); 
    const btnFechar = document.getElementById('btn-fechar-menu');
    const menuLateral = document.getElementById('menu-lateral');
    const overlay = document.getElementById('menu-overlay');

    function abrirMenu() {
        if (menuLateral && overlay) { 
            menuLateral.classList.add('visivel');
            overlay.classList.add('visivel');
            document.body.classList.add('menu-aberto');
        }
    }

    function fecharMenu() {
        if (menuLateral && overlay) { 
            menuLateral.classList.remove('visivel');
            overlay.classList.remove('visivel');
            document.body.classList.remove('menu-aberto'); 
        }
    }
    
    if (btnAbrir) {
        btnAbrir.addEventListener('click', abrirMenu);
    }

    if (btnFechar) {
        btnFechar.addEventListener('click', fecharMenu);
    }

    if (overlay) {
        overlay.addEventListener('click', fecharMenu);
    }
});

// ==========================================
// hover Cards
//===========================================

document.querySelectorAll('.card-mais-pedidos').forEach(card => {
    const menos = card.querySelector('.menos');
    const mais = card.querySelector('.mais');
    const valor = card.querySelector('.valor');
    const total = card.querySelector('.total strong');
    
    if (!menos || !mais) return;

    let quantidade = 1;
    const precoUnitario = 75.00; // valor base da pizza

    mais.addEventListener('click', () => {
        quantidade++;
        valor.textContent = quantidade;
        total.textContent = `R$ ${(quantidade * precoUnitario).toFixed(2).replace('.', ',')}`;
    });

    menos.addEventListener('click', () => {
        if (quantidade > 1) {
            quantidade--;
            valor.textContent = quantidade;
            total.textContent = `R$ ${(quantidade * precoUnitario).toFixed(2).replace('.', ',')}`;
        }
    });
});

// ==========================================

// Casriinho de compras

//===========================================

const btnCarrinho = document.querySelector('.iconis-menu button:last-child'); 
const carrinho = document.getElementById('carrinhoLateral');
const fecharCarrinho = document.getElementById('fecharCarrinho');
const overlayCarrinho = document.getElementById('overlayCarrinho');

btnCarrinho.addEventListener('click', () => {
    carrinho.classList.add('ativo');
    overlayCarrinho.classList.add('ativo');
});

fecharCarrinho.addEventListener('click', () => {
    carrinho.classList.remove('ativo');
    overlayCarrinho.classList.remove('ativo');
});

overlayCarrinho.addEventListener('click', () => {
    carrinho.classList.remove('ativo');
    overlayCarrinho.classList.remove('ativo');
});
