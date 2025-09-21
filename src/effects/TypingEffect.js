import React, { useEffect, useState } from "react";

const TypingEffect = ({ text, speed }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor] = useState(true);

  const styles = {
    container: {
      display: 'inline-block',
      position: 'relative'
    },
    text: {
      color: '#ffffff',
      textShadow: '0 0 8px rgba(255, 255, 255, 0.7), 0 0 15px #FFFF'
    },
    cursor: {
      display: 'inline-block',
      width: '2px',
      height: '1em',
      backgroundColor: '#ffffff',
      marginLeft: '2px',
      verticalAlign: 'text-bottom',
      animation: 'cursorGlow 1s infinite',
      boxShadow: '0 0 8px rgba(255, 255, 255, 0.8), 0 0 15px rgba(255, 255, 255, 0.8)'
    },
    '@keyframes cursorGlow': {
      '0%, 100%': {
        opacity: 1,
        boxShadow: '0 0 8px rgba(255, 255, 255, 0.8), 0 0 15px rgba(255, 255, 255, 0.8)'
      },
      '50%': {
        opacity: 0.5,
        boxShadow: '0 0 12px rgba(255, 255, 255, 1), 0 0 20px #FFFF'
      }
    }
  };

  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
      @keyframes cursorGlow {
        0%, 100% {
          opacity: 1;
          box-shadow: 0 0 8px rgba(255, 255, 255, 0.8), 0 0 15px rgba(255, 255, 255, 0.8);
        }
        50% {
          opacity: 0.5;
          box-shadow: 0 0 12px rgba(255, 255, 255, 1), 0 0 20px #FFFF;
        }
      }
    `;
    document.head.appendChild(styleSheet);
    return () => document.head.removeChild(styleSheet);
  }, []);

  useEffect(() => {
    let typingTimer = null;
    let restartTimer = null;

    const typeText = () => {
      setDisplayedText(""); 
      let currentIndex = 0;

      const type = () => {
        if (currentIndex < text.length) {
          setDisplayedText(text.substring(0, currentIndex + 1));
          currentIndex++;
          typingTimer = setTimeout(type, speed);
        } else {
          restartTimer = setTimeout(() => {
            setDisplayedText("");
            currentIndex = 0;
            typingTimer = setTimeout(type, speed);
          }, 2000); 
        }
      };

      type();
    };

    typeText();

    return () => {
      clearTimeout(typingTimer);
      clearTimeout(restartTimer);
    };
  }, [text, speed]);

  return (
    <div style={styles.container}>
      <span style={styles.text}>{displayedText}</span>
      <span 
        style={{
          ...styles.cursor,
          opacity: showCursor ? 1 : 0
        }}
      />
    </div>
  );
};

export default TypingEffect;