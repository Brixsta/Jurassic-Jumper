export default class Platform {
  constructor(x, y, width, height, color) {
    // Base Values
    this.baseWidth = width;
    this.baseHeight = height;
    this.basePlatformSpeed = 100;
    this.color = color;

    this.width = this.baseWidth;
    this.height = this.baseHeight;
    this.x = x;
    this.y = y;
    this.scale = 1;

    // Physics
    this.platformSpeed = this.basePlatformSpeed;
    this.collision = false;
  }

  scalePlatform = (newScale) => {
    // Calculate ratio between new scale and previous scale
    const ratio = newScale / this.scale;

    // Scale Size
    this.height = this.baseHeight * newScale;
    this.width = this.baseWidth * newScale;

    // Scale Position
    this.x *= ratio;
    this.y *= ratio;

    // Scale Platform Speed
    this.platformSpeed = this.basePlatformSpeed * newScale;

    // Store the new scale for the next resize
    this.scale = newScale;
  };

  draw = (ctx) => {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  };

  update = (deltaTime) => {
    this.x -= this.platformSpeed * deltaTime;
  };
}
