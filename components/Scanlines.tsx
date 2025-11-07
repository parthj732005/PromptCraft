import React from 'react';

const Scanlines: React.FC = () => {
  return (
    <div
      className="absolute top-0 left-0 w-full h-full pointer-events-none z-10"
      style={{
        background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
        backgroundSize: '100% 3px, 5px 100%',
        animation: 'scanline-anim 15s linear infinite',
      }}
    >
      <style>{`
        @keyframes scanline-anim {
          0% {
            background-position: 0% 0%;
          }
          100% {
            background-position: 0% 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default Scanlines;
