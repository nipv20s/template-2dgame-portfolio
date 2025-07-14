import React, { useEffect, useRef, useState } from 'react';
import { Game as PhaserGame } from 'phaser';
import { gameConfig } from './game/GameConfig';
import Modal from './components/Modal';
import TouchControls from './components/TouchControls';
import { ModalData } from './types/GameTypes';

function App() {
  const gameRef = useRef<HTMLDivElement>(null);
  const phaserGameRef = useRef<PhaserGame | null>(null);
  const [modal, setModal] = useState<ModalData | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    if (gameRef.current && !phaserGameRef.current) {
      // Initialize Phaser game
      phaserGameRef.current = new PhaserGame({
        ...gameConfig,
        parent: gameRef.current,
      });

      // Set up global modal handler
      window.showPortfolioModal = (data: ModalData) => {
        setModal(data);
      };
    }

    return () => {
      window.removeEventListener('resize', checkMobile);
      if (phaserGameRef.current) {
        phaserGameRef.current.destroy(true);
        phaserGameRef.current = null;
      }
    };
  }, []);

  const closeModal = () => {
    setModal(null);
  };

  const handleMovement = (direction: string) => {
    if (phaserGameRef.current) {
      const scene = phaserGameRef.current.scene.getScene('GameScene');
      if (scene && scene.player) {
        scene.player.handleInput(direction);
      }
    }
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      <div ref={gameRef} className="w-full h-full" />
      
      {/* Loading Screen */}
      <div id="loading-screen" className="absolute inset-0 bg-gradient-to-b from-purple-900 to-blue-900 flex items-center justify-center z-50">
        <div className="text-center text-white">
          <div className="mb-8">
            <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
          <h1 className="text-2xl font-bold mb-4" style={{ fontFamily: "'Press Start 2P', monospace" }}>
            Loading Portfolio
          </h1>
          <p className="text-sm opacity-80">Preparing your adventure...</p>
        </div>
      </div>

      {/* Game UI Overlay */}
      <div className="absolute top-4 left-4 z-40">
        <div className="bg-black/70 text-white p-3 rounded-lg backdrop-blur-sm border border-white/20">
          <p className="text-xs mb-1" style={{ fontFamily: "'Press Start 2P', monospace" }}>
            Portfolio Explorer
          </p>
          <p className="text-xs opacity-80">
            Use {isMobile ? 'touch controls' : 'WASD or arrows'} to move
          </p>
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-4 left-4 z-40">
        <div className="bg-black/70 text-white p-3 rounded-lg backdrop-blur-sm border border-white/20 max-w-xs">
          <p className="text-xs mb-2" style={{ fontFamily: "'Press Start 2P', monospace" }}>
            Explore the zones:
          </p>
          <div className="text-xs space-y-1">
            <div>📁 Code Cave - Projects</div>
            <div>📝 Resume Shrine - Experience</div>
            <div>✉️ Inbox Tavern - Contact</div>
            <div>🌲 Skill Forest - Technologies</div>
          </div>
        </div>
      </div>

      {/* Mobile Touch Controls */}
      {isMobile && (
        <TouchControls onMove={handleMovement} />
      )}

      {/* Modal */}
      {modal && (
        <Modal data={modal} onClose={closeModal} />
      )}
    </div>
  );
}

export default App;