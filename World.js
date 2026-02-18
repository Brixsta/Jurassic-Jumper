const world = (() => {
  // Constants
  const BASE_CANVAS_WIDTH = 360;
  const BASE_CANVAS_HEIGHT = 640;
  const BASE_CAVEMAN_WIDTH = BASE_CANVAS_WIDTH * 0.3;
  const BASE_CAVEMAN_HEIGHT = BASE_CANVAS_WIDTH * 0.3;

  return {
    canvasBaseWidth: BASE_CANVAS_WIDTH,
    canvasBaseHeight: BASE_CANVAS_HEIGHT,
    cavemanBaseWidth: BASE_CAVEMAN_WIDTH,
    cavemanBaseHeight: BASE_CAVEMAN_HEIGHT,
    cavemanBaseJumpStrength: 1200,
    baseGravity: 2000,
    baseGroundLevel: 640,
  };
})();

export default world;
