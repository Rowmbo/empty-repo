// game.js
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Character properties
const player = {
  x: 100,
  y: canvas.height - 150,
  width: 50,
  height: 50,
  speed: 5,
  dx: 0,
  dy: 0,
  gravity: 0.8,
  jumpPower: -15,
  grounded: false,
};

// Platform properties
const platforms = [
  { x: 0, y: canvas.height - 50, width: canvas.width, height: 50 }, // Ground platform
  { x: 200, y: canvas.height - 200, width: 200, height: 20 }, // Floating platform
  { x: 500, y: canvas.height - 300, width: 200, height: 20 },
];

// Input handling
let rightPressed = false;
let leftPressed = false;
let upPressed = false;

// Event listeners for key presses
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function keyDownHandler(e) {
  if (e.key === "Right" || e.key === "ArrowRight") {
    rightPressed = true;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    leftPressed = true;
  } else if (e.key === "Up" || e.key === "ArrowUp") {
    upPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key === "Right" || e.key === "ArrowRight") {
    rightPressed = false;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    leftPressed = false;
  } else if (e.key === "Up" || e.key === "ArrowUp") {
    upPressed = false;
  }
}

// Check for collision with platforms
function checkPlatformCollision() {
  player.grounded = false;

  for (let platform of platforms) {
    if (
      player.x + player.width > platform.x &&
      player.x < platform.x + platform.width &&
      player.y + player.height <= platform.y &&
      player.y + player.height + player.dy >= platform.y
    ) {
      player.dy = 0;
      player.y = platform.y - player.height;
      player.grounded = true;
      break;
    }
  }
}

// Move player
function movePlayer() {
  if (rightPressed) {
    player.dx = player.speed;
  } else if (leftPressed) {
    player.dx = -player.speed;
  } else {
    player.dx = 0;
  }

  if (upPressed && player.grounded) {
    player.dy = player.jumpPower;
  }

  player.x += player.dx;
  player.y += player.dy;
  player.dy += player.gravity;

  if (player.x < 0) player.x = 0;
  if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
}

// Draw player
function drawPlayer() {
  ctx.fillStyle = "red";
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Draw platforms
function drawPlatforms() {
  ctx.fillStyle = "green";
  for (let platform of platforms) {
    ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
  }
}

// Game loop
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  movePlayer();
  checkPlatformCollision();
  drawPlatforms();
  drawPlayer();

  requestAnimationFrame(gameLoop);
}

// Start the game
gameLoop();
