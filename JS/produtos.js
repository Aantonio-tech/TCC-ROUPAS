
/* SOUL STREET - CARRINHO COMPLETO */
(() => {
    "use strict";

    const CHAVE = "soulStreetCarrinho";
    const CHAVE_CUPOM = "soulStreetCupom";

    let carrinho = [];
    let cupomAtivo = localStorage.getItem(CHAVE_CUPOM) === "true";

    try {
        carrinho = JSON.parse(localStorage.getItem(CHAVE)) || [];
        if (!Array.isArray(carrinho)) carrinho = [];
    } catch {
        carrinho = [];
    }

    const $ = id => document.getElementById(id);

    const dinheiro = valor => Number(valor).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

    function salvar() {
        localStorage.setItem(CHAVE, JSON.stringify(carrinho));
        localStorage.setItem(CHAVE_CUPOM, String(cupomAtivo));
    }

    function adicionarProduto(nome, preco) {
        nome = String(nome || "").trim();
        preco = Number(preco);

        if (!nome || !Number.isFinite(preco) || preco <= 0) {
            alert("Não foi possível identificar o produto e o preço.");
            return;
        }

        const id = nome.toLowerCase();
        const existente = carrinho.find(item => item.id === id);

        if (existente) {
            existente.quantidade++;
        } else {
            carrinho.push({
                id,
                nome,
                preco,
                quantidade: 1
            });
        }

        salvar();
        renderizar();
        abrirCarrinho();
    }

    // Compatibilidade com os botões existentes:
    // onclick="abrirCompra('Camiseta Oversized', 119.90)"
    window.abrirCompra = function(nome, preco) {
        adicionarProduto(nome, preco);
    };

    window.adicionarAoCarrinhoSoulStreet = function(produto) {
        adicionarProduto(produto.nome, produto.preco);
    };

    function abrirCarrinho() {
        const painel = $("carrinho-container");

        if (painel) {
            painel.style.display = "flex";
            document.body.style.overflow = "hidden";
        } else {
            alert("Produto adicionado ao carrinho!");
        }
    }

    function fecharCarrinho() {
        const painel = $("carrinho-container");
        if (painel) painel.style.display = "none";
        document.body.style.overflow = "";
    }

    function atualizarContador() {
        const quantidade = carrinho.reduce(
            (total, item) => total + item.quantidade, 0
        );

        document.querySelectorAll(
            "#contador-carrinho, [data-contador-carrinho]"
        ).forEach(elemento => {
            elemento.textContent = quantidade;
        });
    }

    function renderizar() {
        const lista = $("lista-carrinho");
        const freteSelect = $("frete");

        if (!lista) {
            atualizarContador();
            salvar();
            return;
        }

        lista.replaceChildren();

        if (carrinho.length === 0) {
            const vazio = document.createElement("p");
            vazio.className = "carrinho-vazio";
            vazio.textContent = "Seu carrinho está vazio.";
            lista.appendChild(vazio);
        }

        carrinho.forEach(item => {
            const linha = document.createElement("div");
            linha.className = "item-carrinho";

            const detalhes = document.createElement("div");
            const nome = document.createElement("h4");
            nome.textContent = item.nome;

            const preco = document.createElement("p");
            preco.textContent = dinheiro(item.preco) + " cada";

            const totalItem = document.createElement("p");
            totalItem.textContent = "Total: " +
                dinheiro(item.preco * item.quantidade);

            detalhes.append(nome, preco, totalItem);

            const controles = document.createElement("div");
            controles.className = "controles-carrinho";

            const menos = document.createElement("button");
            menos.type = "button";
            menos.textContent = "−";
            menos.setAttribute("aria-label", "Diminuir quantidade");
            menos.onclick = () => alterarQuantidade(item.id, -1);

            const numero = document.createElement("span");
            numero.textContent = item.quantidade;

            const mais = document.createElement("button");
            mais.type = "button";
            mais.textContent = "+";
            mais.setAttribute("aria-label", "Aumentar quantidade");
            mais.onclick = () => alterarQuantidade(item.id, 1);

            const remover = document.createElement("button");
            remover.type = "button";
            remover.textContent = "Remover";
            remover.onclick = () => {
                carrinho = carrinho.filter(produto => produto.id !== item.id);
                renderizar();
            };

            controles.append(menos, numero, mais, remover);
            linha.append(detalhes, controles);
            lista.appendChild(linha);
        });

        const subtotal = carrinho.reduce(
            (total, item) => total + item.preco * item.quantidade, 0
        );

        const desconto = cupomAtivo ? subtotal * 0.10 : 0;
        const frete = carrinho.length && freteSelect
            ? Number(freteSelect.value) || 0
            : 0;

        const total = subtotal - desconto + frete;

        if ($("subtotal-carrinho"))
            $("subtotal-carrinho").textContent = dinheiro(subtotal);

        if ($("desconto-carrinho"))
            $("desconto-carrinho").textContent = dinheiro(desconto);

        if ($("frete-carrinho"))
            $("frete-carrinho").textContent = dinheiro(frete);

        if ($("total-carrinho"))
            $("total-carrinho").textContent = dinheiro(total);

        atualizarContador();
        salvar();
    }

    function alterarQuantidade(id, mudanca) {
        const item = carrinho.find(produto => produto.id === id);
        if (!item) return;

        item.quantidade += mudanca;

        if (item.quantidade <= 0) {
            carrinho = carrinho.filter(produto => produto.id !== id);
        }

        renderizar();
    }

    function configurarEventos() {
        $("btn-carrinho")?.addEventListener("click", abrirCarrinho);
        $("fechar-carrinho")?.addEventListener("click", fecharCarrinho);
        $("continuar-comprando")?.addEventListener("click", fecharCarrinho);

        $("carrinho-container")?.addEventListener("click", evento => {
            if (evento.target === $("carrinho-container")) {
                fecharCarrinho();
            }
        });

        $("frete")?.addEventListener("change", renderizar);

        $("aplicar-cupom")?.addEventListener("click", () => {
            const codigo = $("cupom")?.value.trim().toUpperCase();
            const mensagem = $("mensagem-cupom");

            cupomAtivo = codigo === "BEMVINDO10";

            if (mensagem) {
                mensagem.textContent = cupomAtivo
                    ? "Cupom aplicado: 10% de desconto!"
                    : "Cupom inválido.";
            }

            renderizar();
        });

        $("limpar-carrinho")?.addEventListener("click", () => {
            if (!carrinho.length) return;

            if (confirm("Deseja esvaziar o carrinho?")) {
                carrinho = [];
                cupomAtivo = false;

                if ($("cupom")) $("cupom").value = "";
                if ($("mensagem-cupom")) $("mensagem-cupom").textContent = "";

                renderizar();
            }
        });

        $("finalizar-compra")?.addEventListener("click", () => {
            if (!carrinho.length) {
                alert("Adicione produtos ao carrinho antes de continuar.");
                return;
            }

            const subtotal = carrinho.reduce(
                (total, item) => total + item.preco * item.quantidade, 0
            );
            const desconto = cupomAtivo ? subtotal * 0.10 : 0;
            const frete = Number($("frete")?.value || 0);
            const total = subtotal - desconto + frete;

            const pedido = {
                produtos: carrinho,
                subtotal,
                desconto,
                frete,
                total,
                data: new Date().toISOString()
            };

            localStorage.setItem(
                "soulStreetUltimoPedido",
                JSON.stringify(pedido)
            );

            alert(
                "Pedido registrado neste navegador!\n\n" +
                "Total: " + dinheiro(total) +
                "\n\nNenhum pagamento foi realizado."
            );
        });
    }

    function iniciar() {
        configurarEventos();
        renderizar();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", iniciar);
    } else {
        iniciar();
    }
})();
