import { useTheme } from '../context/ThemeContext';
import { Moon, Sun } from 'lucide-react';
import '../styles/ThemeToggle.css';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={theme === 'light' ? 'Activer le mode sombre' : 'Activer le mode clair'}
      title={theme === 'light' ? 'Mode sombre' : 'Mode clair'}
    >
      {theme === 'light' ? (
        <Moon size={20} />
      ) : (
        <Sun size={20} />
      )}
    </button>
  );
}

