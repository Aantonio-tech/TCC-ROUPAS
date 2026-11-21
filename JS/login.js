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

    if (usuario) {
        // Salva QUEM logou
        localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
        // Marca que o usuário está logado
        localStorage.setItem("soulStreetLogado", "true");

        // Vai para a página inicial
        window.location.href = "index.html";
    } else {
        mensagem.textContent = "E-mail ou senha incorretos.";
        mensagem.style.color = "#ff5a1f";
    }
});
