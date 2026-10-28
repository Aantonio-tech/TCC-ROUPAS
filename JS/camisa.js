let carrinho=[];

try{
carrinho=JSON.parse(sessionStorage.getItem('soulStreetCarrinho'))||[];
if(!Array.isArray(carrinho))carrinho=[];
}catch(e){carrinho=[];}

function salvarCarrinho(){
sessionStorage.setItem('soulStreetCarrinho',JSON.stringify(carrinho));
}

function dinheiro(valor){
return valor.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
}

function adicionarAoCarrinho(nome,preco){
carrinho.push({nome,preco});
salvarCarrinho();
atualizarCarrinho();
document.getElementById('carrinho').style.display='block';
document.getElementById('carrinho').scrollIntoView({behavior:'smooth'});
}

function atualizarCarrinho(){
document.getElementById('quantidade').textContent=carrinho.length;
const area=document.getElementById('itens-carrinho');
area.innerHTML='';

if(carrinho.length===0){
area.innerHTML='<p class="vazio">Seu carrinho está vazio.</p>';
}

carrinho.forEach((produto,indice)=>{
const linha=document.createElement('div');
linha.className='item';

const info=document.createElement('div');
const nome=document.createElement('strong');
nome.textContent=produto.nome;

const preco=document.createElement('p');
preco.textContent=dinheiro(Number(produto.preco));

info.append(nome,preco);

const remover=document.createElement('button');
remover.className='btn-remover';
remover.textContent='Remover';
remover.onclick=()=>removerDoCarrinho(indice);

linha.append(info,remover);
area.appendChild(linha);
});

const total=carrinho.reduce((soma,p)=>soma+Number(p.preco),0);
document.getElementById('total').textContent=dinheiro(total);
}

function removerDoCarrinho(indice){
carrinho.splice(indice,1);
salvarCarrinho();
atualizarCarrinho();
}

function limparCarrinho(){
carrinho=[];
salvarCarrinho();
atualizarCarrinho();
}

function alternarCarrinho(){
const elemento=document.getElementById('carrinho');
const aberto=elemento.style.display==='block';
elemento.style.display=aberto?'none':'block';
if(!aberto)elemento.scrollIntoView({behavior:'smooth'});
}

function irParaCheckout(){
if(carrinho.length===0){
alert('Adicione um produto ao carrinho primeiro!');
return;
}
salvarCarrinho();
window.location.href='checkout.html';
}

atualizarCarrinho();