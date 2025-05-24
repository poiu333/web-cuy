const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const screenWidth = canvas.width;
const screenHeight = canvas.height;

const biru = "#87cefa";
const hijau = "#00c800";

let birdX = 50;
let birdY = 300;
let birdVelocity = 0;
const gravity = 0.5;
const jumpStrength = -8;
const birdSize = 40;

const pipeWidth = 70;
const pipeGap = 150;
let pipeX = screenWidth;
let pipeHeight = Math.floor(Math.random() * 300) + 100;

let score = 0;
let passedPipe = false;
let gameOver = false;

function resetGame() {
  birdY = 300;
  birdVelocity = 0;
  pipeX = screenWidth;
  pipeHeight = Math.floor(Math.random() * 300) + 100;
  score = 0;
  passedPipe = false;
  gameOver = false;
}

function drawBird() {
  ctx.fillStyle = "#ff0";
  ctx.beginPath();
  ctx.arc(birdX, birdY, birdSize / 2, 0, Math.PI * 2);
  ctx.fill();
}

function drawPipe(x, height, isTop) {
  ctx.fillStyle = hijau;
  if (isTop) {
    ctx.fillRect(x, 0, pipeWidth, height);
  } else {
    ctx.fillRect(x, height, pipeWidth, screenHeight - height);
  }
}

function drawScore() {
  ctx.fillStyle = "#000";
  ctx.font = "32px Arial";
  ctx.fillText("Skor: " + score, 10, 40);
}

function drawGameOver() {
  ctx.fillStyle = "red";
  ctx.font = "48px Arial";
  ctx.fillText("Game Over!", 60, screenHeight / 2 - 20);
  ctx.font = "24px Arial";
  ctx.fillText("Tekan Space untuk ulang", 60, screenHeight / 2 + 20);
}

function update() {
  if (!gameOver) {
    birdVelocity += gravity;
    birdY += birdVelocity;

    pipeX -= 3;
    if (pipeX + pipeWidth < 0) {
      pipeX = screenWidth;
      pipeHeight = Math.floor(Math.random() * 300) + 100;
      passedPipe = false;
    }

    if (pipeX + pipeWidth < birdX && !passedPipe) {
      score++;
      passedPipe = true;
    }

    if (
      birdY - birdSize / 2 < 0 ||
      birdY + birdSize / 2 > screenHeight ||
      (birdX + birdSize / 2 > pipeX &&
        birdX - birdSize / 2 < pipeX + pipeWidth &&
        (birdY - birdSize / 2 < pipeHeight ||
         birdY + birdSize / 2 > pipeHeight + pipeGap))
    ) {
      gameOver = true;
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, screenWidth, screenHeight);
  ctx.fillStyle = biru;
  ctx.fillRect(0, 0, screenWidth, screenHeight);

  drawPipe(pipeX, pipeHeight, true);
  drawPipe(pipeX, pipeHeight + pipeGap, false);
  drawBird();
  drawScore();

  if (gameOver) {
    drawGameOver();
  }
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

window.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    if (gameOver) {
      resetGame();
    } else {
      birdVelocity = jumpStrength;
    }
  }
});

gameLoop();
