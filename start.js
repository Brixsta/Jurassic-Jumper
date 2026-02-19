import { handleUpdateGame } from "./update.js";
import { handleDrawGame } from "./draw.js";

export const handleStartGame = (ctx, canvas, player, platforms) => {
  let last = performance.now();
  const gameLoop = (time) => {
    const MAX_DELTA = 0.05;
    let deltaTime = (time - last) / 1000;
    deltaTime = Math.min(deltaTime, MAX_DELTA);
    last = time;
    handleUpdateGame(deltaTime, player, platforms);
    handleDrawGame(ctx, canvas, player, platforms);
    requestAnimationFrame(gameLoop);
  };
  requestAnimationFrame(gameLoop);
};
