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

function escreverTexto() {

    const paragrafos = Array.from(texto.querySelectorAll("p"));

    const textos = paragrafos.map(p => p.textContent);

    paragrafos.forEach(p => {
        p.textContent = "";
    });

    let indice = 0;

    function escreverParagrafo() {

        if (indice >= paragrafos.length) return;

        const p = paragrafos[indice];
        const conteudo = textos[indice];

        let letra = 0;

        const timer = setInterval(() => {

            p.textContent += conteudo.charAt(letra);
            letra++;

            // Faz a tela acompanhar a escrita
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: "smooth"
            });

            if (letra >= conteudo.length) {

                clearInterval(timer);

                indice++;

                setTimeout(escreverParagrafo, 800);

            }

        }, 40);

    }

    escreverParagrafo();

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
// ❤️ CONTADOR
// ======================

// ALTERE PARA A DATA QUE VCS COMEÇARAM A NAMORAR
const dataNamoro = new Date("2026-06-11T20:00:00");

function atualizarContador() {

    const contador = document.getElementById("tempoJuntos");

    if (!contador) return;

    const agora = new Date();

    let diff = agora - dataNamoro;

    const dias = Math.floor(diff / (1000 * 60 * 60 * 24));

    const horas = Math.floor((diff / (1000 * 60 * 60)) % 24);

    const minutos = Math.floor((diff / (1000 * 60)) % 60);

    const segundos = Math.floor((diff / 1000) % 60);

    const meses = Math.floor(dias / 30);

    const restoDias = dias % 30;

    contador.innerHTML = `
        <strong>${meses}</strong> mês(es)<br>
        <strong>${restoDias}</strong> dia(s)<br>
        <strong>${horas}</strong> hora(s)<br>
        <strong>${minutos}</strong> minuto(s)<br>
        <strong>${segundos}</strong> segundo(s)
    `;

}

setInterval(atualizarContador, 1000);
atualizarContador();


// ======================
// 🎵 FADE DA MÚSICA
// ======================

function tocarMusicaSuave() {

    musica.volume = 0;

    musica.play().catch(() => {});

    let volume = 0;

    const fade = setInterval(() => {

        volume += 0.02;

        if (volume >= 1) {

            volume = 1;

            clearInterval(fade);

        }

        musica.volume = volume;

    }, 120);

}

// ======================
// 🌌 FUNDO ESTRELADO
// ======================

const canvasEstrelas = document.getElementById("estrelas");

if (canvasEstrelas) {

    const ctx = canvasEstrelas.getContext("2d");

    function ajustarCanvas() {
        canvasEstrelas.width = window.innerWidth;
        canvasEstrelas.height = window.innerHeight;
    }

    ajustarCanvas();
    window.addEventListener("resize", ajustarCanvas);

    const estrelas = [];

    for (let i = 0; i < 120; i++) {

        estrelas.push({
            x: Math.random() * canvasEstrelas.width,
            y: Math.random() * canvasEstrelas.height,
            r: Math.random() * 2 + 0.5,
            a: Math.random(),
            v: Math.random() * 0.02 + 0.005
        });

    }

    function desenharEstrelas() {

        ctx.clearRect(0, 0, canvasEstrelas.width, canvasEstrelas.height);

        estrelas.forEach(e => {

            e.a += e.v;

            if (e.a >= 1 || e.a <= 0.2) {
                e.v *= -1;
            }

            ctx.beginPath();
            ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255,255,255,${e.a})`;
            ctx.fill();

        });

        requestAnimationFrame(desenharEstrelas);

    }

    desenharEstrelas();

}

// ======================
// 💌 CORAÇÕES ESCONDIDOS
// ======================

document.querySelectorAll(".coracao-segredo").forEach(coracao => {

    coracao.addEventListener("click", () => {

        alert(coracao.dataset.msg);

        coracao.style.transform = "scale(1.5)";

        setTimeout(() => {
            coracao.style.transform = "scale(1)";
        }, 300);

    });

});

// ======================
// 🤍 ABRIR MEU CORAÇÃO
// ======================

function mostrarBotaoCoracao() {

    const abrir = document.getElementById("abrirCoracao");

    if (abrir) {
        abrir.style.display = "block";
    }

}

const botao = document.getElementById("btnCoracao");

if (botao) {

    botao.addEventListener("click", () => {

        document.getElementById("mensagemSurpresa").style.display = "block";

        document.getElementById("pedido").style.display = "block";

        botao.style.display = "none";

        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth"
        });

    });

}

// ======================
// 💍 PEDIDO SIMBÓLICO
// ======================

const btnPromessa = document.getElementById("btnPromessa");

if (btnPromessa) {

    let etapa = 0;

    btnPromessa.addEventListener("click", () => {

        if (etapa === 0) {

            document.getElementById("respostaPromessa").style.display = "block";

            btnPromessa.innerHTML = "❤️ Eu prometo";

            etapa++;

            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: "smooth"
            });

        } else {

            document.getElementById("segundaResposta").style.display = "block";

            btnPromessa.style.display = "none";

            iniciarFinal();

            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: "smooth"
            });

        }

    });

}

// ======================
// 🎬 FINAL CINEMATOGRÁFICO
// ======================

function iniciarFinal() {

    const final = document.getElementById("finalCinema");
    const frase = document.getElementById("fraseFinal");

    if (!final || !frase) return;

    const mensagens = [

        "❤️ Esse foi só o nosso primeiro mês...",

        "E eu já tenho ctz de uma coisa...",

        "Qro viver todos os outros ao seu lado. ❤️",

        "Eu te amo infinitamente, minha Vitorinha. ❤️"

    ];

    let indice = 0;

    setTimeout(() => {

        final.style.display = "flex";

        mostrarMensagem();

    }, 2500);

    function mostrarMensagem() {

        frase.style.opacity = "0";

        setTimeout(() => {

            frase.innerHTML = mensagens[indice];

            frase.style.opacity = "1";

            indice++;

            if (indice < mensagens.length) {

                setTimeout(mostrarMensagem, 2500);

            } else {

                chuvaFinal();

            }

        }, 500);

    }

}

// ======================
// ❤️ CHUVA FINAL
// ======================

function chuvaFinal() {

    const intervalo = setInterval(() => {

        const heart = document.createElement("div");

        heart.innerHTML = "❤️";

        heart.className = "heart";

        heart.style.left = Math.random() * 100 + "vw";

        heart.style.fontSize = (20 + Math.random() * 20) + "px";

        heart.style.animationDuration = (4 + Math.random() * 2) + "s";

        document.body.appendChild(heart);

        setTimeout(() => {

            heart.remove();

        }, 6000);

    }, 250);

    setTimeout(() => {

        clearInterval(intervalo);

    }, 10000);

}const puzzle = document.getElementById("puzzle");
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

function escreverTexto() {

    const paragrafos = Array.from(texto.querySelectorAll("p"));

    const textos = paragrafos.map(p => p.textContent);

    paragrafos.forEach(p => {
        p.textContent = "";
    });

    let indice = 0;

    function escreverParagrafo() {

        if (indice >= paragrafos.length) return;

        const p = paragrafos[indice];
        const conteudo = textos[indice];

        let letra = 0;

        const timer = setInterval(() => {

            p.textContent += conteudo.charAt(letra);
            letra++;

            // Faz a tela acompanhar a escrita
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: "smooth"
            });

            if (letra >= conteudo.length) {

                clearInterval(timer);

                indice++;

                setTimeout(escreverParagrafo, 800);

            }

        }, 40);

    }

    escreverParagrafo();

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