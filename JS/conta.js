
document.addEventListener("DOMContentLoaded", function () {

    const nomeUsuario = document.getElementById("nomeUsuario");
    const emailUsuario = document.getElementById("emailUsuario");
    const botaoSair = document.getElementById("sair");

    // Busca os dados da conta cadastrada
    const usuarioSalvo = localStorage.getItem("soulStreetUsuario");

    if (usuarioSalvo) {
        const usuario = JSON.parse(usuarioSalvo);

        nomeUsuario.textContent = usuario.nome;
        emailUsuario.textContent = usuario.email;

    } else {
        nomeUsuario.textContent = "Visitante";
        emailUsuario.textContent = "Nenhuma conta encontrada.";
    }

    // Botão para sair da conta
    botaoSair.addEventListener("click", function () {
        localStorage.removeItem("soulStreetLogado");
        window.location.href = "login.html";
    });

});
