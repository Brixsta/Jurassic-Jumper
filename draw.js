export const handleDrawGame = (ctx, canvas, player, platforms) => {
  const drawGameObjects = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.draw(ctx);
    platforms.forEach((p) => p.draw(ctx));
  };

  drawGameObjects();
};
