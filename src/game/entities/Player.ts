import Phaser from 'phaser';

export default class Player extends Phaser.Physics.Arcade.Sprite {
  private speed: number = 160;
  private lastMovement: { x: number; y: number } = { x: 0, y: 0 };

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'player');
    
    scene.add.existing(this);
    scene.physics.add.existing(this);
    
    this.setCollideWorldBounds(true);
    this.setSize(12, 12);
    this.setOffset(2, 2);
    
    // Create movement animations
    this.createAnimations();
  }

  createAnimations() {
    // Since we're using simple sprites, we'll create color variations for movement
    const scene = this.scene;
    
    // Create different colored versions for movement animation
    const graphics = scene.add.graphics();
    
    // Walking animation frames (simple color shifts)
    const colors = [0x4169e1, 0x5a7fd1, 0x6a8fd1];
    colors.forEach((color, index) => {
      graphics.clear();
      graphics.fillStyle(color);
      graphics.fillRect(0, 0, 16, 16);
      graphics.fillStyle(0xffd700);
      graphics.fillRect(4, 2, 8, 4);
      graphics.fillStyle(0xff6347);
      graphics.fillRect(6, 6, 4, 6);
      graphics.generateTexture(`player-walk-${index}`, 16, 16);
    });
    
    graphics.destroy();

    // Create walk animation
    if (!this.scene.anims.exists('walk')) {
      this.scene.anims.create({
        key: 'walk',
        frames: [
          { key: 'player-walk-0' },
          { key: 'player-walk-1' },
          { key: 'player-walk-2' },
          { key: 'player-walk-1' }
        ],
        frameRate: 8,
        repeat: -1
      });
    }

    if (!this.scene.anims.exists('idle')) {
      this.scene.anims.create({
        key: 'idle',
        frames: [{ key: 'player' }],
        frameRate: 1
      });
    }
  }

  update(left: boolean, right: boolean, up: boolean, down: boolean) {
    let velocityX = 0;
    let velocityY = 0;

    if (left) velocityX = -this.speed;
    if (right) velocityX = this.speed;
    if (up) velocityY = -this.speed;
    if (down) velocityY = this.speed;

    // Normalize diagonal movement
    if (velocityX !== 0 && velocityY !== 0) {
      velocityX *= 0.707;
      velocityY *= 0.707;
    }

    this.setVelocity(velocityX, velocityY);

    // Handle animations
    if (velocityX !== 0 || velocityY !== 0) {
      if (!this.anims.isPlaying || this.anims.currentAnim?.key !== 'walk') {
        this.play('walk');
      }
      
      // Store last movement for direction
      if (velocityX !== 0) this.lastMovement.x = velocityX;
      if (velocityY !== 0) this.lastMovement.y = velocityY;
    } else {
      if (this.anims.currentAnim?.key !== 'idle') {
        this.play('idle');
      }
    }

    // Flip sprite based on direction
    if (this.lastMovement.x < 0) {
      this.setFlipX(true);
    } else if (this.lastMovement.x > 0) {
      this.setFlipX(false);
    }
  }

  handleInput(direction: string) {
    const inputMap: { [key: string]: [boolean, boolean, boolean, boolean] } = {
      'up': [false, false, true, false],
      'down': [false, false, false, true],
      'left': [true, false, false, false],
      'right': [false, true, false, false],
    };

    if (inputMap[direction]) {
      const [left, right, up, down] = inputMap[direction];
      this.update(left, right, up, down);
    }
  }
}