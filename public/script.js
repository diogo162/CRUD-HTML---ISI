const form = document.getElementById('formulario');
const tabela = document.getElementById('tabela');

const closeSpan = document.querySelector(".close");


form.addEventListener('submit', function(event) {
  event.preventDefault();

  const produto = {
    id: this.elements.produtoId.value,
    tipo: this.elements.tipo.value,
    modelo: this.elements.modelo.value,
    preco: this.elements.preco.value,
    quantidade: this.elements.quantidade.value,
    imagem: this.elements.imagem.value,
  };

  const method = produto.id ? 'PUT' : 'POST';
  const url = produto.id ? `/produtos/${produto.id}` : '/produtos';

  fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(produto)
  })
  .then(response => response.json())
  .then(data => {
    // Atualiza a lista de produtos com resposta do servidor
    localStorage.setItem('produtos', JSON.stringify(data));
    exibirProdutos();
  });

  // Resetar o form
  form.reset();
  form.elements.produtoId.value = '';
});

function exibirProdutos() {
  tabela.innerHTML = '';
  const submitButton = form.querySelector('button[type="submit"]');
  submitButton.textContent = 'Adicionar';
  fetch('/produtos')
    .then(response => response.json())
    .then(data => {
      let produtos = data || [];
      for (let i = 0; i < produtos.length; i++) {
        const produto = produtos[i];
        const tr = document.createElement('tr');
        tr.classList.add("produto");
        tr.dataset.index = produto.id;
        tr.innerHTML = `
          <td>${produto.tipo}</td>
          <td>${produto.modelo}</td>
          <td>${produto.preco}</td>
          <td>${produto.quantidade}</td>
          <td><img id="imagem" src="${produto.imagem}" width="100"></td>
          <td class="acao"><button id="editar">Editar</button>
                          <button id="deletar">Deletar</button></td>`;
        tabela.appendChild(tr);

      }
    });
}

function deletarProduto(index) {
  // Manda uma request de DELETE pro servidor
  fetch(`/produtos/${index}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => {
    // Atualiza a lista de produtos com resposta do servidor
    exibirProdutos();
  });
}


function editarProduto(index) {
  fetch(`/produtos/${index}`)
    .then(response => response.json())
    .then(produto => {
      form.elements.produtoId.value = produto.id; // define o id do produto no campo hidden do formulário
      form.elements.tipo.value = produto.tipo;
      form.elements.modelo.value = produto.modelo;
      form.elements.preco.value = produto.preco;
      form.elements.quantidade.value = produto.quantidade;
      form.elements.imagem.value = produto.imagem;

      // Muda o metodo pra put e atualiza o form action URl
      form.method = 'PUT';
      form.action = `/produtos/${produto.id}`; // atualiza o URL do formulário para incluir o id do produto

      // Muda o nome do botão de submit
      const submitButton = form.querySelector('button[type="submit"]');
      submitButton.textContent = 'Salvar';

      // Adiciona um event listener pra o form submission pra editar o produto
      form.removeEventListener('submit', adicionarProduto);
      form.addEventListener('submit', function(event) {
        event.preventDefault();
        const produtoAtualizado = {
          tipo: this.elements.tipo.value,
          modelo: this.elements.modelo.value,
          preco: this.elements.preco.value,
          quantidade: this.elements.quantidade.value,
          imagem: this.elements.imagem.value,
        };

        // Manda um request de put pro servidor
        fetch(`/produtos/${produto.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(produtoAtualizado)
        })
        .then(response => response.json())
        .then(data => {

          exibirProdutos();
        });
      });
    });
}


tabela.addEventListener('click', function(event) {
  if (event.target.id === 'deletar') {
    const index = event.target.closest('.produto').dataset.index;
    deletarProduto(index);

  } else if (event.target.id ==='editar') {
    const index = event.target.closest('.produto').dataset.index;
    editarProduto(index);}

  });
  
exibirProdutos();


const searchInput = document.getElementById('pesquisar');
searchInput.addEventListener('input', function() {
  pesquisarProdutos(this.value);
});

function pesquisarProdutos(termo) {
  let produtos = [];

  fetch('/produtos')
    .then(response => response.json())
    .then(data => {
      produtos = data || [];

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
                           <button id="deletar">Deletar</button></td>`;
        tabela.appendChild(tr);
      }
    });
}


