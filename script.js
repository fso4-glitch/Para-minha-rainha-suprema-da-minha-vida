const inicio = document.getElementById("inicio");
const jogo = document.getElementById("jogo");
const final = document.getElementById("final");

const btnComecar = document.getElementById("btnComecar");
const puzzle = document.getElementById("puzzle");
const musica = document.getElementById("musica");

const tamanho = 3;
let pecas = [];
let selecionada = null;

btnComecar.addEventListener("click", () => {
    inicio.classList.add("oculto");
    jogo.classList.remove("oculto");

    criarPuzzle();
});

function criarPuzzle(){

    puzzle.innerHTML = "";
    pecas = [];

    for(let i=0;i<9;i++){

        pecas.push(i);

    }

    embaralhar();

    desenhar();

}

function embaralhar(){

    for(let i=pecas.length-1;i>0;i--){

        let j = Math.floor(Math.random()*(i+1));

        [pecas[i],pecas[j]]=[pecas[j],pecas[i]];

    }

}

function desenhar(){

    puzzle.innerHTML="";

    pecas.forEach((valor,posicao)=>{

        const div=document.createElement("div");

        div.className="peca";

        let x=(valor%3)*50;
        let y=Math.floor(valor/3)*50;

        div.style.backgroundImage="url('foto.jpg')";
        div.style.backgroundPosition=`${x}% ${y}%`;

        div.onclick=()=>clicou(posicao);

        puzzle.appendChild(div);

    });

}

function clicou(posicao){

    if(selecionada===null){

        selecionada=posicao;

        puzzle.children[posicao].style.border="4px solid yellow";

        return;

    }

    [pecas[selecionada],pecas[posicao]]=[pecas[posicao],pecas[selecionada]];

    selecionada=null;

    desenhar();

    verificar();

}

function verificar(){

    for(let i=0;i<9;i++){

        if(pecas[i]!=i){

            return;

        }

    }

    terminou();

}

function terminou(){

    jogo.classList.add("oculto");

    final.classList.remove("oculto");

    musica.play();

    chuvaCoracoes();

}

function chuvaCoracoes(){

    setInterval(()=>{

        const c=document.createElement("div");

        c.className="coracao";

        c.innerHTML="❤️";

        c.style.left=Math.random()*100+"vw";

        c.style.bottom="-20px";

        c.style.fontSize=(20+Math.random()*40)+"px";

        document.body.appendChild(c);

        setTimeout(()=>{

            c.remove();

        },5000);

    },250);

}