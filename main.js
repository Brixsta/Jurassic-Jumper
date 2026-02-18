import Caveman from "./Caveman.js";
import Platform from "./Platform.js";
import World from "./World.js";

const world = World;

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

// Create Player
const player = new Caveman(
  0,
  world.canvasBaseHeight - world.cavemanBaseHeight,
  world.cavemanBaseWidth,
  world.cavemanBaseHeight,
  cavemanSprites,
);

// Create Platform
const plat1 = new Platform(canvas.width - 100, 600, 300, 100, player);

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
  plat1.update(deltaTime);
};

// Responsive scaling
const resize = () => {
  const scaleX = window.innerWidth / world.canvasBaseWidth;
  const scaleY = window.innerHeight / world.canvasBaseHeight;
  const scale = Math.min(scaleX, scaleY);

  canvas.width = world.canvasBaseWidth * scale;
  canvas.height = world.canvasBaseHeight * scale;

  // Scale Character, Gravity, JumpStrength, and Ground Level
  player.scalePlayer(scale);

  // Scale Platform X, Y, Width, And Height
  plat1.scalePlatform(scale);

  plat1.scaled = true;
};

window.onresize = resize;
resize(); // call initially

// Render
const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  player.draw(ctx);
  plat1.draw(ctx);
};

//Start when sprite is ready
cavemanRunning.onload = () => {
  requestAnimationFrame(gameLoop);
};
