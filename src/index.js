import './index.scss';
import SenseiWalk from './assets/Female-2-Walk.png';

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const spriteW = 48;
const spriteH = 48;
const shots = 3;
let cycle = 0;
let pY = canvas.height / 2 - 48;
let pX = canvas.width / 2 - 48;
let downPressed = false;
let upPressed = false;
let rightPressed = false;
let leftPressed = false;
let view = 0;

function keyDownHandler(e) {
  if (e.key === 'Down' || e.key === 'ArrowDown') {
    downPressed = true;
  }
  if (e.key === 'Up' || e.key === 'ArrowUp') {
    upPressed = true;
  }
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = true;
  }
  if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key === 'Down' || e.key === 'ArrowDown') {
    downPressed = false;
  }
  if (e.key === 'Up' || e.key === 'ArrowUp') {
    upPressed = false;
  }
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = false;
  }
  if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = false;
  }
}

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

const img = document.createElement('img');
img.src = SenseiWalk;

function moveLimiter() {
    if (pY + 48 > canvas.height) {
        pY = canvas.height - 48;
    }
    if (pX + 48 > canvas.width) {
        pX = canvas.width - 48;
    }
    if (pY < 0) {
        pY = 0;
    }
    if (pX < 0) {
        pX = 0;
    }
}

img.addEventListener('load', () => {
  setInterval(() => {
    if (downPressed) {
      pY += 10;
      cycle = (cycle + 1) % shots;
      view = 0;
    }
    if (upPressed) {
      pY -= 10;
      cycle = (cycle + 1) % shots;
      view = 144;
    }
    if (rightPressed) {
      pX += 10;
      cycle = (cycle + 1) % shots;
      view = 96;
    }
    if (leftPressed) {
      pX -= 10;
      cycle = (cycle + 1) % shots;
      view = 48;
    }

    moveLimiter();

    ctx.clearRect(0, 0, 600, 600);
    ctx.drawImage(img, cycle * spriteW, view, spriteW, spriteH, pX, pY, 48, 48);
  }, 80);
});

