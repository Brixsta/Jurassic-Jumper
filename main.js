import Caveman from "./Caveman.js";
import Platform from "./Platform.js";
import World from "./World.js";
import { setupResponsiveScaling } from "./responsive.js";
import { startGameLoop } from "./gameloop.js";
import { updateGameObjects } from "./update.js";
import { drawGameObjects } from "./drawGameObjects.js";

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

// Create Platform
const plat1 = new Platform(
  0,
  world.canvasBaseHeight - 30,
  world.canvasBaseWidth * 2,
  30,
  "green",
);
const plat2 = new Platform(world.canvasBaseWidth * 2, 300, 300, 100, "blue");

// Create Player
const player = new Caveman(
  0,
  // world.canvasBaseHeight - world.cavemanBaseHeight,
  world.canvasBaseHeight - plat2.height,
  world.cavemanBaseWidth,
  world.cavemanBaseHeight,
  cavemanSprites,
);

// Update Game Objects
const update = (deltaTime) => {
  updateGameObjects(player, platforms, deltaTime);
};
// Create Platforms array
const platforms = [plat1, plat2];

// Apply Responsive Scaling
setupResponsiveScaling(canvas, world, player, platforms, ctx);

// Draw Objects on Canvas
const draw = () => {
  drawGameObjects(ctx, canvas, player, platforms);
};

// Start Game
startGameLoop(update, draw);
