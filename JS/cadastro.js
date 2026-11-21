const cadastroForm = document.getElementById("cadastroForm");
const mensagem = document.getElementById("mensagem");

cadastroForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim().toLowerCase();
    const senha = document.getElementById("senha").value;
    const confirmarSenha = document.getElementById("confirmarSenha").value;

    if (senha !== confirmarSenha) {
        mensagem.textContent = "As senhas não são iguais.";
        mensagem.style.color = "#ff5a1f";
        return;
    }

    try {
        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        const usuarioExistente = usuarios.find(u => u.email === email);
        if (usuarioExistente) {
            mensagem.textContent = "Este e-mail já está cadastrado.";
            mensagem.style.color = "#ff5a1f";
            return;
        }

        const usuario = {
            nome: nome,
            email: email,
            senha: senha
        };

        usuarios.push(usuario);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        mensagem.textContent = "Conta criada com sucesso!";
        mensagem.style.color = "#00d1b2";

        setTimeout(() => {
            window.location.href = "login.html";
        }, 1000);

    } catch (erro) {
        mensagem.textContent = "Erro ao salvar a conta. Tente novamente.";
        mensagem.style.color = "#ff5a1f";
        console.error(erro);
    }
});
