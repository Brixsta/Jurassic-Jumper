export default class Platform {
  constructor(x, y, width, height, player) {
    this.player = player;

    // Base Values
    this.baseWidth = width;
    this.baseHeight = height;
    this.basePlatformSpeed = 100;

    this.width = this.baseWidth;
    this.height = this.baseHeight;
    this.x = x;
    this.y = y;
    this.scale = 1;

    // Physics
    this.platformSpeed = this.basePlatformSpeed;
    this.collision = false;
    this.scaled = false;
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
    ctx.fillStyle = "blue";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  };

  update = (deltaTime) => {
    this.x -= this.platformSpeed * deltaTime;
    this.isColliding(this, this.player);
  };

  isColliding = (rect2) => {
    if (
      this.x < rect2.x + rect2.width &&
      this.x + this.width > rect2.x &&
      this.y < rect2.y + rect2.height &&
      this.y + this.height > rect2.y
    ) {
      this.collision = true;
      // if (this.collision && this.scaled === true)
      //   // console.log("coliding with player");
      //   let x = 1;
    } else {
      this.collision = false;
    }
  };
}
