// Draw Objects on Canvas
export const drawGameObjects = (ctx, canvas, player, platforms) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw Player
  if (player) player.draw(ctx);

  // Draw Platforms
  for (let p of platforms) {
    p.draw(ctx);
  }
};
