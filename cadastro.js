document.getElementById("cadastroForm").addEventListener("submit", function(event) {

    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim().toLowerCase();
    const senha = document.getElementById("senha").value;
    const confirmarSenha = document.getElementById("confirmarSenha").value;
    const mensagem = document.getElementById("mensagem");

    // Verifica se as senhas são iguais
    if (senha !== confirmarSenha) {
        mensagem.textContent = "As senhas não são iguais.";
        mensagem.style.color = "#ff4d4d";
        return;
    }

    // Recupera usuários cadastrados
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Verifica se o e-mail já existe
    const usuarioExiste = usuarios.some(usuario => usuario.email === email);

    if (usuarioExiste) {
        mensagem.textContent = "Este e-mail já está cadastrado.";
        mensagem.style.color = "#ff4d4d";
        return;
    }

    // Cria novo usuário
    const novoUsuario = {
        nome: nome,
        email: email,
        senha: senha
    };

    usuarios.push(novoUsuario);

    // Salva no navegador
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    mensagem.textContent = "Cadastro realizado com sucesso!";
    mensagem.style.color = "#00d1b2";

    // Vai para o login depois de 1 segundo
    setTimeout(() => {
        window.location.href = "login.html";
    }, 1000);

});