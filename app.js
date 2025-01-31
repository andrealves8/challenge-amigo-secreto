const amigos = [];
let segundos = 3;
let contador = segundos;

// Chama a função adicionarAmigo pressionando a tecla Enter
document.getElementById("amigo").addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    adicionarAmigo();
  }
});

document.getElementById("amigo").focus();

// Adiciona nomes na lista de amigos
function adicionarAmigo() {
  let campoTexto = document.getElementById("amigo").value;

  if (amigos.includes(campoTexto)) {
    alert("Este nome já está na lista, tente outro");
  }

  // valida o valor do campo de entrada
  if (campoTexto !== "") {
    amigos.push(campoTexto);
    // Garante que a lista não tera nomes repertidos
    const listaUnica = [...new Set(amigos)];
    limparCampo();
    //console.log(amigos);
    inserirLista(listaUnica);
  } else {
    alert("Por favor, insira um nome");
  }
}

function inserirLista(amigos) {
  // Seleciona o elemento da lista
  const lista = document.getElementById("listaAmigos");

  // Limpa a lista existente
  lista.innerHTML = "";

  // Percorre o array e adiciona cada nome como um <li>
  for (campoTexto of amigos) {
    const item = document.createElement("li");
    item.textContent = campoTexto;
    lista.appendChild(item);
  }
}

const estadoOriginalBotao = document.getElementById("botaoSorteio").outerHTML;
function sortearAmigo() {
  // Verifica se há amigos disponíveis

  if (contador === segundos) {
    if (amigos.length === 0) {
      document.getElementById("resultado").innerHTML =
        "Nenhum amigo disponível para sorteio";
    } else {
      // Gera um índice aleatório
      const numeroAleatorio = parseInt(Math.random() * amigos.length);
      //alert(numeroAleatorio);

      // Obtém o nome sorteado
      const amigoSorteado = amigos[numeroAleatorio];
      //alert(amigoSorteado);

      // Exibe o resultado
      botaoAlterado = document.getElementById(
        "resultado"
      ).innerHTML = `Amigo sorteado: ${amigoSorteado}`;
    }
    setTimeout(limpaResultado, 4000);

    if (contador === segundos && amigos.length !== 0) {
      botaoAlteradoContador();
    }
  }
}

// limpa o campo de entrada
function limparCampo() {
  campoTexto = document.getElementById("amigo");
  campoTexto.value = "";
}

function limpaResultado() {
  document.getElementById("resultado").innerHTML = "";
  amigos.splice(numeroAleatorio, 1);
}

function botaoAlteradoContador() {
  let intervalo;

  // Função para atualizar o contador
  function atualizarContador() {
    document.getElementById(
      "botaoSorteio"
    ).childNodes[2].nodeValue = `Aguarde: ${contador}s`;
    contador--;
  }

  // Inicia o contador
  intervalo = setInterval(atualizarContador, 1000); // Atualiza a cada 1 segundo

  // Para o contador após 4 segundos
  setTimeout(() => {
    clearInterval(intervalo); // Para o contador
    console.log("Contador parado!");
    resetarBotao();
    contador = segundos;
  }, 4000); // 4000 ms = 4 segundos
  contador = segundos;
}

// Função para resetar o botão
function resetarBotao() {
  document.getElementById("botaoSorteio").outerHTML = estadoOriginalBotao;
}
