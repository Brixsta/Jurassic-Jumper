export default class Caveman {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;

    // Base Values
    this.baseWidth = width;
    this.baseHeight = height;
    this.baseGravity = 1000;
    this.baseJumpStrength = 500;
    this.baseGroundLevel = 640;
    this.width = 40;
    this.height = 40;

    // Physics
    this.gravity = this.baseGravity;
    this.jumpStrength = this.baseJumpStrength;
    this.vy = 0;
    this.groundLevel = this.baseGroundLevel;
    this.jumping = false;
    this.handleInput();
  }

  handleInput = () => {
    document.addEventListener("keydown", (e) => {
      if (e.code === "Space" && !this.jumping) {
        this.vy = -this.jumpStrength;
        this.jumping = true;
      }
    });
  };

  applyScaling = (scale) => {
    // Scale Character
    this.height = this.baseHeight * scale;
    this.width = this.baseWidth * scale;

    // Scale Gravity
    this.gravity = this.baseGravity * scale;

    // Scale JumpStrength
    this.jumpStrength = this.baseJumpStrength * scale;

    // Update Ground Level
    this.groundLevel = this.baseGroundLevel * scale - this.height;
  };

  detectJump = () => {
    if (this.y >= this.groundLevel) this.jumping = false;
    if (this.y < this.groundLevel) this.jumping = true;
  };

  draw = (ctx) => {
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  };

  update(deltaTime) {
    // Detect Jump
    this.detectJump();

    // Apply Gravity
    this.vy += this.gravity * deltaTime;

    // Move
    this.y += this.vy * deltaTime;

    // land on ground level
    if (this.y >= this.groundLevel) this.y = this.groundLevel;
  }
}
