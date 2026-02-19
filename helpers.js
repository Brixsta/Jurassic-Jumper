export const handlePlayerPlatformCollision = (player, platform) => {
  // First: AABB overlap check
  if (
    player.x + player.width <= platform.x ||
    player.x >= platform.x + platform.width ||
    player.y + player.height <= platform.y ||
    player.y >= platform.y + platform.height
  ) {
    return null; // no collision
  }

  // Calculate overlap distances
  const overlapLeft = player.x + player.width - platform.x;
  const overlapRight = platform.x + platform.width - player.x;
  const overlapTop = player.y + player.height - platform.y;
  const overlapBottom = platform.y + platform.height - player.y;

  // Find the smallest overlap (this is the collision side)
  const minOverlap = Math.min(
    overlapLeft,
    overlapRight,
    overlapTop,
    overlapBottom,
  );

  switch (minOverlap) {
    case overlapTop:
      // Player hit platform from above
      player.y = platform.y - player.height;
      player.vy = 0;
      player.onPlatform = true;
      break;
    case overlapBottom:
      // Player hit platform from below
      player.y = platform.y + platform.height;
      player.vy = 0;
      break;
    case overlapLeft:
      // Player hit platform's left side
      player.vx = -platform.platformSpeed * 5;
      break;
    case overlapRight:
      // Player hit platform's right side
      break;
  }
};
