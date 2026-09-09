const cadastroForm = document.getElementById("cadastroForm");
const mensagem = document.getElementById("mensagem");

cadastroForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;
    const confirmarSenha = document.getElementById("confirmarSenha").value;

    // Verifica se as senhas são iguais
    if (senha !== confirmarSenha) {
        mensagem.textContent = "As senhas não são iguais.";
        mensagem.style.color = "#ff5a1f";
        return;
    }

    // Verifica se já existe uma conta
    const usuarioExistente = localStorage.getItem("soulStreetUsuario");

    if (usuarioExistente) {
        const usuario = JSON.parse(usuarioExistente);

        if (usuario.email === email) {
            mensagem.textContent = "Este e-mail já está cadastrado.";
            mensagem.style.color = "#ff5a1f";
            return;
        }
    }

    // Cria o usuário
    const usuario = {
        nome: nome,
        email: email,
        senha: senha
    };


    // Salva no navegador
    localStorage.setItem("soulStreetUsuario", JSON.stringify(usuario));

    mensagem.textContent = "Conta criada com sucesso!";
    mensagem.style.color = "#00d1b2";

    // Depois de 1 segundo, vai para o login
    setTimeout(function () {
        window.location.href = "login.html";
    }, 1000);
    
});