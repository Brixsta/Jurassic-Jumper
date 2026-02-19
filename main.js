import Caveman from "./Caveman.js";
import Platform from "./Platform.js";
import World from "./World.js";
import AssetLoader from "./AssetLoader.js";
import { handleStartGame } from "./start.js";
import { handleResponsiveScaling } from "./responsive.js";

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
    const cavemanSprites = {
      running: assetLoader.getImage("cavemanRunning"),
      jumping: assetLoader.getImage("cavemanJumping"),
    };

    // Create Init Platform
    const initPlatform = new Platform(
      world.initPlatformStartX, // x
      world.initPlatformStartY, // y
      world.initPlatformWidth, // width
      world.initPlatformHeight, // height
      "green", // color
    );

    // Create Platforms array with Init Platform at index 0
    const platforms = [initPlatform];

    // Create Player
    const player = new Caveman(
      world.cavemanStartX, // x
      world.cavemanStartY, //y
      cavemanSprites,
    );

    // Responsive scaling
    handleResponsiveScaling(world, canvas, player, platforms);

    // Start Game
    handleStartGame(ctx, canvas, player, platforms);
  })
  .catch((err) => console.error("Failed to load assets!", err));
