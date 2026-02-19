export const handleResponsiveScaling = (world, canvas, player, platforms) => {
  const applyScaling = () => {
    const scale = Math.min(
      window.innerWidth / world.canvasWidth,
      window.innerHeight / world.canvasHeight,
    );
    canvas.width = world.canvasWidth * scale;
    canvas.height = world.canvasHeight * scale;

    player.scalePlayer(scale);
    platforms.forEach((p) => p.scalePlatform(scale));
  };

  window.onresize = applyScaling;
  applyScaling();
};
