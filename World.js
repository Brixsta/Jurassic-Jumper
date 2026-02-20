const world = (() => {
  // Constants
  const BASE_CANVAS_WIDTH = 360;
  const BASE_CANVAS_HEIGHT = 640;
  const BASE_CAVEMAN_WIDTH = BASE_CANVAS_WIDTH * 0.3;
  const BASE_CAVEMAN_HEIGHT = BASE_CANVAS_WIDTH * 0.3;
  const BASE_INITPLATFORM_HEIGHT = 30;
  const BASE_INITPLATFORM_WIDTH = BASE_CANVAS_WIDTH * 2;

  return {
    canvasWidth: BASE_CANVAS_WIDTH,
    canvasHeight: BASE_CANVAS_HEIGHT,
    cavemanWidth: BASE_CAVEMAN_WIDTH,
    cavemanHeight: BASE_CAVEMAN_HEIGHT,
    cavemanStartX: 0,
    cavemanStartY: BASE_CANVAS_HEIGHT - BASE_CAVEMAN_HEIGHT,
    cavemanJumpStrength: 1000,
    gravity: 2000,
    platformSpeed: 300,
    initPlatformStartX: 0,
    initPlatformStartY: BASE_CANVAS_HEIGHT - BASE_INITPLATFORM_HEIGHT,
    initPlatformHeight: BASE_INITPLATFORM_HEIGHT,
    initPlatformWidth: BASE_INITPLATFORM_WIDTH,
  };
})();

export default world;
