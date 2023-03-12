const form = document.getElementById('formulario');
const tabela = document.getElementById('tabela');
const closeSpan = document.querySelector(".close");


form.addEventListener('submit', function(event) {
  event.preventDefault();
  const produto = {
    tipo: this.elements.tipo.value,
    modelo: this.elements.modelo.value,
    preco: this.elements.preco.value,
    quantidade: this.elements.quantidade.value,
    imagem: this.elements.imagem.value,
  };

  // Send POST request to server
  fetch('/produtos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(produto)
  })
  .then(response => response.json())
  .then(data => {
    // Update products list with response from server
    localStorage.setItem('produtos', JSON.stringify(data));
    exibirProdutos();
  });
});

function exibirProdutos() {
  tabela.innerHTML = '';

  // Get products list from server
  fetch('/produtos')
    .then(response => response.json())
    .then(data => {
      let produtos = data || [];
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
    });
}

function deletarProduto(index) {
  let produtos = JSON.parse(localStorage.getItem('produtos')) || [];
  produtos.splice(index, 1);

  // Send PUT request to server
  fetch(`/produtos/${index}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(produtos)
  })
  .then(response => response.json())
  .then(data => {
    // Update products list with response from server
    localStorage.setItem('produtos', JSON.stringify(data));
    exibirProdutos();
  });
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

  // Send PUT request to server
  fetch(`/produtos/${index}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(produtos)
  })
  .then(response => response.json())
  .then(data => {
    // Update products list with response from server
    localStorage.setItem('produtos', JSON.stringify(data));
    exibirProdutos();
  });
}

tabela.addEventListener('click', function(event) {
  if (event.target.id === 'deletar') {
    const index = event.target.parentNode.parentNode.rowIndex - 1;

    deletarProduto(index);
    
  } else if (event.target.id ==='editar') {
    const index = event.target.parentNode.parentNode.rowIndex - 1;
    editarProduto(index);}
  });
  
  // Call exibirProdutos on page load
  exibirProdutos();
