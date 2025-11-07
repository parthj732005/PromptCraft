import React from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
}

const GlitchText: React.FC<GlitchTextProps> = ({ text, className }) => {
  return (
    <div
      className={`relative glitch-overlay ${className}`}
      data-text={text}
    >
      {text}
    </div>
  );
};

export default GlitchText;
