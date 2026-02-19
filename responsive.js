export const setupResponsiveScaling = (canvas, world, player, platforms) => {
  // Responsive scaling
  const resize = () => {
    const scaleX = window.innerWidth / world.canvasBaseWidth;
    const scaleY = window.innerHeight / world.canvasBaseHeight;
    const scale = Math.min(scaleX, scaleY);

    canvas.width = world.canvasBaseWidth * scale;
    canvas.height = world.canvasBaseHeight * scale;

    // Scale Character, Gravity, JumpStrength, and Ground Level
    player.scalePlayer(scale);

    // Scale Platforms X, Y, Width, And Height
    for (let p of platforms) {
      p.scalePlatform(scale);
    }
  };

  window.onresize = resize;
  resize(); // call initially
};
