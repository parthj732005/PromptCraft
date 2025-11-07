import React, { useState, useEffect } from 'react';

interface TypingTextProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  onComplete?: () => void;
}

const TypingText: React.FC<TypingTextProps> = ({ text, speed = 50, delay = 0, className, onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const delayTimeout = setTimeout(() => {
      setIsTyping(true);
      setDisplayedText('');
      setIsComplete(false);

      if (text) {
        let i = 0;
        const intervalId = setInterval(() => {
          setDisplayedText(prev => prev + text.charAt(i));
          i++;
          if (i >= text.length) {
            clearInterval(intervalId);
            setIsTyping(false);
            setIsComplete(true);
            if (onComplete) {
              onComplete();
            }
          }
        }, speed);
        return () => clearInterval(intervalId);
      }
    }, delay);

    return () => clearTimeout(delayTimeout);
  }, [text, speed, delay, onComplete]);

  if (delay > 0 && !isTyping && !isComplete) {
    return null; // Don't render anything until the delay has passed
  }

  return (
    <div className={`flex items-center ${className}`}>
      <span>{displayedText}</span>
      {isTyping && <span className="inline-block w-2 h-5 bg-cyan-300 animate-pulse ml-2" />}
    </div>
  );
};

export default TypingText;
