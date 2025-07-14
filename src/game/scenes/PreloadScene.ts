import Phaser from 'phaser';

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    // Create loading bar
    const loadingBar = this.add.graphics();
    const loadingBox = this.add.graphics();
    
    loadingBox.fillStyle(0x222222);
    loadingBox.fillRect(this.cameras.main.centerX - 160, this.cameras.main.centerY - 10, 320, 20);
    
    // Load progress
    this.load.on('progress', (value: number) => {
      loadingBar.clear();
      loadingBar.fillStyle(0x00ff00);
      loadingBar.fillRect(this.cameras.main.centerX - 150, this.cameras.main.centerY - 5, 300 * value, 10);
    });

    // Create pixel art assets programmatically
    this.createPixelAssets();
    
    // Load audio (we'll use a simple beep sound for now)
    this.createAudioAssets();
  }

  createPixelAssets() {
    // Create player sprite
    const playerGraphics = this.add.graphics();
    playerGraphics.fillStyle(0x4169e1);
    playerGraphics.fillRect(0, 0, 16, 16);
    playerGraphics.fillStyle(0xffd700);
    playerGraphics.fillRect(4, 2, 8, 4);
    playerGraphics.fillStyle(0xff6347);
    playerGraphics.fillRect(6, 6, 4, 6);
    playerGraphics.generateTexture('player', 16, 16);
    playerGraphics.destroy();

    // Create tile sprites
    this.createTileSprites();
    
    // Create zone markers
    this.createZoneMarkers();
  }

  createTileSprites() {
    // Grass tile
    const grassGraphics = this.add.graphics();
    grassGraphics.fillStyle(0x2d5016);
    grassGraphics.fillRect(0, 0, 32, 32);
    grassGraphics.fillStyle(0x4d7c22);
    for (let i = 0; i < 8; i++) {
      grassGraphics.fillRect(Math.random() * 30, Math.random() * 30, 2, 2);
    }
    grassGraphics.generateTexture('grass', 32, 32);
    grassGraphics.destroy();

    // Stone tile
    const stoneGraphics = this.add.graphics();
    stoneGraphics.fillStyle(0x696969);
    stoneGraphics.fillRect(0, 0, 32, 32);
    stoneGraphics.fillStyle(0x808080);
    stoneGraphics.fillRect(2, 2, 28, 28);
    stoneGraphics.generateTexture('stone', 32, 32);
    stoneGraphics.destroy();

    // Water tile
    const waterGraphics = this.add.graphics();
    waterGraphics.fillStyle(0x4169e1);
    waterGraphics.fillRect(0, 0, 32, 32);
    waterGraphics.fillStyle(0x87ceeb);
    waterGraphics.fillRect(4, 4, 24, 24);
    waterGraphics.generateTexture('water', 32, 32);
    waterGraphics.destroy();
  }

  createZoneMarkers() {
    // Code Cave marker
    const codeGraphics = this.add.graphics();
    codeGraphics.fillStyle(0x8b4513);
    codeGraphics.fillRect(0, 0, 64, 48);
    codeGraphics.fillStyle(0x000000);
    codeGraphics.fillRect(8, 16, 48, 24);
    codeGraphics.fillStyle(0x00ff00);
    codeGraphics.fillRect(12, 20, 4, 4);
    codeGraphics.fillRect(20, 20, 4, 4);
    codeGraphics.fillRect(28, 20, 4, 4);
    codeGraphics.generateTexture('code-cave', 64, 48);
    codeGraphics.destroy();

    // Resume Shrine marker
    const resumeGraphics = this.add.graphics();
    resumeGraphics.fillStyle(0xdaa520);
    resumeGraphics.fillRect(0, 0, 48, 64);
    resumeGraphics.fillStyle(0xffd700);
    resumeGraphics.fillRect(8, 8, 32, 48);
    resumeGraphics.fillStyle(0x8b4513);
    resumeGraphics.fillRect(12, 16, 24, 3);
    resumeGraphics.fillRect(12, 24, 24, 3);
    resumeGraphics.fillRect(12, 32, 24, 3);
    resumeGraphics.generateTexture('resume-shrine', 48, 64);
    resumeGraphics.destroy();

    // Contact Tavern marker
    const contactGraphics = this.add.graphics();
    contactGraphics.fillStyle(0x8b4513);
    contactGraphics.fillRect(0, 0, 64, 64);
    contactGraphics.fillStyle(0xa0522d);
    contactGraphics.fillRect(4, 4, 56, 56);
    contactGraphics.fillStyle(0xffff00);
    contactGraphics.fillRect(16, 16, 32, 24);
    contactGraphics.fillStyle(0x8b4513);
    contactGraphics.fillRect(28, 44, 8, 16);
    contactGraphics.generateTexture('contact-tavern', 64, 64);
    contactGraphics.destroy();

    // Skill Forest marker
    const skillGraphics = this.add.graphics();
    skillGraphics.fillStyle(0x8b4513);
    skillGraphics.fillRect(24, 48, 16, 16);
    skillGraphics.fillStyle(0x228b22);
    skillGraphics.fillEllipse(32, 32, 48, 48);
    skillGraphics.fillStyle(0x32cd32);
    skillGraphics.fillEllipse(32, 28, 32, 32);
    skillGraphics.generateTexture('skill-forest', 64, 64);
    skillGraphics.destroy();
  }

  createAudioAssets() {
    // Create a simple background music using Web Audio API
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // Simple background ambience
    const buffer = audioContext.createBuffer(1, audioContext.sampleRate * 2, audioContext.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < data.length; i++) {
      data[i] = Math.sin(440 * 2 * Math.PI * i / audioContext.sampleRate) * 0.1 * Math.sin(i / 1000);
    }
  }

  create() {
    // Hide loading screen
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      loadingScreen.style.display = 'none';
    }

    this.scene.start('GameScene');
  }
}