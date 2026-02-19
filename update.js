import { handlePlayerPlatformCollision } from "./helpers.js";

export const handleUpdateGame = (deltaTime, player, platforms) => {
  const updateGame = (deltaTime) => {
    player.update(deltaTime);
    player.onPlatform = false;

    for (let p of platforms) {
      p.update(deltaTime);
      handlePlayerPlatformCollision(player, p);
    }
  };
  updateGame(deltaTime);
};
