import Caveman from "./Caveman.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const cavemanRunning = new Image();
cavemanRunning.src = "./images/Caveman_Run.png";

const cavemanJumping = new Image();
cavemanJumping.src = "./images/Caveman_Jump.png";

const cavemanSprites = {
  running: cavemanRunning,
  jumping: cavemanJumping,
};

ctx.imageSmoothingEnabled = true;

// Constants
const BASE_WIDTH = 360;
const BASE_HEIGHT = 640;
const CAVEMAN_WIDTH = BASE_WIDTH * 0.3;
const CAVEMAN_HEIGHT = BASE_WIDTH * 0.3;

// Create Player
const player = new Caveman(0, 0, CAVEMAN_WIDTH, CAVEMAN_HEIGHT, cavemanSprites);

// Main Game Loop
let last = 0;
const gameLoop = (time) => {
  let deltaTime = (time - last) / 1000; // Seconds since last frame update
  last = time;
  update(deltaTime);
  draw();
  requestAnimationFrame(gameLoop);
};

// Update Objects
const update = (deltaTime) => {
  player.update(deltaTime);
};

// Responsive scaling
const resize = () => {
  const scaleX = window.innerWidth / BASE_WIDTH;
  const scaleY = window.innerHeight / BASE_HEIGHT;
  const scale = Math.min(scaleX, scaleY);

  canvas.width = BASE_WIDTH * scale;
  canvas.height = BASE_HEIGHT * scale;

  // Scale Character, Gravity, JumpStrength, and Ground Level
  player.applyScaling(scale);
};

window.onresize = resize;
resize(); // call initially

// Render
const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  player.draw(ctx);
};

//Start when sprite is ready
cavemanRunning.onload = () => {
  requestAnimationFrame(gameLoop);
};
