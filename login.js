document.getElementById("loginForm").addEventListener("submit", function(event) {

    event.preventDefault();

    const email = document.getElementById("email").value.trim().toLowerCase();
    const senha = document.getElementById("senha").value;
    const mensagem = document.getElementById("mensagem");

    // Busca os usuários cadastrados
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Procura usuário com e-mail e senha corretos
    const usuario = usuarios.find(
        usuario => usuario.email === email && usuario.senha === senha
    );

    if (usuario) {

        // Salva o usuário logado
        localStorage.setItem("usuarioLogado", JSON.stringify(usuario));

        mensagem.textContent = "Login realizado com sucesso!";
        mensagem.style.color = "#00d1b2";

        setTimeout(() => {
            window.location.href = "index.html";
        }, 1000);

    } else {

        mensagem.textContent = "E-mail ou senha incorretos.";
        mensagem.style.color = "#ff4d4d";

    }

});