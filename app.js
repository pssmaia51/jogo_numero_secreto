let listaDeNumerosSorteados = []; // Array para armazenar números já sorteados
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTexto(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.2});
}


function exibirMsnInicial() {
    exibirTexto('h1', 'Jogo de Número Secreto');
    exibirTexto('p', `Escolha um número entre 1 e ${numeroLimite}`);    
}

exibirMsnInicial();

function verificarChute() {
    let chute = Number(document.querySelector('input').value);
    let reiniciarBtn = document.querySelector('#reiniciar');  

    // Verificação do chute
    if (chute === numeroSecreto) {
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let msnTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}`;
        exibirTexto('h1', 'Parabéns! Você acertou!');
        exibirTexto('p', msnTentativas);
        
        reiniciarBtn.disabled = false; 
    } else if (chute > numeroSecreto) {
        exibirTexto('h1', 'Que pena, você errou!');
        exibirTexto('p', 'O número secreto é menor! Tente novamente.');
    } else {
        exibirTexto('h1', 'Que pena, você errou!');
        exibirTexto('p', 'O número secreto é maior! Tente novamente.');
    }

    tentativas++;
    limparCampo();
}

function limparCampo() {
    let chute = document.querySelector('input');
    chute.value = '';  
    chute.focus();  
}

// Função para reiniciar o jogo
function abrirNovo() {
    listaDeNumerosSorteados = []; 
    numeroSecreto = gerarNumeroAleatorio();  
    tentativas = 1;  
    exibirMsnInicial();
    limparCampo();
    document.querySelector('#reiniciar').disabled = true;
}

// Adicionando o event listener para a tecla Enter
document.querySelector('.container__input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        verificarChute(); 
    }
});

function gerarNumeroAleatorio() {
    if (listaDeNumerosSorteados.length === numeroLimite) {
        alert('Todos os números já foram sorteados! Reiniciando o jogo.');
        abrirNovo();
        return gerarNumeroAleatorio();
    }

    let numeroEscolhido;
    do {
        numeroEscolhido = parseInt(Math.random() * numeroLimite + 1); 
    } while (listaDeNumerosSorteados.includes(numeroEscolhido));

    listaDeNumerosSorteados.push(numeroEscolhido);
    return numeroEscolhido;
}

