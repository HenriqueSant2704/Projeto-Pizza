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

// ======================================================
// Abrir / Fechar Carrinho Lateral
// ======================================================


const btnCarrinho = document.querySelector('.iconis-menu button:last-child');
const carrinhoLateral = document.getElementById('carrinhoLateral');
const overlayCarrinho = document.getElementById('overlayCarrinho');
const fecharCarrinho = document.getElementById('fecharCarrinho');

function abrirCarrinho() {
  if (!carrinhoLateral || !overlayCarrinho) return;
  carrinhoLateral.classList.add("ativo");
  overlayCarrinho.classList.add("ativo");
  document.body.style.overflow = "hidden";
  carregarCarrinhoFrontEnd();
}

function fecharCarrinhoFunc() {
  if (!carrinhoLateral || !overlayCarrinho) return
  carrinhoLateral.classList.remove("ativo");
  overlayCarrinho.classList.remove("ativo");
  document.body.style.overflow = "";
}

document.addEventListener("DOMContentLoaded", () => {
  if (btnCarrinho) {
    btnCarrinho.addEventListener("click", abrirCarrinho);
  }

  if (fecharCarrinho) {
    fecharCarrinho.addEventListener("click", fecharCarrinhoFunc);
  }

  if (overlayCarrinho) {
    overlayCarrinho.addEventListener("click", fecharCarrinhoFunc);
  }
});



//==============================================================

// Carregar o Cardápio Novo (Categorias + Carrosséis Dinâmicos)

//==============================================================

async function carregarCardapio() {
  try {
    const resposta = await fetch("http://192.168.0.12:3000/api/cardapio");
    const categorias = await resposta.json();

    const containerPrincipal = document.querySelector(".container-produtos");
    containerPrincipal.innerHTML = "";

    categorias.forEach(categoria => {
      const nomeCategoria = categoria.nome_categoria || categoria.nome;


      const carrosseis = categoria.carrosseis;

      if (!carrosseis) return;


      for (const tipo in carrosseis) {
        const listaProdutos = carrosseis[tipo];

        // Criar carrossel
        criarCarrosselCategoria(
          `${nomeCategoria} – ${tipo}`,
          listaProdutos,
          categoria.nome_categoria === "Pizzas" && tipo === "Salgada",
          containerPrincipal
        );
      }
    });

  } catch (erro) {
    console.error("Erro ao carregar cardápio:", erro);
  }
}

//==============================================================

// Criar Carrossel

//==============================================================

function criarCarrosselCategoria(titulo, listaProdutos, temMontarPizza, containerPrincipal) {
  const caixa = document.createElement("div");
  caixa.classList.add("caixa-mais-pedidos");

  const tituloDiv = document.createElement("div");
  tituloDiv.classList.add("titulo");
  tituloDiv.innerHTML = `<h3>${titulo}</h3>`;
  caixa.appendChild(tituloDiv);

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

  // Card "Monte sua pizza"
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

  // Criar cada card de produto vindo do banco
  listaProdutos.forEach(produto => {
    const card = document.createElement("div");
    card.classList.add("card-mais-pedidos");

    card.innerHTML = `
      <img src="http://192.168.0.12:3000${produto.imagem}" alt="${produto.descricao}">
      <div class="descricao-mais-pedidos">
          <h3>${produto.descricao}</h3>
          <p><span>${produto.tamanho || ""}</span></p>
          <p><span>A partir de</span> 
             <strong>R$ ${Number(produto.valor).toFixed(2)}</strong></p>
          <button class="btn-pedir">Pedir Agora</button>
      </div>

      <div class="overlay-card" data-id="${produto.id_montarProduto}">
          <h3>${produto.descricao}</h3>
          <a href="./Frontend/detalhes-produto/detalhes-produto.html?id=${produto.id_montarProduto}" class="detalhes">+ Detalhes</a>
          <div class="quantidade">
              <button class="menos">-</button>
              <span class="valor">1</span>
              <button class="mais">+</button>
          </div>
          <button class="adicionar">Adicionar</button>
          <p class="total">
            Total: 
            <strong data-preco="${produto.valor}">
              R$ ${Number(produto.valor).toFixed(2)}
            </strong>
          </p>

      </div>
    `;

    carrossel.appendChild(card);
  });

  // Card "Ver mais"
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

  carrosselContainer.appendChild(btnEsquerda);
  carrosselContainer.appendChild(carrossel);
  carrosselContainer.appendChild(btnDireita);
  caixa.appendChild(carrosselContainer);
  containerPrincipal.appendChild(caixa);

  btnEsquerda.addEventListener("click", () => {
    carrossel.scrollBy({ left: -220, behavior: "smooth" });
  });
  btnDireita.addEventListener("click", () => {
    carrossel.scrollBy({ left: 220, behavior: "smooth" });
  });
}

carregarCardapio();
atualizarBadgeSemAbrir();


// ======================================================

// Controle de quantidade nos cards dinâmicos

// ======================================================

document.addEventListener("click", (e) => {

  // Botão +
  if (e.target.classList.contains("mais")) {
    const card = e.target.closest(".overlay-card");
    const valor = card.querySelector(".valor");
    const total = card.querySelector(".total strong");

    let quantidade = Number(valor.textContent);
    quantidade++;

    valor.textContent = quantidade;

    const precoUnitario = Number(total.dataset.preco);
    total.textContent = `R$ ${(precoUnitario * quantidade).toFixed(2).replace('.', ',')}`;
  }

  // Botão -
  if (e.target.classList.contains("menos")) {
    const card = e.target.closest(".overlay-card");
    const valor = card.querySelector(".valor");
    const total = card.querySelector(".total strong");

    let quantidade = Number(valor.textContent);

    if (quantidade > 1) {
      quantidade--;
      valor.textContent = quantidade;

      const precoUnitario = Number(total.dataset.preco);
      total.textContent = `R$ ${(precoUnitario * quantidade).toFixed(2).replace('.', ',')}`;
    }
  }
});


// =====================================================================================================================

// NOVAS FUNÇÕES DE ANIMAÇÃO DO CONTADOR DO CARRINHO

// =====================================================================================================================

/**

 * @param {Element} origem 
 * @param {Element} destino 
 */
function animarItemVoando(origem, destino) {
  if (!origem || !destino) return;

  const origemRect = origem.getBoundingClientRect();
  const destinoRect = destino.getBoundingClientRect();

  const itemVoador = document.createElement('div');
  itemVoador.classList.add('flying-item');
  document.body.appendChild(itemVoador);

  const startX = origemRect.left + (origemRect.width / 2);
  const startY = origemRect.top + (origemRect.height / 2);
  itemVoador.style.left = `${startX}px`;
  itemVoador.style.top = `${startY}px`;

  setTimeout(() => {
    const endX = destinoRect.left + (destinoRect.width / 2);
    const endY = destinoRect.top + (destinoRect.height / 2);

    itemVoador.style.left = `${endX}px`;
    itemVoador.style.top = `${endY}px`;
    itemVoador.style.transform = 'scale(0.3)';
    itemVoador.style.opacity = '1';
  }, 10);

  setTimeout(() => {
    itemVoador.remove();
  }, 700); 
}

const badgeGlobal = document.getElementById("badge-carrinho");
if (badgeGlobal) {
  badgeGlobal.addEventListener('animationend', () => {
    badgeGlobal.classList.remove('badge-pop-animation');
  });
}


// ======================================================

// ADICIONAR AO CARRINHO - Dinâmico

// ======================================================

document.addEventListener("click", async (e) => {
  const isAdicionar = e.target.classList.contains("adicionar");
  const isRemover = e.target.closest(".remover-iten");
  const isIncrementar = e.target.classList.contains("incrementar");
  const isDecrementar = e.target.classList.contains("decrementar");

  if (!isAdicionar && !isRemover && !isIncrementar && !isDecrementar) return;


  if (isAdicionar) {
    const btnAdicionar = e.target;
    const card = btnAdicionar.closest(".overlay-card");
    if (!card) return;


    const idProduto = card.dataset.id;
    const quantidade = Number(card.querySelector(".valor").textContent);
    const precoUnitario = Number(card.querySelector(".total strong").dataset.preco);
    const total = precoUnitario * quantidade;


    btnAdicionar.disabled = true;
    btnAdicionar.textContent = 'Adicionando...';


    const cardPrincipal = card.closest('.card-mais-pedidos');
    const imgProduto = cardPrincipal.querySelector('img');
    const iconeCarrinho = document.getElementById('cart-icon-target');

    const pAnimacao = new Promise((resolve) => {
      if (imgProduto && iconeCarrinho) {
        animarItemVoando(imgProduto, iconeCarrinho);
        setTimeout(resolve, 700);
      } else {
        console.warn("Elemento de origem ou destino não encontrado para animação.");
        resolve();
      }
    });


    const pFetch = fetch("http://192.168.0.12:3000/api/carrinho/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id_montarProduto: idProduto,
        quantidade,
        valor_total: total

      })
    }).then(res => {
      if (!res.ok) throw new Error('Falha ao adicionar');
      return res.json();
    });


    try {
      const [resultadoFetch, _] = await Promise.all([pFetch, pAnimacao]);

      console.log("Item adicionado ao carrinho:", resultadoFetch);


      atualizarBadgeSemAbrir();


      btnAdicionar.disabled = false;
      btnAdicionar.textContent = 'Adicionar';




    } catch (erro) {
      console.error("Erro ao adicionar ao carrinho:", erro);
      btnAdicionar.disabled = false;
      btnAdicionar.textContent = 'Adicionar';
    }
  }
});

// ========================================================================================================================

// FUNÇÃO DE LISTAR A QUANTIDADE DE ITEN DENTTRO DO CARRINHO

// ========================================================================================================================


function atualizarBadgeCarrinho(lista) {
  const badge = document.getElementById("badge-carrinho");
  if (!badge) return;

  const quantidadeTotal = lista.reduce((acc, item) => acc + Number(item.quantidade), 0);

  if (quantidadeTotal > 0) {
    badge.textContent = quantidadeTotal;
    badge.style.display = "flex";

    badge.classList.remove('badge-pop-animation');
    void badge.offsetWidth; 
    badge.classList.add('badge-pop-animation');
    

  } else {
    badge.textContent = 0; 
    badge.style.display = "flex"; 
  }
}

async function atualizarBadgeSemAbrir() {
  try {
    const resposta = await fetch("http://192.168.0.12:3000/api/carrinho/listar");
    const itens = await resposta.json();

    atualizarBadgeCarrinho(itens);

  } catch (erro) {
    console.error("Erro ao atualizar badge:", erro);
  }
}



// ========================================================================================================================

// FUNÇÃO DE BUSCAR E LISTAR OS ITENS DO CARRINHO

// ========================================================================================================================

async function carregarCarrinhoFrontEnd() {
  try {
    const resposta = await fetch("http://192.168.0.12:3000/api/carrinho/listar");
    const itens = await resposta.json();

    renderizarCarrinho(itens);
    atualizarBadgeCarrinho(itens);
    atualizarBadgeSemAbrir();

  } catch (erro) {
    console.error("Erro ao carregar carrinho:", erro);
  }
}

// ========================================================================================================================

// ESTRTURA DOS INTENS LISTADOS (CARRINHO)

// ========================================================================================================================

function renderizarCarrinho(lista) {
  const area = document.getElementById("itensCarrinho");

  if (!area) {
    console.warn("Container #itensCarrinho não encontrado.");
    return;
  }

  area.innerHTML = "";

  if (!lista || lista.length === 0) {
    area.innerHTML = `
        <div class="carrinho-vazio">
            
            <svg class="carrinho-vazio-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007Z" />
            </svg>

            <p class="carrinho-vazio-titulo">
                Seu carrinho está vazio
            </p>

            <p class="carrinho-vazio-subtitulo">
                Adicione seus produtos favoritos do cardápio para vê-los aqui.
            </p>

            <button class="carrinho-vazio-cta" onclick="fecharCarrinhoFunc()">
                Ver Cardápio
            </button>
            
        </div>
    `;
    atualizarTotalCarrinho([]);
    return;
  }


  lista.forEach(item => {
    const div = document.createElement("div");
    div.classList.add("card-iten");


    const imagem = "./assets/icons/categoria/comida.png";

    div.innerHTML = `
            <div class="card-iten-imagem">
                <img src="${imagem}">
            </div>

            <div class="iten-detalhe">
                <label>${item.descricao_item || "Produto"}</label>
                <span>R$ ${Number(item.valor_total).toFixed(2).replace('.', ',')}</span>

                <div class="iten-quantidade">
                    <button class="decrementar" data-id="${item.id_carrinho}">-</button>
                    <span class="quantidade-valor">${item.quantidade}</span>
                    <button class="incrementar" data-id="${item.id_carrinho}">+</button>
                </div>
            </div>

            <div class="iten-remover">
                <button class="remover-iten" data-id="${item.id_carrinho}">
                    <img src="./assets/icons/Carrinho/desperdicio.png" alt="">
                </button>
            </div>
        `;

    area.appendChild(div);
  });

  atualizarTotalCarrinho(lista);
}


// ========================================================================================================================

// DELETA O ITEM DO CARRINHO

// ========================================================================================================================

document.addEventListener("click", async (e) => {
  if (e.target.closest(".remover-iten")) {
    const btn = e.target.closest(".remover-iten");
    const idCarrinho = btn.dataset.id;

    try {
      const resposta = await fetch(`http://192.168.0.12:3000/api/carrinho/deletar/${idCarrinho}`, {
        method: "DELETE"
      });

      const resultado = await resposta.json();
      console.log("Item removido:", resultado);


      carregarCarrinhoFrontEnd();
      atualizarBadgeSemAbrir();

    } catch (erro) {
      console.error("Erro ao remover item:", erro);
    }
  }
});

// ========================================================================================================================

// ALTERAR QUANTIDADE (+ e -)

// ========================================================================================================================

document.addEventListener("click", async (e) => {


  if (e.target.classList.contains("incrementar")) {

    const id = e.target.dataset.id;

    const quantSpan = e.target.closest(".iten-quantidade").querySelector(".quantidade-valor");
    let quantidadeAtual = Number(quantSpan.textContent);
    const novaQuantidade = quantidadeAtual + 1;

    try {
      await fetch(`http://192.168.0.12:3000/api/carrinho/atualizar/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantidade: novaQuantidade })
      });

      carregarCarrinhoFrontEnd();
      atualizarBadgeSemAbrir();

    } catch (erro) {
      console.error("Erro ao aumentar quantidade:", erro);
    }
  }


  if (e.target.classList.contains("decrementar")) {

    const id = e.target.dataset.id;

    const quantSpan = e.target.closest(".iten-quantidade").querySelector(".quantidade-valor");
    let quantidadeAtual = Number(quantSpan.textContent);

    if (quantidadeAtual <= 1) return;

    const novaQuantidade = quantidadeAtual - 1;

    try {
      await fetch(`http://192.168.0.12:3000/api/carrinho/atualizar/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantidade: novaQuantidade })
      });

      carregarCarrinhoFrontEnd();
      atualizarBadgeSemAbrir();

    } catch (erro) {
      console.error("Erro ao diminuir quantidade:", erro);
    }
  }
});

// ========================================================================================================================

// ATUALIZA O VALOR TOTAL 

// ========================================================================================================================

function atualizarTotalCarrinho(lista) {
  const elementoTotal = document.querySelector(".total-valor");
  if (!elementoTotal) return;

  if (!lista || lista.length === 0) {
    elementoTotal.textContent = "R$ 0,00";
    return;
  }

  const total = lista.reduce((soma, item) => soma + Number(item.valor_total), 0);
  elementoTotal.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
}
