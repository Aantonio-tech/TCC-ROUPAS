<<<<<<< HEAD
const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

if (!usuarioLogado) {
    window.location.href = "login.html";
} else {
    document.getElementById("nomeUsuario").textContent = usuarioLogado.nome;
    document.getElementById("emailUsuario").textContent = usuarioLogado.email;
}

document.getElementById("sair").addEventListener("click", function() {
    localStorage.removeItem("usuarioLogado");
    window.location.href = "login.html";
=======

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

>>>>>>> a17e6b0cace318b44919d87554e65bcce43f5010
});
