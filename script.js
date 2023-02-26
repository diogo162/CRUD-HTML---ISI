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
                       <button id="deletar">Deletar</button></tr>
    `;
    tabela.appendChild(tr);
  }
}

exibirProdutos();