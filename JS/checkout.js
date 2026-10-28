let carrinho=[];

try{
carrinho=JSON.parse(sessionStorage.getItem('soulStreetCarrinho'))||[];
if(!Array.isArray(carrinho))carrinho=[];
}catch(e){carrinho=[];}

function dinheiro(valor){
return Number(valor).toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
}

function mostrarResumo(){
const area=document.getElementById('itens');
area.innerHTML='';
let total=0;

if(carrinho.length===0){
area.innerHTML='<p class="aviso">Carrinho vazio. Volte às camisas e adicione produtos.</p>';
}

carrinho.forEach(produto=>{
const preco=Number(produto.preco);
if(!produto.nome||!Number.isFinite(preco)||preco<0)return;
total+=preco;

const linha=document.createElement('div');
linha.className='item';

const nome=document.createElement('span');
nome.textContent=produto.nome;

const valor=document.createElement('span');
valor.textContent=dinheiro(preco);

linha.append(nome,valor);
area.appendChild(linha);
});

document.getElementById('total').textContent=dinheiro(total);
}

document.getElementById('formulario').addEventListener('submit',function(evento){
evento.preventDefault();

const mensagem=document.getElementById('mensagem');

if(carrinho.length===0){
mensagem.textContent='Seu carrinho está vazio. Volte à página de camisas.';
return;
}

if(!this.reportValidity())return;

const pagamento=document.querySelector('input[name="pagamento"]:checked');

if(!pagamento){
mensagem.textContent='Escolha uma forma de pagamento.';
return;
}

const nome=document.getElementById('nome').value.trim();
const sobrenome=document.getElementById('sobrenome').value.trim();

mensagem.textContent='Pedido demonstrativo confirmado para '+nome+' '+sobrenome+'. Pagamento escolhido: '+pagamento.value+'. Nenhum pagamento real foi realizado.';

sessionStorage.removeItem('soulStreetCarrinho');
carrinho=[];
mostrarResumo();
});

mostrarResumo();
