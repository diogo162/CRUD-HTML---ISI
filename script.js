// Seleciona o formulário
const form = document.getElementById('formulario');

// Seleciona a tabela onde os dados serão exibidos
const tabela = document.getElementById('tabela');

// Adiciona um listener ao evento "submit" do formulário
form.addEventListener('submit', function(event) {

  // Cria um objeto com os dados do formulário
  const produto = {
    tipo: this.elements.tipo.value,
    modelo: this.elements.modelo.value,
    preco: this.elements.preco.value,
    quantidade: this.elements.quantidade.value,
    imagem: this.elements.imagem.value,
  };

  // Verifica se já existe um array de produtos no Local Storage
  let produtos = JSON.parse(localStorage.getItem('produtos')) || [];

  // Adiciona o novo produto ao array
  produtos.push(produto);

  // Armazena o array atualizado no Local Storage
  localStorage.setItem('produtos', JSON.stringify(produtos));

  // Exibe os dados na tabela
  exibirProdutos();
});

// Função para exibir os produtos na tabela
function exibirProdutos() {

  // Limpa a tabela
  tabela.innerHTML = '';

  // Obtém o array de produtos do Local Storage
  let produtos = JSON.parse(localStorage.getItem('produtos')) || [];

  // Loop pelos produtos e adiciona as linhas na tabela
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
                       <button id="deletar">Deletar</button></t>
    `;
    tabela.appendChild(tr);
  }
}

// Exibe os dados na tabela quando a página é carregada
exibirProdutos();

// Função para deletar um produto
function deletarProduto(index) {
  // Obtém o array de produtos do Local Storage
  let produtos = JSON.parse(localStorage.getItem('produtos')) || [];

  // Remove o produto do array pelo índice
  produtos.splice(index, 1);

  // Armazena o array atualizado no Local Storage
  localStorage.setItem('produtos', JSON.stringify(produtos));

  // Exibe os dados atualizados na tabela
  exibirProdutos();
}

// Função para editar um produto
function editarProduto(index) {
  // Obtém o array de produtos do Local Storage
  let produtos = JSON.parse(localStorage.getItem('produtos')) || [];

  // Obtém o produto a ser editado pelo índice
  const produto = produtos[index];

  // Preenche os campos do formulário com os dados do produto
  form.elements.tipo.value = produto.tipo;
  form.elements.modelo.value = produto.modelo;
  form.elements.preco.value = produto.preco;
  form.elements.quantidade.value = produto.quantidade;
  form.elements.imagem.value = produto.imagem;

  // Remove o produto do array pelo índice
  produtos.splice(index, 1);

  // Armazena o array atualizado no Local Storage
  localStorage.setItem('produtos', JSON.stringify(produtos));

  // Exibe os dados atualizados na tabela
  exibirProdutos();
}

// Adiciona um listener para o evento "click" dos botões "Deletar" e "Editar"
tabela.addEventListener('click', function(event) {
  if (event.target.id === 'deletar') {
    // Obtém o índice do produto a ser deletado
    const index = event.target.parentNode.parentNode.rowIndex - 1;

    // Chama a função de deletar o produto
    deletarProduto(index);
  } else if (event.target.id === 'editar') {
    // Obtém o índice do produto a ser editado
    const index = event.target.parentNode.parentNode.rowIndex - 1;

    // Chama a função de editar o produto
    editarProduto(index);
  }
});