
document.addEventListener("DOMContentLoaded", () => {

    // Seleciona todos os botões de camisas
    const botoes = document.querySelectorAll(".btn-camisa");

    botoes.forEach((botao) => {
        botao.addEventListener("click", (event) => {
            event.preventDefault();

            const pagina = botao.getAttribute("data-pagina");

            if (pagina) {
                // Abre na mesma aba
                window.location.href = pagina;
            }
        });
    });

});
