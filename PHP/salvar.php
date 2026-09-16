<?php
include("conexao.php");

$nome = $_POST['nome'];
$cpf = $_POST['cpf'];

$sql = "INSERT INTO clientes (nome, cpf) VALUES ('$nome', '$cpf')";

if (mysqli_query($conexao, $sql)) {
    echo "Dados salvos com sucesso!";
} else {
    echo "Erro: " . mysqli_error($conexao);
}
?>