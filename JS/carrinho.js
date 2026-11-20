
document.addEventListener("DOMContentLoaded", () => {

    // MESMA CHAVE UTILIZADA NO produtos.js
    let carrinho = [];

    try {
        carrinho = JSON.parse(
            localStorage.getItem("soulStreetCarrinho") || "[]"
        );

        if (!Array.isArray(carrinho)) {
            carrinho = [];
        }
    } catch (erro) {
        carrinho = [];
    }

    const itens = document.getElementById("itens");
    const totalElemento = document.getElementById("total");
    const quantidadeElemento = document.getElementById("quantidade");

    function dinheiro(valor) {
        return Number(valor).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
    }

    function salvar() {
        localStorage.setItem(
            "soulStreetCarrinho",
            JSON.stringify(carrinho)
        );

        mostrarCarrinho();
    }

    function mostrarCarrinho() {

        if (!itens || !totalElemento || !quantidadeElemento) {
            console.error("Elementos do carrinho não encontrados.");
            return;
        }

        const quantidadeTotal = carrinho.reduce(
            (soma, produto) => soma + (Number(produto.quantidade) || 1),
            0
        );

        quantidadeElemento.textContent = quantidadeTotal;

        if (carrinho.length === 0) {
            itens.innerHTML = "Seu carrinho está vazio.";
            totalElemento.textContent = "Total: R$ 0,00";
            return;
        }

        itens.innerHTML = "";

        let total = 0;

        carrinho.forEach((produto, indice) => {

            const quantidade = Number(produto.quantidade) || 1;
            const preco = Number(produto.preco) || 0;

            total += preco * quantidade;

            const linha = document.createElement("div");
            linha.className = "produto";

            const info = document.createElement("div");
            info.className = "produto-info";

            const nome = document.createElement("div");
            nome.className = "produto-nome";
            nome.textContent = produto.nome || "Produto";

            const valor = document.createElement("div");
            valor.className = "produto-preco";
            valor.textContent = dinheiro(preco) + " × " + quantidade;

            info.append(nome, valor);

            const subtotal = document.createElement("strong");
            subtotal.textContent = dinheiro(preco * quantidade);

            const remover = document.createElement("button");
            remover.textContent = "Remover";

            remover.addEventListener("click", () => {
                carrinho.splice(indice, 1);
                salvar();
            });

            linha.append(info, subtotal, remover);
            itens.appendChild(linha);
        });

        totalElemento.textContent = "Total: " + dinheiro(total);
    }

    // LIMPAR CARRINHO
    window.limparCarrinho = function () {

        if (carrinho.length === 0) {
            alert("O carrinho já está vazio.");
            return;
        }

        if (confirm("Deseja remover todos os produtos?")) {
            carrinho = [];
            salvar();
        }
    };

    // FINALIZAR COMPRA
    window.finalizarCompra = function () {

        if (carrinho.length === 0) {
            alert("Adicione produtos ao carrinho antes de finalizar!");
            return;
        }

        window.location.href = "checkout.html";
    };

    mostrarCarrinho();

});
