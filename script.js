const puzzle = document.getElementById("puzzle");
const musica = document.getElementById("musica");
const declaracao = document.getElementById("declaracao");
const texto = document.getElementById("textoDigitando");

musica.style.display = "none";
declaracao.style.display = "none";

const correto = [
    "0% 0%",
    "50% 0%",
    "100% 0%",
    "0% 50%",
    "50% 50%",
    "100% 50%",
    "0% 100%",
    "50% 100%",
    "100% 100%"
];

// ======================
// Criar peças
// ======================

correto.forEach(pos => {

    const div = document.createElement("div");

    div.className = "piece";

    div.style.backgroundPosition = pos;

    div.draggable = true;

    puzzle.appendChild(div);

});

// ======================
// Embaralhar
// ======================

function embaralhar(){

    const pieces = document.querySelectorAll(".piece");

    let posicoes=[];

    pieces.forEach(p=>{

        posicoes.push(p.style.backgroundPosition);

    });

    for(let i=posicoes.length-1;i>0;i--){

        const j=Math.floor(Math.random()*(i+1));

        [posicoes[i],posicoes[j]]=[posicoes[j],posicoes[i]];

    }

    pieces.forEach((p,i)=>{

        p.style.backgroundPosition=posicoes[i];

    });

}

// ======================
// Trocar
// ======================

function trocar(a,b){

    let temp=a.style.backgroundPosition;

    a.style.backgroundPosition=b.style.backgroundPosition;

    b.style.backgroundPosition=temp;

    verificar();

}

// ======================
// Verificar
// ======================

function verificar(){

    const pieces=document.querySelectorAll(".piece");

    let ok=true;

    pieces.forEach((p,i)=>{

        if(p.style.backgroundPosition!==correto[i]){

            ok=false;

        }

    });

    if(ok){

        finalizar();

    }

}

// ======================
// Final
// ======================

function finalizar(){

    criarCoracoes();

    declaracao.style.display="block";

    musica.style.display="block";

    musica.play().catch(()=>{});

    escreverTexto();

    window.scrollTo({

        top:document.body.scrollHeight,

        behavior:"smooth"

    });

}

// ======================
// Digitação
// ======================

function escreverTexto(){

    const completo=texto.innerText;

    texto.innerHTML="";

    let i=0;

    const timer=setInterval(()=>{

        texto.innerHTML+=completo.charAt(i);

        i++;

        if(i>=completo.length){

            clearInterval(timer);

        }

    },28);

}

// ======================
// Corações
// ======================

function criarCoracoes(){

    for(let i=0;i<40;i++){

        const heart=document.createElement("div");

        heart.className="heart";

        heart.innerHTML="❤️";

        heart.style.left=Math.random()*100+"vw";

        heart.style.animationDuration=(3+Math.random()*2)+"s";

        document.body.appendChild(heart);

        setTimeout(()=>{

            heart.remove();

        },5000);

    }

}

// ======================
// Mouse
// ======================

let arrastando=null;

document.addEventListener("DOMContentLoaded",()=>{

    const pieces=document.querySelectorAll(".piece");

    pieces.forEach(piece=>{

        piece.addEventListener("dragstart",()=>{

            arrastando=piece;

        });

        piece.addEventListener("dragover",(e)=>{

            e.preventDefault();

        });

        piece.addEventListener("drop",()=>{

            if(arrastando && arrastando!==piece){

                trocar(arrastando,piece);

            }

        });

        // Mobile

        piece.addEventListener("touchstart",()=>{

            arrastando=piece;

        });

        piece.addEventListener("touchend",(e)=>{

            const touch=e.changedTouches[0];

            const alvo=document.elementFromPoint(touch.clientX,touch.clientY);

            if(alvo && alvo.classList.contains("piece") && alvo!==arrastando){

                trocar(arrastando,alvo);

            }

        });

    });

});

// ======================
// Começar
// ======================

function comecar(){

    document.getElementById("inicio").style.display="none";

    document.getElementById("conteudo").style.display="block";

    embaralhar();

}

// ======================
// Iniciar
// ======================

window.onload=()=>{

    embaralhar();

};