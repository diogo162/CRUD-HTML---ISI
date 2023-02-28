const form = document.getElementById('formulario');
const tabela = document.getElementById('tabela');

form.addEventListener('submit', function(event) {
  const produto = {
    tipo: this.elements.tipo.value,
    modelo: this.elements.modelo.value,
    preco: this.elements.preco.value,
    quantidade: this.elements.quantidade.value,
    imagem: this.elements.imagem.value,
  };

  let produtos = JSON.parse(localStorage.getItem('produtos')) || [];
  produtos.push(produto);
  localStorage.setItem('produtos', JSON.stringify(produtos));
  exibirProdutos();
});

function exibirProdutos() {
  tabela.innerHTML = '';

  let produtos = JSON.parse(localStorage.getItem('produtos')) || [];
  for (let i = 0; i < produtos.length; i++) {
    const produto = produtos[i];
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${produto.tipo}</td>
      <td>${produto.modelo}</td>
      <td>${produto.preco}</td>
      <td>${produto.quantidade}</td>
      <td><img id="imagem" src="${produto.imagem}" width="100"></td>
      <td class="acao"><button id="editar">Editar</button>
                       <button id="deletar">Deletar</button></t>`;
    tabela.appendChild(tr);
  }
}

exibirProdutos();

function deletarProduto(index) {
  let produtos = JSON.parse(localStorage.getItem('produtos')) || [];
  produtos.splice(index, 1);
  localStorage.setItem('produtos', JSON.stringify(produtos));
  exibirProdutos();
}

function editarProduto(index) {
  let produtos = JSON.parse(localStorage.getItem('produtos')) || [];

  const produto = produtos[index];
  form.elements.tipo.value = produto.tipo;
  form.elements.modelo.value = produto.modelo;
  form.elements.preco.value = produto.preco;
  form.elements.quantidade.value = produto.quantidade;
  form.elements.imagem.value = produto.imagem;

  produtos.splice(index, 1);
  localStorage.setItem('produtos', JSON.stringify(produtos));
  exibirProdutos();
}

tabela.addEventListener('click', function(event) {
  if (event.target.id === 'deletar') {
    const index = event.target.parentNode.parentNode.rowIndex - 1;

    deletarProduto(index);
    
  } else if (event.target.id === 'editar') {
    const index = event.target.parentNode.parentNode.rowIndex - 1;
    editarProduto(index);
  }
});

const searchInput = document.getElementById('pesquisar');
searchInput.addEventListener('input', function() {
  pesquisarProdutos(this.value);
});

function pesquisarProdutos(termo) {
  let produtos = JSON.parse(localStorage.getItem('produtos')) || [];

  produtos = produtos.filter(function(produto) {
    return produto.modelo.toUpperCase().indexOf(termo.toUpperCase()) > -1;
  });

  tabela.innerHTML = '';

  for (let i = 0; i < produtos.length; i++) {
    const produto = produtos[i];
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${produto.tipo}</td>
      <td>${produto.modelo}</td>
      <td>${produto.preco}</td>
      <td>${produto.quantidade}</td>
      <td><img id="imagem" src="${produto.imagem}" width="100"></td>
      <td class="acao"><button id="editar">Editar</button>
                       <button id="deletar">Deletar</button></t>`;
    tabela.appendChild(tr);
  }
}