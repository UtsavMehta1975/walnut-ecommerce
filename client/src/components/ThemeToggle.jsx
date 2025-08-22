import React from 'react';
import { useTheme } from '../context/ThemeContext';
import '../styles/themeToggle.css';

const ThemeToggle = ({ className = '' }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button 
      onClick={toggleTheme} 
      className={`theme-toggle ${className}`}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
    >
      <div className="theme-toggle-icon">
        {isDark ? (
          <span className="sun-icon">☀️</span>
        ) : (
          <span className="moon-icon">🌙</span>
        )}
      </div>
    </button>
  );
};

export default ThemeToggle;
