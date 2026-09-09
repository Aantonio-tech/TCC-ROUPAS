const loginForm = document.getElementById("loginForm");
const mensagem = document.getElementById("mensagem");

loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;

    // Busca o usuário cadastrado
    const usuarioSalvo = localStorage.getItem("soulStreetUsuario");

    if (!usuarioSalvo) {
        mensagem.textContent = "Nenhuma conta foi cadastrada.";
        mensagem.style.color = "#ff5a1f";
        return;
    }

    const usuario = JSON.parse(usuarioSalvo);

    // Verifica login
    if (email === usuario.email && senha === usuario.senha) {

        // Marca que o usuário está logado
        localStorage.setItem("soulStreetLogado", "true");

        // Vai para a página da conta
        window.location.href = "conta.html";

    } else {
        mensagem.textContent = "E-mail ou senha incorretos.";
        mensagem.style.color = "#ff5a1f";
    }
});