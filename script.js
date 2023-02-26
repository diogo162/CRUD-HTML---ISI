// produtos = []

// // Add event listener to the form submit button
// form.addEventListener('submit', addNewProduct);

// function adicionar(){
//     var nome, preco, quantidade, preco;
//     nome = document.getElementById(nome);
//     preco = document.getElementById(preco);
//     quantidade = document.getElementById(quantidade);
//     preco = document.getElementById(preco);
// }
// // 
// function buscar(){
//     var input, filter, ul, li, a, i, txtValue;
//     input = document.getElementById("entradaPesquisa");
//     filter = input.value.toUpperCase();
//     ul = document.getElementById("myUL");
//     li = ul.getElementsByTagName("li");
//     for (i = 0; i < li.length; i++) {
//       a = li[i].getElementsByTagName("a")[0];
//       txtValue = a.textContent || a.innerText;
//       if (txtValue.toUpperCase().indexOf(filter) > -1) {
//         li[i].style.display = "";
//       } else {
//         li[i].style.display = "none";
//       }
//     }
//   }
//   function editar(){

//   }

//   function deletar(){

//   }

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
      <td><img src="${produto.imagem}" width="80"></td>
      <tr><button id="editar">Editar</button></tr><br>
      <tr><button id="deletar">Deletar</button></tr>
    `;
    tabela.appendChild(tr);
  }
}

// Exibe os dados na tabela quando a página é carregada
exibirProdutos();