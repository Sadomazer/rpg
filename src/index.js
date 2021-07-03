import './index.scss';
import SenseiWalk from './assets/Female-2-Walk.png';

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const spriteW = 48;
const spriteH = 48;
const shots = 3;
const step = 10;
const charSide = {
  down: 0,
  up: 144,
  right: 96,
  left: 48,
};
let view = charSide.down;
let cycle = 0;
let pY = canvas.height / 2 - spriteH;
let pX = canvas.width / 2 - spriteW;
let downPressed = false;
let upPressed = false;
let rightPressed = false;
let leftPressed = false;

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
  if (pY + spriteH > canvas.height) {
    pY = canvas.height - spriteH;
  }
  if (pX + spriteW > canvas.width) {
    pX = canvas.width - spriteW;
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
      pY += step;
      view = charSide.down;
    }
    if (upPressed) {
      pY -= step;
      view = charSide.up;
    }
    if (rightPressed) {
      pX += step;
      view = charSide.right;
    }
    if (leftPressed) {
      pX -= step;
      view = charSide.left;
    }

    cycle = (cycle + 1) % shots;
    moveLimiter();

    ctx.clearRect(0, 0, 600, 600);
    ctx.drawImage(img, cycle * spriteW, view, spriteW, spriteH, pX, pY, spriteH, spriteW);
  }, 80);
});
