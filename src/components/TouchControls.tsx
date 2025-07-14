import React from 'react';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

interface TouchControlsProps {
  onMove: (direction: string) => void;
}

const TouchControls: React.FC<TouchControlsProps> = ({ onMove }) => {
  const handleTouchStart = (direction: string) => {
    onMove(direction);
  };

  return (
    <div className="absolute bottom-4 right-4 z-40">
      <div className="bg-black/60 rounded-2xl p-4 backdrop-blur-sm border border-white/20">
        <div className="grid grid-cols-3 gap-2 w-32 h-32">
          {/* Top row */}
          <div></div>
          <button
            onTouchStart={() => handleTouchStart('up')}
            onMouseDown={() => handleTouchStart('up')}
            className="bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center text-white transition-colors active:scale-95"
          >
            <ChevronUp size={20} />
          </button>
          <div></div>
          
          {/* Middle row */}
          <button
            onTouchStart={() => handleTouchStart('left')}
            onMouseDown={() => handleTouchStart('left')}
            className="bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center text-white transition-colors active:scale-95"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="bg-white/10 rounded-lg"></div>
          <button
            onTouchStart={() => handleTouchStart('right')}
            onMouseDown={() => handleTouchStart('right')}
            className="bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center text-white transition-colors active:scale-95"
          >
            <ChevronRight size={20} />
          </button>
          
          {/* Bottom row */}
          <div></div>
          <button
            onTouchStart={() => handleTouchStart('down')}
            onMouseDown={() => handleTouchStart('down')}
            className="bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center text-white transition-colors active:scale-95"
          >
            <ChevronDown size={20} />
          </button>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default TouchControls;