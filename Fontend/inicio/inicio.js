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
    document.body.classList.add('carrinho-aberto');
});

fecharCarrinho.addEventListener('click', () => {
    carrinho.classList.remove('ativo');
    overlayCarrinho.classList.remove('ativo');
});

overlayCarrinho.addEventListener('click', () => {
    carrinho.classList.remove('ativo');
    overlayCarrinho.classList.remove('ativo');
});


//================================================================

// Carregar as Pizzas (Salgadas e Doces)

//=================================================================



async function carregarCategorias() {
  try {
    const resposta = await fetch("http://localhost:3000/pizzas");
    const dados = await resposta.json();

    const containerPrincipal = document.querySelector(".container-produtos");
    containerPrincipal.innerHTML = ""; 

    // Cria carrossel das pizzas salgadas
    if (dados.salgadas && dados.salgadas.length > 0) {
      criarCarrosselCategoria("Pizzas Salgadas", dados.salgadas, true, containerPrincipal);
    }

    // Cria carrossel das pizzas doces
    if (dados.doces && dados.doces.length > 0) {
      criarCarrosselCategoria("Pizzas Doces", dados.doces, true, containerPrincipal);
    }

  } catch (erro) {
    console.error("Erro ao carregar categorias:", erro);
  }
}

//================================================================]

// Função que cria o carrossel]

//================================================================

function criarCarrosselCategoria(titulo, listaProdutos, temMontarPizza, containerPrincipal) {
  const caixa = document.createElement("div");
  caixa.classList.add("caixa-mais-pedidos"); 

  // Título da seção
  const tituloDiv = document.createElement("div");
  tituloDiv.classList.add("titulo");
  tituloDiv.innerHTML = `<h3>${titulo}</h3>`;
  caixa.appendChild(tituloDiv);

  // Container do carrossel
  const carrosselContainer = document.createElement("div");
  carrosselContainer.classList.add("carrossel-container");

  const btnEsquerda = document.createElement("button");
  btnEsquerda.classList.add("btn-seta", "esquerda");
  btnEsquerda.innerHTML = "&#10094;";

  const btnDireita = document.createElement("button");
  btnDireita.classList.add("btn-seta", "direita");
  btnDireita.innerHTML = "&#10095;";

  const carrossel = document.createElement("div");
  carrossel.classList.add("carrossel-mais-pedidos");

  // Card "Monte sua Pizza" (apenas nas salgadas)
  if (temMontarPizza) {
    const cardMontar = document.createElement("div");
    cardMontar.classList.add("card-add-pedidos");
    cardMontar.innerHTML = `
      <div class="card-add-icon">+</div>
      <div class="descricao-mais-pedidos">
        <h3>Monte sua Pizza</h3>
        <p><span>Do jeito que você quiser</span></p>
      </div>
    `;
    carrossel.appendChild(cardMontar);
  }

  // Cards das pizzas vindas do banco
  listaProdutos.forEach(produto => {
    const card = document.createElement("div");
    card.classList.add("card-mais-pedidos");

    card.innerHTML = `
      <img src="${produto.imagem_url}" alt="${produto.descricao}">
      <div class="descricao-mais-pedidos">
          <h3>${produto.descricao}</h3>
          <p><span>${produto.tamanho || "Médio"}</span></p>
          <p><span>A partir de</span> <strong>R$ ${produto.valor_total.toFixed(2)}</strong></p>
          <button class="btn-pedir">Pedir Agora</button>
      </div>

      <div class="overlay-card">
          <h3>${produto.descricao}</h3>
          <a href="./Frontend/detalhes-produto/detalhes-produto.html?id=${produto.id}" class="detalhes">+ Detalhes</a>
          <div class="quantidade">
              <button class="menos">-</button>
              <span class="valor">1</span>
              <button class="mais">+</button>
          </div>
          <button class="adicionar">Adicionar</button>
          <p class="total">Total: <strong>R$ ${produto.valor_total.toFixed(2)}</strong></p>
      </div>
    `;
    carrossel.appendChild(card);
  });

  // Card "Ver Mais"
  const cardVerMais = document.createElement("div");
  cardVerMais.classList.add("card-add-pedidos");
  cardVerMais.innerHTML = `
    <div class="card-add-icon">
      <img src="./assets/icons/pizza/abaixo.png" alt="Ver mais">
    </div>
    <div class="descricao-mais-pedidos">
      <h3>Ver mais opções</h3>
    </div>
  `;
  carrossel.appendChild(cardVerMais);

  // Montagem final
  carrosselContainer.appendChild(btnEsquerda);
  carrosselContainer.appendChild(carrossel);
  carrosselContainer.appendChild(btnDireita);
  caixa.appendChild(carrosselContainer);
  containerPrincipal.appendChild(caixa);

  // Funcionalidade das setas
  btnEsquerda.addEventListener("click", () => {
    carrossel.scrollBy({ left: -220, behavior: "smooth" });
  });
  btnDireita.addEventListener("click", () => {
    carrossel.scrollBy({ left: 220, behavior: "smooth" });
  });
}

// Chama a função
carregarCategorias();
