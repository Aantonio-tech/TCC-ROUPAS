
const CHAVE_CARRINHO = "soulStreetCarrinho";
const CHAVE_CHECKOUT = "soulStreetCheckout";

let carrinho = [];
let dadosCheckout = null;

function dinheiro(valor) {
    return Number(valor || 0).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function carregarDados() {
    try {
        carrinho = JSON.parse(
            localStorage.getItem(CHAVE_CARRINHO) || "[]"
        );

        dadosCheckout = JSON.parse(
            localStorage.getItem(CHAVE_CHECKOUT) || "null"
        );

        if (!Array.isArray(carrinho)) {
            carrinho = [];
        }

        if (!dadosCheckout) {
            dadosCheckout = {};
        }

    } catch (erro) {
        carrinho = [];
        dadosCheckout = {};
    }
}

function mostrarResumo() {
    const area = document.getElementById("itens");
    const totalElemento = document.getElementById("total");

    area.innerHTML = "";

    let subtotal = 0;

    if (carrinho.length === 0) {
        area.innerHTML =
            '<p class="aviso">Carrinho vazio. Volte aos produtos e adicione itens.</p>';

        totalElemento.textContent = dinheiro(0);
        return;
    }

    carrinho.forEach(produto => {
        const preco = Number(produto.preco) || 0;
        const quantidade = Number(produto.quantidade) || 1;

        subtotal += preco * quantidade;

        const linha = document.createElement("div");
        linha.className = "item";

        const nome = document.createElement("span");
        nome.textContent = produto.nome + " × " + quantidade;

        const valor = document.createElement("span");
        valor.textContent = dinheiro(preco * quantidade);

        linha.append(nome, valor);
        area.appendChild(linha);
    });

    const total = Number.isFinite(Number(dadosCheckout.total))
        ? Number(dadosCheckout.total)
        : subtotal;

    totalElemento.textContent = dinheiro(total);
}

document.getElementById("formulario").addEventListener("submit", function(evento) {
    evento.preventDefault();

    const mensagem = document.getElementById("mensagem");

    if (carrinho.length === 0) {
        mensagem.textContent =
            "Seu carrinho está vazio. Volte aos produtos e adicione itens.";
        return;
    }

    if (!this.reportValidity()) return;

    const pagamento = document.querySelector(
        'input[name="pagamento"]:checked'
    );

    if (!pagamento) {
        mensagem.textContent = "Escolha uma forma de pagamento.";
        return;
    }

    const nome = document.getElementById("nome").value.trim();
    const sobrenome = document.getElementById("sobrenome").value.trim();

    mensagem.textContent =
        "Pedido demonstrativo confirmado para " +
        nome + " " + sobrenome +
        ". Pagamento escolhido: " + pagamento.value +
        ". Nenhum pagamento real foi realizado.";

    localStorage.removeItem(CHAVE_CARRINHO);
    localStorage.removeItem(CHAVE_CHECKOUT);
    localStorage.removeItem("soulStreetCupom");

    carrinho = [];
    mostrarResumo();
});

carregarDados();
mostrarResumo();
