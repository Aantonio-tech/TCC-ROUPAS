
const cadastroForm = document.getElementById("cadastroForm");
const mensagem = document.getElementById("mensagem");

cadastroForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim().toLowerCase();
    const senha = document.getElementById("senha").value;
    const confirmarSenha = document.getElementById("confirmarSenha").value;

    // Verifica se as senhas são iguais
    if (senha !== confirmarSenha) {
        mensagem.textContent = "As senhas não são iguais.";
        mensagem.style.color = "#ff5a1f";
        return;
    }

    try {
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

        // Cria a conta
        const usuario = {
            nome: nome,
            email: email,
            senha: senha
        };

        // Salva os dados
        localStorage.setItem("soulStreetUsuario", JSON.stringify(usuario));

        mensagem.textContent = "Conta criada com sucesso!";
        mensagem.style.color = "#00d1b2";

        // Não apaga os campos nem redireciona automaticamente.

    } catch (erro) {
        mensagem.textContent = "Erro ao salvar a conta. Tente novamente.";
        mensagem.style.color = "#ff5a1f";
        console.error(erro);
    }
});
