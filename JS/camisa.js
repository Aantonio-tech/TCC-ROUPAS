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
    // se já tiver um pop-up aberto, não cria outro
    if (document.getElementById("popup-compra")) return;

    const fundo = document.createElement("div");
    fundo.id = "popup-compra";
    fundo.style.position = "fixed";
    fundo.style.top = "0";
    fundo.style.left = "0";
    fundo.style.width = "100%";
    fundo.style.height = "100%";
    fundo.style.background = "rgba(0,0,0,0.7)";
    fundo.style.display = "flex";
    fundo.style.alignItems = "center";
    fundo.style.justifyContent = "center";
    fundo.style.zIndex = "9999";

    fundo.innerHTML = `
        <div style="background:#111; color:#fff; padding:30px; border-radius:12px; text-align:center; max-width:300px; font-family:Inter, sans-serif;">
            <p style="font-size:18px; margin-bottom:20px;">Compra finalizada com sucesso!!</p>
            <button id="btn-fechar-popup" style="background:#ff5a00; color:#fff; border:none; padding:10px 25px; border-radius:8px; cursor:pointer; font-weight:bold;">OK</button>
        </div>
    `;

    document.body.appendChild(fundo);

    document.getElementById("btn-fechar-popup").addEventListener("click", () => {
        fundo.remove();
    });
}
