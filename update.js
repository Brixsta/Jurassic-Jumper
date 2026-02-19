import { handlePlayerPlatformCollision } from "./helpers.js";

export const updateGameObjects = (player, platforms, deltaTime) => {
  if (!player || !platforms) return;

  player.update(deltaTime);
  player.onPlatform = false;

  for (let p of platforms) {
    p.update(deltaTime);
    handlePlayerPlatformCollision(player, p);
  }
};
