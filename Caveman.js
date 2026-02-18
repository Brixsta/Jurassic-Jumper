export default class Caveman {
  constructor(x, y, width, height, cavemanSprites) {
    this.x = x;
    this.y = y;

    this.cavemanRunning = cavemanSprites.running;
    this.cavemanJumping = cavemanSprites.jumping;

    // Base Values
    this.baseWidth = width;
    this.baseHeight = height;
    this.baseGravity = 2000;
    this.baseJumpStrength = 1200;
    this.baseGroundLevel = 640;
    this.width = this.baseWidth;
    this.height = this.baseHeight;

    // Physics
    this.gravity = this.baseGravity;
    this.jumpStrength = this.baseJumpStrength;
    this.vy = 0;
    this.groundLevel = this.baseGroundLevel;
    this.currentAnimation = "running";
    this.handleInput();

    // Animation
    this.animations = {
      running: {
        frame: 0,
        frameCount: 16,
        frameWidth: 578,
        frameHeight: 489,
        frameTimer: 0,
        frameInterval: 100,
      },
      jumping: {
        sprite: this.cavemanJumping,
        frame: 0,
        frameCount: 12,
        frameWidth: 578,
        frameHeight: 489,
        frameTimer: 0,
        frameInterval: 100,
      },
    };
  }

  // Listen for SpaceBar
  handleInput = () => {
    document.addEventListener("keydown", (e) => {
      if (e.code === "Space" && this.currentAnimation !== "jumping") {
        this.vy = -this.jumpStrength;
        this.currentAnimation = "jumping";
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

  detectCurrentAnimation = () => {
    if (this.y >= this.groundLevel || this.vy >= 0) {
      this.currentAnimation = "running";
      this.animations.jumping.frame = 0;
    }
    if (this.vy <= 0) {
      this.currentAnimation = "jumping";
    }
  };

  draw = (ctx) => {
    const currentAnim = this.currentAnimation;

    // Draw Caveman Running
    if (currentAnim === "running") {
      const cols = 4;
      const col = this.animations[currentAnim].frame % cols;
      const row = Math.floor(this.animations[currentAnim].frame / cols);

      ctx.drawImage(
        this.cavemanRunning,
        col * this.animations[currentAnim].frameWidth,
        row * this.animations[currentAnim].frameHeight,
        this.animations[currentAnim].frameWidth,
        this.animations[currentAnim].frameHeight,
        this.x,
        this.y,
        this.width,
        this.height,
      );
    }

    // Draw Caveman Jumping
    if (currentAnim === "jumping") {
      const cols = 4;
      const col = this.animations[currentAnim].frame % cols;
      const row = Math.floor(this.animations[currentAnim].frame / cols);

      ctx.drawImage(
        this.cavemanJumping,
        col * this.animations[currentAnim].frameWidth,
        row * this.animations[currentAnim].frameHeight,
        this.animations[currentAnim].frameWidth,
        this.animations[currentAnim].frameHeight,
        this.x,
        this.y,
        this.width,
        this.height,
      );
    }

    // Caveman Hitbox
    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;
    ctx.strokeRect(this.x, this.y, this.width, this.height);
  };

  update(deltaTime) {
    const currentAnim = this.currentAnimation;

    // Detect Current Animation
    this.detectCurrentAnimation();

    // Apply Gravity
    this.vy += this.gravity * deltaTime;

    // Move
    this.y += this.vy * deltaTime;

    // Land on Ground Level
    if (this.y >= this.groundLevel) this.y = this.groundLevel;

    // Animation for Caveman Running
    let runningFrameTime = deltaTime * 3500;
    let jumpingFrameTime = deltaTime * 1000;

    this.animations.running.frameTimer += runningFrameTime;
    this.animations.jumping.frameTimer += jumpingFrameTime;

    // Running Increment
    if (currentAnim === "running") {
      if (
        this.animations[currentAnim].frameTimer >=
        this.animations[currentAnim].frameInterval
      ) {
        this.animations[currentAnim].frame =
          (this.animations[currentAnim].frame + 1) %
          this.animations[currentAnim].frameCount;
        this.animations[currentAnim].frameTimer = 0;
      }
    }

    // Jumping Increment
    if (currentAnim === "jumping") {
      if (
        this.animations[currentAnim].frameTimer >=
        this.animations[currentAnim].frameInterval
      ) {
        this.animations[currentAnim].frame =
          (this.animations[currentAnim].frame + 1) %
          this.animations[currentAnim].frameCount;
        this.animations[currentAnim].frameTimer = 0;
      }
    }
  }
}
