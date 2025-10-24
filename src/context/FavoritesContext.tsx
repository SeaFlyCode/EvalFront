/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface FavoritesContextType {
  favorites: Set<number>;
  toggleFavorite: (userId: number) => void;
  isFavorite: (userId: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

const STORAGE_KEY = 'user-favorites';

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Set<number>>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return new Set(Array.isArray(parsed) ? parsed : []);
      }
    } catch (err) {
      console.error('Erreur lors du chargement des favoris:', err);
    }
    return new Set();
  });

  // Sauvegarder dans localStorage à chaque modification
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(favorites)));
    } catch (err) {
      console.error('Erreur lors de la sauvegarde des favoris:', err);
    }
  }, [favorites]);

  const toggleFavorite = (userId: number) => {
    try {
      setFavorites((prev) => {
        const newFavorites = new Set(prev);
        if (newFavorites.has(userId)) {
          newFavorites.delete(userId);
        } else {
          newFavorites.add(userId);
        }
        return newFavorites;
      });
    } catch (err) {
      console.error('Erreur lors de la modification des favoris:', err);
    }
  };

  const isFavorite = (userId: number): boolean => {
    try {
      return favorites.has(userId);
    } catch (err) {
      console.error('Erreur lors de la vérification du favori:', err);
      return false;
    }
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites doit être utilisé dans un FavoritesProvider');
  }
  return context;
}

