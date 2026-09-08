// Importa o módulo do MySQL (instale antes com: npm install mysql2)
const mysql = require('mysql2');

const host = "localhost";
const usuario = "root";
const senha = "";
const banco = "soulstreet";

// Cria a configuração da conexão
const conexao = mysql.createConnection({
    host: host,
    user: usuario,
    password: senha,
    database: banco
});

// Estabelece a conexão e verifica se há erros
conexao.connect((erro) => {
    if (erro) {
        console.error("Erro na conexão: " + erro.stack);
        return;
    }
    console.log("Conectado com sucesso ao banco " + banco);
});
