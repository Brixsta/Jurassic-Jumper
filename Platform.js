export default class Platform {
  constructor(x, y, width, height, player) {
    this.player = player;
    this.x = x;
    this.y = y;

    // Base Values
    this.baseWidth = width;
    this.baseHeight = height;

    this.width = this.baseWidth;
    this.height = this.baseHeight;

    this.platformSpeed = 100;
    this.collision = false;
    this.scaled = false;
  }

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
      // if (this.collision && this.scaled) console.log("coliding with player");
    } else {
      this.collision = false;
    }
  };
}
