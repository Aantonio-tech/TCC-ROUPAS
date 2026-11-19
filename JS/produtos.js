
/* ==========================================
   SOUL STREET - CARRINHO E CHECKOUT
   Camisas, Calças e Tênis
========================================== */

(() => {
    "use strict";

    const CHAVE = "soulStreetCarrinho";
    const CHAVE_CUPOM = "soulStreetCupom";
    const CHAVE_CHECKOUT = "soulStreetCheckout";

    let carrinho = [];
    let cupomAtivo = localStorage.getItem(CHAVE_CUPOM) === "true";

    const $ = id => document.getElementById(id);

    // FORMATAÇÃO DE PREÇOS
    function dinheiro(valor) {
        return Number(valor || 0).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
    }

    // CARREGAR CARRINHO
    function carregarCarrinho() {
        try {
            carrinho = JSON.parse(localStorage.getItem(CHAVE)) || [];

            if (!Array.isArray(carrinho)) {
                carrinho = [];
            }

            carrinho = carrinho.filter(item =>
                item &&
                typeof item.nome === "string" &&
                Number.isFinite(Number(item.preco)) &&
                Number(item.preco) > 0 &&
                Number(item.quantidade) > 0
            );

        } catch {
            carrinho = [];
        }
    }

    // SALVAR CARRINHO
    function salvar() {
        localStorage.setItem(CHAVE, JSON.stringify(carrinho));
        localStorage.setItem(CHAVE_CUPOM, String(cupomAtivo));
    }

    // ADICIONAR PRODUTO
    function adicionarProduto(nome, preco) {
        nome = String(nome || "").trim();
        preco = Number(preco);

        if (!nome || !Number.isFinite(preco) || preco <= 0) {
            alert("Não foi possível identificar o produto.");
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
    }

    // COMPATIBILIDADE COM OS BOTÕES HTML
    window.adicionarAoCarrinho = function(nome, preco) {
        adicionarProduto(nome, preco);
        abrirCarrinho();
    };

    window.abrirCompra = function(nome, preco) {
        adicionarProduto(nome, preco);
        abrirCarrinho();
    };

    window.adicionarAoCarrinhoSoulStreet = function(produto) {
        adicionarProduto(produto.nome, produto.preco);
        abrirCarrinho();
    };

    // COMPRA DIRETA
    // Adiciona o produto sem apagar os anteriores e vai ao checkout.
    window.comprarAgora = function(nome, preco) {
        adicionarProduto(nome, preco);
        irParaCheckout();
    };

    // ABRIR E FECHAR CARRINHO
    function abrirCarrinho() {
        const painel = $("carrinho-container");
        const carrinhoAntigo = $("carrinho");

        if (painel) {
            painel.style.display = "flex";
            document.body.style.overflow = "hidden";
        } else if (carrinhoAntigo) {
            carrinhoAntigo.style.display = "block";
            carrinhoAntigo.scrollIntoView({
                behavior: "smooth"
            });
        }
    }

    function fecharCarrinho() {
        const painel = $("carrinho-container");
        const carrinhoAntigo = $("carrinho");

        if (painel) {
            painel.style.display = "none";
        }

        if (carrinhoAntigo) {
            carrinhoAntigo.style.display = "none";
        }

        document.body.style.overflow = "";
    }

    window.alternarCarrinho = function() {
        const painel = $("carrinho-container");

        if (painel && painel.style.display === "flex") {
            fecharCarrinho();
        } else {
            abrirCarrinho();
        }
    };

    // CONTADOR
    function atualizarContador() {
        const quantidade = carrinho.reduce(
            (total, item) => total + Number(item.quantidade),
            0
        );

        document.querySelectorAll(
            "#contador-carrinho, #quantidade, [data-contador-carrinho]"
        ).forEach(elemento => {
            elemento.textContent = quantidade;
        });
    }

    // CALCULAR VALORES
    function calcularValores() {
        const subtotal = carrinho.reduce(
            (total, item) =>
                total + item.preco * item.quantidade,
            0
        );

        const desconto = cupomAtivo ? subtotal * 0.10 : 0;

        const frete = carrinho.length
            ? Number($("frete")?.value || 0)
            : 0;

        const total = subtotal - desconto + frete;

        return {
            subtotal,
            desconto,
            frete,
            total
        };
    }

    // MOSTRAR PRODUTOS
    function renderizar() {
        const lista = $("lista-carrinho") || $("itens-carrinho");

        atualizarContador();

        if (!lista) {
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
            totalItem.textContent =
                "Total: " + dinheiro(item.preco * item.quantidade);

            detalhes.append(nome, preco, totalItem);

            const controles = document.createElement("div");
            controles.className = "controles-carrinho";

            const menos = document.createElement("button");
            menos.type = "button";
            menos.textContent = "−";
            menos.onclick = () => alterarQuantidade(item.id, -1);

            const numero = document.createElement("span");
            numero.textContent = item.quantidade;

            const mais = document.createElement("button");
            mais.type = "button";
            mais.textContent = "+";
            mais.onclick = () => alterarQuantidade(item.id, 1);

            const remover = document.createElement("button");
            remover.type = "button";
            remover.textContent = "Remover";

            remover.onclick = () => {
                carrinho = carrinho.filter(
                    produto => produto.id !== item.id
                );

                renderizar();
            };

            controles.append(menos, numero, mais, remover);

            linha.append(detalhes, controles);
            lista.appendChild(linha);
        });

        const valores = calcularValores();

        if ($("subtotal-carrinho")) {
            $("subtotal-carrinho").textContent =
                dinheiro(valores.subtotal);
        }

        if ($("desconto-carrinho")) {
            $("desconto-carrinho").textContent =
                dinheiro(valores.desconto);
        }

        if ($("frete-carrinho")) {
            $("frete-carrinho").textContent =
                dinheiro(valores.frete);
        }

        if ($("total-carrinho")) {
            $("total-carrinho").textContent =
                dinheiro(valores.total);
        }

        if ($("total")) {
            $("total").textContent = dinheiro(valores.total);
        }

        salvar();
    }

    // ALTERAR QUANTIDADE
    function alterarQuantidade(id, mudanca) {
        const item = carrinho.find(produto => produto.id === id);

        if (!item) return;

        item.quantidade += mudanca;

        if (item.quantidade <= 0) {
            carrinho = carrinho.filter(
                produto => produto.id !== id
            );
        }

        renderizar();
    }

    // LIMPAR CARRINHO
    window.limparCarrinho = function() {
        if (!carrinho.length) return;

        if (confirm("Deseja esvaziar seu carrinho?")) {
            carrinho = [];
            cupomAtivo = false;

            if ($("cupom")) $("cupom").value = "";

            if ($("mensagem-cupom")) {
                $("mensagem-cupom").textContent = "";
            }

            localStorage.removeItem(CHAVE_CHECKOUT);

            renderizar();
        }
    };

    // APLICAR CUPOM
    function aplicarCupom() {
        const codigo = $("cupom")?.value.trim().toUpperCase();
        const mensagem = $("mensagem-cupom");

        cupomAtivo = codigo === "BEMVINDO10";

        if (mensagem) {
            mensagem.textContent = cupomAtivo
                ? "Cupom aplicado! Você ganhou 10% de desconto."
                : "Cupom inválido.";
        }

        renderizar();
    }

    // IR PARA O CHECKOUT
    function irParaCheckout() {
        if (!carrinho.length) {
            alert("Adicione produtos ao carrinho antes de continuar.");
            return;
        }

        const valores = calcularValores();

        const dados = {
            produtos: carrinho,
            subtotal: valores.subtotal,
            desconto: valores.desconto,
            frete: valores.frete,
            total: valores.total,
            cupomAtivo: cupomAtivo,
            data: new Date().toISOString()
        };

        localStorage.setItem(
            CHAVE_CHECKOUT,
            JSON.stringify(dados)
        );

        salvar();

        window.location.href = "checkout.html";
    }

    window.irParaCheckout = irParaCheckout;

    // EVENTOS
    function configurarEventos() {
        $("btn-carrinho")?.addEventListener(
            "click",
            abrirCarrinho
        );

        $("fechar-carrinho")?.addEventListener(
            "click",
            fecharCarrinho
        );

        $("continuar-comprando")?.addEventListener(
            "click",
            fecharCarrinho
        );

        $("carrinho-container")?.addEventListener("click", evento => {
            if (evento.target === $("carrinho-container")) {
                fecharCarrinho();
            }
        });

        $("frete")?.addEventListener("change", renderizar);

        $("aplicar-cupom")?.addEventListener(
            "click",
            aplicarCupom
        );

        $("limpar-carrinho")?.addEventListener(
            "click",
            window.limparCarrinho
        );

        $("finalizar-compra")?.addEventListener(
            "click",
            irParaCheckout
        );
    }

    // INICIAR
    function iniciar() {
        carregarCarrinho();
        configurarEventos();
        renderizar();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", iniciar);
    } else {
        iniciar();
    }

})();
