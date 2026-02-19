export const startGameLoop = (update, draw) => {
  // Main Game Loop
  let last = 0;
  const gameLoop = (time) => {
    let deltaTime = (time - last) / 1000; // Seconds since last frame update
    last = time;
    update(deltaTime);
    draw();
    requestAnimationFrame(gameLoop);
  };

  requestAnimationFrame(gameLoop);
};
