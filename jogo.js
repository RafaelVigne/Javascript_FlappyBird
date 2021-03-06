console.log('[DevSoutinho] Flappy Bird');
console.log('Inscreva-se no canal :D https://www.youtube.com/channel/UCzR2u5RWXWjUh7CwLSvbitA');

//cmm
const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

//chao
const chao = {
    spriteX: 0,
    spriteY: 610,
    largura: 224,
    altura: 112,
    x: 0,
    y: canvas.height - 112,
        desenha() {
            contexto.drawImage(
                sprites,
                chao.spriteX,chao.spriteY,
                chao.largura,chao.altura, 
                chao.x, chao.y, 
                chao.largura,chao.altura 
            );
            contexto.drawImage(
            sprites,
            chao.spriteX,chao.spriteY,
            chao.largura,chao.altura, 
            (chao.x + chao.largura), chao.y, 
            chao.largura,chao.altura 
            )
        } 
}

//fundo
const background = {
    spriteX: 390,
    spriteY: 0,
    largura: 275,
    altura: 204,
    x: 0,
    y: canvas.height - 204,
        desenha() {
            contexto.fillStyle = '#70c5ce'
            contexto.fillRect (0,0,canvas.height,canvas.width)

            contexto.drawImage(
                sprites,
                background.spriteX,background.spriteY,
                background.largura,background.altura, 
                background.x, background.y, 
                background.largura,background.altura 
            );
            contexto.drawImage(
            sprites,
            background.spriteX,background.spriteY,
            background.largura,background.altura, 
            (background.x + background.largura), background.y, 
            background.largura,background.altura 
            )
        } 
        
}

//flappy bird
function fazColisao(flappyBird,chao){
    const flappyBirdY = flappyBird.y + flappyBird.altura;
    const chaoY = chao.y

    if (flappyBirdY >= chaoY){
        return true;
    }
    return false;
}

function criaFlappyBird(){
    const flappyBird = {
        spriteX: 0,
        spriteY: 0,
        largura: 33,
        altura: 24,
        x: 10,
        y: 50,
        gravidade: 0.25,
        velocidade: 0,
        pulo: 4.6,
            pula(){
                flappyBird.velocidade = -flappyBird.pulo;
            },  
            atualiza(){
                if(fazColisao(flappyBird,chao)){
                    console.log('fez colisao');
        
                    mudaDeTela(Telas.INICIO);
                    return;
                }
                flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
                console.log(flappyBird.velocidade);
                flappyBird.y = flappyBird.y + flappyBird.velocidade;
            },
            desenha() {
                contexto.drawImage(
                    sprites,
                    flappyBird.spriteX,flappyBird.spriteY, //Sprite X e Sprite Y
                    flappyBird.largura,flappyBird.altura, //Altura e largura
                    flappyBird.x, flappyBird.y,  // Onde vai aparecer a imagem
                    flappyBird.largura,flappyBird.altura // Tamanho do Sprite dentro do canvas
                );
                
            }
        
        }
        return flappyBird;
    }




// Telas
const getReady = {
    spriteX: 134,
    spriteY: 0,
    largura: 174,
    altura: 152,
    x: (canvas.width / 2) - 174 / 2,
    y: 50,
        desenha() {
            contexto.drawImage(
                sprites,
                getReady.spriteX,getReady.spriteY,
                getReady.largura,getReady.altura, 
                getReady.x, getReady.y, 
                getReady.largura,getReady.altura 
            );

        } 
}


const globais = {};
let TelaAtiva = {};


function mudaDeTela(novaTela){
    TelaAtiva = novaTela;
    if(TelaAtiva.inicializa) {
        TelaAtiva.inicializa();
      }
    }

const Telas = {
 INICIO: {
    inicializa(){
         globais.flappyBird = criaFlappyBird();
     },
     desenha(){
        globais.flappyBird.desenha();
        background.desenha();
        chao.desenha();
        getReady.desenha();
    
        
     },

     click(){
        mudaDeTela(Telas.JOGO)
     },
     atualiza(){

     }
 }
};

Telas.JOGO = {
    desenha(){
        background.desenha();
        chao.desenha();
        globais.flappyBird.desenha();
    },
    click(){
        globais.flappyBird.pula();
    },
    atualiza(){
        globais.flappyBird.atualiza();
    }
};


// Forçando FPS
function loop() {
    TelaAtiva.desenha();
    TelaAtiva.atualiza();
 
    requestAnimationFrame(loop);
};

window.addEventListener('click', function(){
    if(TelaAtiva.click){
        TelaAtiva.click();
    }
})

mudaDeTela(Telas.INICIO)

loop();

