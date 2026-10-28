  // Verifica se o usuário está logado
  const logado = localStorage.getItem("soulStreetLogado");
  const usuarioSalvo = localStorage.getItem("soulStreetUsuario");

  if (logado !== "true" || !usuarioSalvo) {
      window.location.href = "login.html";
  }

  // Recupera os dados do usuário
  const usuario = JSON.parse(usuarioSalvo);

  document.getElementById("nomeUsuario").textContent = usuario.nome;
  document.getElementById("emailUsuario").textContent = usuario.email;

  // Botão sair
  document.getElementById("sair").addEventListener("click", function () {

      localStorage.removeItem("soulStreetLogado");

      window.location.href = "login.html";
  });