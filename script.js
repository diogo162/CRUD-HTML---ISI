produtos = []

// Add event listener to the form submit button
form.addEventListener('submit', addNewProduct);

function adcionar(){
    var nome, preco, quantidade, preco;
    nome = document.getElementById(nome);
    preco = document.getElementById(preco);
    quantidade = document.getElementById(quantidade);
    preco = document.getElementById(preco);
    
}

function buscar(){
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("entradaPesquisa");
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("a")[0];
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
  }
  function editar(){

  }

  function deletar(){

  }