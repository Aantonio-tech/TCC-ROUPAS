const loginForm = document.getElementById("loginForm");
const mensagem = document.getElementById("mensagem");

loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim().toLowerCase();
    const senha = document.getElementById("senha").value;

    // Busca na MESMA chave que o cadastro salva
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    if (usuarios.length === 0) {
        mensagem.textContent = "Nenhuma conta foi cadastrada.";
        mensagem.style.color = "#ff5a1f";
        return;
    }

    const usuario = usuarios.find(u => u.email === email && u.senha === senha);

<<<<<<< HEAD
    if (usuario) {
        // Salva QUEM logou
        localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
        window.location.href = "conta.html";
=======
    // Verifica login
    if (email === usuario.email && senha === usuario.senha) {

        // Marca que o usuário está logado
        localStorage.setItem("soulStreetLogado", "true");

        // Vai para a página da conta
        window.location.href = "index.html";

>>>>>>> a17e6b0cace318b44919d87554e65bcce43f5010
    } else {
        mensagem.textContent = "E-mail ou senha incorretos.";
        mensagem.style.color = "#ff5a1f";
    }
});
