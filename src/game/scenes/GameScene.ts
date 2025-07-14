import Phaser from 'phaser';
import Player from '../entities/Player';
import { ZoneConfig } from '../../types/GameTypes';

export default class GameScene extends Phaser.Scene {
  public player!: Player;
  private zones!: Phaser.Physics.Arcade.StaticGroup;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasd!: any;
  private zoneConfigs: ZoneConfig[] = [];

  constructor() {
    super({ key: 'GameScene' });
  }

  create() {
    // Create tilemap
    this.createWorld();
    
    // Create player
    this.player = new Player(this, 400, 300);
    
    // Create interactive zones
    this.createZones();
    
    // Set up camera
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setZoom(1.5);
    this.cameras.main.setBounds(0, 0, 1600, 1200);
    
    // Set up controls
    this.cursors = this.input.keyboard!.createCursorKeys();
    this.wasd = this.input.keyboard!.addKeys('W,S,A,D');
    
    // Set up collisions
    this.physics.add.overlap(this.player, this.zones, this.handleZoneInteraction, undefined, this);
  }

  createWorld() {
    // Create a simple tiled world
    for (let x = 0; x < 50; x++) {
      for (let y = 0; y < 37; y++) {
        let tileType = 'grass';
        
        // Add some variety
        if (Math.random() < 0.1) {
          tileType = 'stone';
        } else if (Math.random() < 0.05) {
          tileType = 'water';
        }
        
        this.add.image(x * 32, y * 32, tileType).setOrigin(0, 0);
      }
    }
  }

  createZones() {
    this.zones = this.physics.add.staticGroup();
    
    // Define zone configurations
    this.zoneConfigs = [
      {
        name: 'Code Cave',
        x: 200,
        y: 200,
        width: 64,
        height: 48,
        modalData: {
          title: 'Code Cave - My Projects',
          type: 'code'
        }
      },
      {
        name: 'Resume Shrine',
        x: 600,
        y: 150,
        width: 48,
        height: 64,
        modalData: {
          title: 'Resume Shrine - My Journey',
          type: 'resume'
        }
      },
      {
        name: 'Contact Tavern',
        x: 1000,
        y: 300,
        width: 64,
        height: 64,
        modalData: {
          title: 'Inbox Tavern - Get In Touch',
          type: 'contact'
        }
      },
      {
        name: 'Skill Forest',
        x: 400,
        y: 500,
        width: 64,
        height: 64,
        modalData: {
          title: 'Skill Forest - My Expertise',
          type: 'skills'
        }
      }
    ];

    // Create zone sprites and physics bodies
    this.zoneConfigs.forEach((config, index) => {
      const sprite = this.add.image(config.x, config.y, this.getZoneTexture(config.modalData.type))
        .setOrigin(0, 0);
      
      const zone = this.physics.add.staticSprite(config.x + config.width/2, config.y + config.height/2, '')
        .setSize(config.width, config.height)
        .setVisible(false);
      
      zone.setData('zoneIndex', index);
      this.zones.add(zone);

      // Add glow effect
      this.tweens.add({
        targets: sprite,
        alpha: 0.8,
        duration: 2000,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
      });
    });
  }

  getZoneTexture(type: string): string {
    switch (type) {
      case 'code': return 'code-cave';
      case 'resume': return 'resume-shrine';
      case 'contact': return 'contact-tavern';
      case 'skills': return 'skill-forest';
      default: return 'grass';
    }
  }

  handleZoneInteraction(player: any, zone: any) {
    const zoneIndex = zone.getData('zoneIndex');
    const config = this.zoneConfigs[zoneIndex];
    
    if (config && window.showPortfolioModal) {
      window.showPortfolioModal(config.modalData);
    }
  }

  update() {
    // Handle input
    const left = this.cursors.left.isDown || this.wasd.A.isDown;
    const right = this.cursors.right.isDown || this.wasd.D.isDown;
    const up = this.cursors.up.isDown || this.wasd.W.isDown;
    const down = this.cursors.down.isDown || this.wasd.S.isDown;

    this.player.update(left, right, up, down);
  }
}