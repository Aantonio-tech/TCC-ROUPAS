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
});
