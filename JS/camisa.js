document.addEventListener("DOMContentLoaded", () => {

    // SEU CÓDIGO ANTIGO - mantido
    const botoes = document.querySelectorAll(".btn-camisa");

    botoes.forEach((botao) => {
        botao.addEventListener("click", (event) => {
            event.preventDefault();
            const pagina = botao.getAttribute("data-pagina");
            if (pagina) {
                window.location.href = pagina;
            }
        });
    });

    // Mostra o carrinho que já estava salvo
    atualizarCarrinho();
});

// CARRINHO
let carrinho = JSON.parse(localStorage.getItem("carrinhoSoulStreet")) || [];

function adicionarAoCarrinho(nome, preco) {
    carrinho.push({ nome, preco });
    localStorage.setItem("carrinhoSoulStreet", JSON.stringify(carrinho));
    atualizarCarrinho();
    alternarCarrinho(); // abre o carrinho na hora que clicar em COMPRAR
}

function atualizarCarrinho() {
    const quantidadeEl = document.getElementById("quantidade");
    const itensEl = document.getElementById("itens-carrinho");
    const totalEl = document.getElementById("total");

    if (quantidadeEl) {
        quantidadeEl.textContent = carrinho.length;
    }

    if (!itensEl) return;

    itensEl.innerHTML = "";

    let total = 0;

    carrinho.forEach((item) => {
        total += item.preco;
        const div = document.createElement("div");
        div.textContent = `${item.nome} - R$ ${item.preco.toFixed(2).replace(".", ",")}`;
        itensEl.appendChild(div);
    });

    if (totalEl) {
        totalEl.textContent = `R$ ${total.toFixed(2).replace(".", ",")}`;
    }
}

function alternarCarrinho() {
    const carrinhoSec = document.getElementById("carrinho");
    if (!carrinhoSec) return;
    if (carrinhoSec.style.display === "none" || carrinhoSec.style.display === "") {
        carrinhoSec.style.display = "block";
    } else {
        carrinhoSec.style.display = "none";
    }
}

function limparCarrinho() {
    carrinho = [];
    localStorage.removeItem("carrinhoSoulStreet");
    atualizarCarrinho();
}

function irParaCheckout() {
    // por enquanto só avisa, depois a gente liga no checkout
    alert("Indo para o checkout! Total de itens: " + carrinho.length);
}