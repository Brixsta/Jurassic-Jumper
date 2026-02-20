import World from "./World.js";
const world = World;

export default class Caveman {
  constructor(cavemanSprites) {
    // Base Values
    this.baseX = world.cavemanStartX;
    this.baseY = world.cavemanStartY;
    this.baseWidth = world.cavemanWidth;
    this.baseHeight = world.cavemanHeight;

    // Current Values
    this.x = this.baseX;
    this.y = this.baseY;
    this.width = this.baseWidth;
    this.height = this.baseHeight;
    this.scale = 1;
    this.onPlatform = false;
    this.jumpsRemaining = 0;

    // Sprites
    this.cavemanRunning = cavemanSprites.running;
    this.cavemanJumping = cavemanSprites.jumping;

    // Physics
    this.gravity = world.gravity;
    this.jumpStrength = world.cavemanJumpStrength;
    this.vy = 0;
    this.vx = 0;
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
      if (e.code === "Space" && this.onPlatform) {
        this.vy = -this.jumpStrength;

        // this.currentAnimation = "jumping";
      }
    });
  };

  scalePlayer = (newScale) => {
    // Calculate ratio between new scale and previous scale
    const ratio = newScale / this.scale;

    // Scale Size
    this.width = this.baseWidth * newScale;
    this.height = this.baseHeight * newScale;

    // Scale Position
    this.x *= ratio;
    this.y *= ratio;

    // Scale Gravity
    this.gravity = world.gravity * newScale;

    // Scale JumpStrength
    this.jumpStrength = world.cavemanJumpStrength * newScale;

    // Store the new scale for the next resize
    this.scale = newScale;
  };

  detectCurrentAnimation = () => {};

  draw = (ctx) => {
    let currentAnim = this.currentAnimation;

    // Safeguard incase Caveman assets haven't loaded yet
    if (!this.cavemanRunning?.complete || !this.cavemanJumping?.complete) {
      return;
    }

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
    let min = Infinity;
    let start = Math.floor(this.y);
    min = Math.floor(Math.min(this.y, min));

    const currentAnim = this.currentAnimation;

    // Detect Current Animation
    this.detectCurrentAnimation();

    //Apply Gravity
    this.vy += this.gravity * deltaTime;

    // Move
    this.y += this.vy * deltaTime;
    this.x += this.vx * deltaTime;

    // // Hit head on Ceiling
    // if (this.y <= 0) {
    //   this.y = 0;

    //   if (this.vy < 0) {
    //     this.vy = 0;
    //   }
    // }

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
