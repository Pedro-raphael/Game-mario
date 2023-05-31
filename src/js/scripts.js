const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');

// colocar altura aleatória no cano
pipe.style.height = pegarAlturaAleatoria();

const jump = () => {
  mario.classList.add('jump');

  setTimeout(() => {
    mario.classList.remove('jump');
  }, 500);
};

function pegarAlturaAleatoria() {
  CANO_ALTO = '110px';
  CANO_MEDIO = '85px';
  CANO_BAIXO = '50px';

  // Criar essa lista é importante pra escolher a altura aleatória
  let alturas = [CANO_ALTO, CANO_MEDIO, CANO_BAIXO];

  // Pega um número aleatório entre 0 e o número de alturas
  let alturaEscolhida = Math.floor(Math.random() * alturas.length);

  // Retorna o valor referente à altura escohida
  return alturas[alturaEscolhida];
}

const loop = setInterval(() => {
  console.log('loop');
  const pipePosition = pipe.offsetLeft;
  const marioPosition = +window
    .getComputedStyle(mario)
    .bottom.replace('px', ' ');

  // Pega a altura atual do cano. Ela é usada pra checar se o Mário bateu no cano ou não
  const alturaDoCano = pipe.getBoundingClientRect().height;

  if (pipePosition <= 120 && pipePosition > 0 && marioPosition < alturaDoCano) {
    pipe.style.animation = 'none';
    pipe.style.left = `${pipePosition}px`;

    mario.style.animation = 'none';
    mario.style.bottom = `${marioPosition}px`;

    mario.src = './src/imagens/game-over.png';
    mario.style.width = '75px';
    mario.style.marginLeft = '50px';
    clearInterval(loop);
  }

  // Caso o cano saia da tela, muda a altura do cano
  if (pipe.getBoundingClientRect().right < 10) {
    pipe.style.height = pegarAlturaAleatoria();
  }
}, 10);

document.addEventListener('keydown', jump);
