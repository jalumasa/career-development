import { useEffect, useState } from 'react';

const useTheme = () => {
  const [theme, setTheme] = useState(
    () => document.documentElement.getAttribute('data-theme') || 'dark'
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('theme', theme);
    } catch (error) {
      // localStorage unavailable (private browsing, etc.) — theme just won't persist.
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
  };

  return [theme, toggleTheme];
};

export default useTheme;
