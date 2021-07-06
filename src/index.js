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
const charCoordinate = {
  pY: canvas.height / 2 - spriteH,
  pX: canvas.width / 2 - spriteW,
};
const keyPressed = {
  downPressed: false,
  upPressed: false,
  rightPressed: false,
  leftPressed: false,
};
let buttonPressed = false;

let keyFirst = 0;
let keySecond = 0;

function keyDownHandler(e) {
  if (e.key === 'Down' || e.key === 'ArrowDown') {
    keyPressed.downPressed = true;
  }
  if (e.key === 'Up' || e.key === 'ArrowUp') {
    keyPressed.upPressed = true;
  }
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    keyPressed.rightPressed = true;
  }
  if (e.key === 'Left' || e.key === 'ArrowLeft') {
    keyPressed.leftPressed = true;
  }

  buttonPressed = true;

  if (e.key === 'Right' || e.key === 'ArrowRight') keyFirst = 1;
  else if (e.key === 'Left' || e.key === 'ArrowLeft') keySecond = 1;
  if (keyFirst && keySecond) {
    buttonPressed = false;
  }
}

function keyUpHandler(e) {
  if (e.key === 'Down' || e.key === 'ArrowDown') {
    keyPressed.downPressed = false;
  }
  if (e.key === 'Up' || e.key === 'ArrowUp') {
    keyPressed.upPressed = false;
  }
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    keyPressed.rightPressed = false;
  }
  if (e.key === 'Left' || e.key === 'ArrowLeft') {
    keyPressed.leftPressed = false;
  }

  keyFirst = 0;
  keySecond = 0;

  buttonPressed = false;
}

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

const img = document.createElement('img');
img.src = SenseiWalk;

function moveLimiter() {
  if (charCoordinate.pY + spriteH > canvas.height) {
    charCoordinate.pY = canvas.height - spriteH;
  }
  if (charCoordinate.pX + spriteW > canvas.width) {
    charCoordinate.pX = canvas.width - spriteW;
  }
  if (charCoordinate.pY < 0) {
    charCoordinate.pY = 0;
  }
  if (charCoordinate.pX < 0) {
    charCoordinate.pX = 0;
  }
}

img.addEventListener('load', () => {
  setInterval(() => {
    if (keyPressed.downPressed) {
      charCoordinate.pY += step;
      view = charSide.down;
    }
    if (keyPressed.upPressed) {
      charCoordinate.pY -= step;
      view = charSide.up;
    }
    if (keyPressed.rightPressed) {
      charCoordinate.pX += step;
      view = charSide.right;
    }
    if (keyPressed.leftPressed) {
      charCoordinate.pX -= step;
      view = charSide.left;
    }

    if (buttonPressed) {
      cycle = (cycle + 1) % shots;
    }

    moveLimiter();

    ctx.clearRect(0, 0, 600, 600);
    ctx.drawImage(img, cycle * spriteW, view, spriteW, spriteH, charCoordinate.pX, charCoordinate.pY, spriteH, spriteW);
  }, 80);
});
