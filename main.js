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
      world.initPlatformStartX,
      world.initPlatformStartY,
      world.initPlatformWidth,
      world.initPlatformHeight,
      "green",
    );

    // Create Platforms array with Init Platform at index 0
    const platforms = [initPlatform];

    // Create Player
    const player = new Caveman(cavemanSprites);

    let lastPlatformX = world.initPlatformStartX;
    let lastPlatformY = world.initPlatformStartY;
    let lastPlatformWidth = world.initPlatformWidth;

    // 150 good

    // Create Platforms
    for (let i = 0; i < 1500; i++) {
      let divider = [200, 170, 150, 120, 100][Math.floor(Math.random() * 5)];
      let platformWidth = [300, 200, 150, 100, 50][
        Math.floor(Math.random() * 3)
      ];
      let platformHeight = [80, 75, 70, 65, 60][Math.floor(Math.random() * 5)];

      let randomY = Math.floor(
        Math.random() * (640 - platformHeight - 200) + 200,
      );

      while (Math.abs(randomY - lastPlatformY) > 400) {
        randomY = Math.floor(
          Math.random() * (610 - (player.height + platformHeight + 100)) +
            (player.height + platformHeight + 100),
        );
      }

      let x = lastPlatformX + lastPlatformWidth + divider;
      let y = randomY;

      let color = "red;";

      lastPlatformX = x;
      lastPlatformY = y;
      lastPlatformWidth = platformWidth;

      const platform = new Platform(x, y, platformWidth, platformHeight, color);

      platforms.push(platform);
    }

    // Responsive scaling on window resize
    handleResponsiveScaling(world, canvas, player, platforms);

    // Start Game
    handleStartGame(ctx, canvas, player, platforms);
  })
  .catch((err) => console.error("Failed to load assets!", err));
