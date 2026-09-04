import React, { useEffect, useState } from 'react'
import { FiSun, FiMoon } from 'react-icons/fi'
import './ThemeToggle.css'

const getInitialTheme = () => {
  const stored = localStorage.getItem('theme');
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const ThemeToggle = () => {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <button
      className="theme-toggle"
      onClick={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      {theme === 'light' ? <FiMoon /> : <FiSun />}
    </button>
  )
}

export default ThemeToggle
