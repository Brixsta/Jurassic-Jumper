import Caveman from "./Caveman.js";
import Platform from "./Platform.js";
import World from "./World.js";
import AssetLoader from "./AssetLoader.js";
import { handlePlayerPlatformCollision } from "./helpers.js";

const world = World;
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const assetLoader = new AssetLoader();
assetLoader
  .loadAllImages([
    { key: "cavemanRunning", src: "./images/Caveman_Run.png" },
    { key: "cavemanJumping", src: "./images/Caveman_Jump.png" },
  ])
  .then(() => {
    console.log("ASSETS LOADED!");

    const cavemanSprites = {
      running: assetLoader.getImage("cavemanRunning"),
      jumping: assetLoader.getImage("cavemanJumping"),
    };

    // Platforms
    const plat1 = new Platform(
      0,
      world.canvasBaseHeight - 30,
      world.canvasBaseWidth * 2,
      30,
      "green",
    );
    const plat2 = new Platform(
      world.canvasBaseWidth * 2,
      300,
      300,
      100,
      "blue",
    );
    const platforms = [plat1, plat2];

    // Player
    const player = new Caveman(
      0,
      world.canvasBaseHeight - plat2.height,
      world.cavemanBaseWidth,
      world.cavemanBaseHeight,
      cavemanSprites,
    );

    // Responsive scaling
    const resize = () => {
      const scale = Math.min(
        window.innerWidth / world.canvasBaseWidth,
        window.innerHeight / world.canvasBaseHeight,
      );
      canvas.width = world.canvasBaseWidth * scale;
      canvas.height = world.canvasBaseHeight * scale;

      player.scalePlayer(scale);
      platforms.forEach((p) => p.scalePlatform(scale));
    };
    window.onresize = resize;
    resize();

    // Update
    const updateGameObjects = (deltaTime) => {
      player.update(deltaTime);
      player.onPlatform = false;

      for (let p of platforms) {
        p.update(deltaTime);
        handlePlayerPlatformCollision(player, p);
      }
    };

    // Draw
    const drawGameObjects = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      player.draw(ctx);
      platforms.forEach((p) => p.draw(ctx));
    };

    let last = performance.now();
    const gameLoop = (time) => {
      const MAX_DELTA = 0.05;
      let deltaTime = (time - last) / 1000;
      deltaTime = Math.min(deltaTime, MAX_DELTA);
      last = time;
      updateGameObjects(deltaTime);
      drawGameObjects();
      requestAnimationFrame(gameLoop);
    };
    requestAnimationFrame(gameLoop);
  })
  .catch((err) => console.error("Failed to load assets!", err));
