var altura = 0
var largura = 0
var vidas = 3
var tempo = 30
var criaMosquitoTempo = 2000

var nivel = window.location.search
nivel = nivel.replace('?','')

if(nivel === 'easy') {
    // Fácil
    criaMosquitoTempo = 2000
} else if(nivel === 'medium') {
    // Médio
    criaMosquitoTempo = 1500
} else if(nivel === 'hard') {
    // Dificil
    criaMosquitoTempo = 1000
} else if(nivel === 'impossible') {
    // Impossível
    criaMosquitoTempo = 750
}

function ajustaTamanhoPalcoJogo(){
    altura = window.innerHeight
    largura = window.innerWidth

    console.log(altura, largura)
}

ajustaTamanhoPalcoJogo()

var cronometro = setInterval(function(){
    tempo--
    if(tempo < 0) {
        clearInterval(cronometro)
        clearInterval(criaMosquito)
        window.location.href = 'victory.html'
    } else {
        document.getElementById('timer').innerHTML = tempo
    }
        
}, 1000)

function posicaoRandomica() {
    // Remover mosquito
    if(document.getElementById('mosquito')){
        document.getElementById('mosquito').remove()

        if(vidas > 0){
            document.getElementById('v' + vidas).src="images/coracao_vazio.png"
            vidas--
        } else {
            window.location.href = 'game_over.html'
        }
    } 

    var posicaoX = Math.floor(Math.random() * largura) - 90
    var posicaoY = Math.floor(Math.random() * altura) - 90

    posicaoX = posicaoX < 0 ? 0 : posicaoX
    posicaoY = posicaoY < 0 ? 0 : posicaoY

    console.log(posicaoY, posicaoX)

    // Criação do mosquito na tela
    var mosquito = document.createElement('img')
    mosquito.src = 'images/mosquito.png'
    mosquito.className = tamanhoAleatorio() + ' ' + ladoAleatorio()
    mosquito.style.left = posicaoX + 'px'
    mosquito.style.top = posicaoY + 'px'
    mosquito.style.position = 'absolute'
    mosquito.id = 'mosquito'
    mosquito.onclick = function() {
        this.remove()
    }

    document.body.appendChild(mosquito)

}

function tamanhoAleatorio() {
    var classe = Math.floor(Math.random() * 3)

    switch(classe) {
        case 0:
            return 'mosquito1'
        
        case 1:
            return 'mosquito2'

        case 2:
            return 'mosquito3'
    }
}

function ladoAleatorio() {
    var lado = Math.floor(Math.random() * 2)

    switch(lado) {
        case 0:
            return 'ladoA'

        case 1:
            return 'ladoB'
    }
}