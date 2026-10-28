document.addEventListener("DOMContentLoaded", () => {
    const btnCarrinho = document.getElementById("btn-carrinho");
    const carrinhoPopup = document.getElementById("carrinho-popup");
    const fecharCarrinho = document.getElementById("fechar-carrinho");
  
    // TESTE DE SEGURANÇA: Verifique se o navegador encontrou os elementos
    if (!btnCarrinho || !carrinhoPopup) {
      console.error("ERRO: O ID 'btn-carrinho' ou 'carrinho-popup' não foi encontrado no HTML.");
      return;
    }
  
    // Função para abrir
    btnCarrinho.addEventListener("click", (e) => {
      e.preventDefault(); // Impede que a página recarregue
      carrinhoPopup.classList.add("aberto");
      document.body.style.overflow = "hidden";
    });
  
    // Função para fechar
    if (fecharCarrinho) {
      fecharCarrinho.addEventListener("click", () => {
        carrinhoPopup.classList.remove("aberto");
        document.body.style.overflow = "";
      });
    }
  });
  
  let carrinho = [];

        try {
            carrinho = JSON.parse(
                localStorage.getItem("carrinhoSoulStreet") || "[]"
            );

            if (!Array.isArray(carrinho)) {
                carrinho = [];
            }
        } catch {
            carrinho = [];
        }

        function dinheiro(valor) {
            return Number(valor).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            });
        }

        function salvar() {
            localStorage.setItem(
                "carrinhoSoulStreet",
                JSON.stringify(carrinho)
            );
            mostrarCarrinho();
        }

        function mostrarCarrinho() {
            const itens = document.getElementById("itens");
            const totalElemento = document.getElementById("total");

            document.getElementById("quantidade").textContent =
                carrinho.reduce(
                    (soma, produto) => soma + (Number(produto.quantidade) || 1),
                    0
                );

            if (carrinho.length === 0) {
                itens.textContent = "Seu carrinho está vazio.";
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
                valor.textContent =
                    dinheiro(preco) + " × " + quantidade;

                info.append(nome, valor);

                const subtotal = document.createElement("strong");
                subtotal.textContent = dinheiro(preco * quantidade);

                const remover = document.createElement("button");
                remover.textContent = "Remover";
                remover.onclick = function () {
                    carrinho.splice(indice, 1);
                    salvar();
                };

                linha.append(info, subtotal, remover);
                itens.appendChild(linha);
            });

            totalElemento.textContent = "Total: " + dinheiro(total);
        }

        function limparCarrinho() {
            if (carrinho.length === 0) {
                alert("O carrinho já está vazio.");
                return;
            }

            if (confirm("Deseja remover todos os produtos?")) {
                carrinho = [];
                salvar();
            }
        }

        function finalizarCompra() {
            if (carrinho.length === 0) {
                alert("Adicione produtos ao carrinho antes de finalizar!");
                return;
            }

            window.location.href = "checkout.html";
        }

        mostrarCarrinho();