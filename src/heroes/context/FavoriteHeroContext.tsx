import { createContext, useEffect, useState, type PropsWithChildren } from 'react';
import type { Hero } from '../types/hero.interface';

interface FavoriteHeroContext {
  // State
  favorites: Hero[];
  favoriteCount: number;
  // Methods
  isFavorite: (hero: Hero) => boolean;
  toggleFavorite: (hero: Hero) => void;
}

export const FavoriteHeroContext = createContext<FavoriteHeroContext>({} as FavoriteHeroContext);

const getFavoritesFromLocalStorage = (): Hero[] => {
  const favorites = localStorage.getItem('favorites');
  return favorites ? JSON.parse(favorites) : [];
}

export const FavoriteHeroProvider = ({ children }: PropsWithChildren) => {

  const [favorites, setFavorites] = useState<Hero[]>(getFavoritesFromLocalStorage());

  const toggleFavorite = (hero: Hero) => {
    const heroExists = favorites.find(h => h.id === hero.id);
    if (heroExists) {
      const newFavorites = favorites.filter(h => h.id !== hero.id);
      setFavorites(newFavorites);
      return;
    }

    setFavorites(prev => [...prev, hero]);
  }

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);


  return (
    <FavoriteHeroContext value={{
      // State
      favorites: favorites,
      favoriteCount: favorites.length,
      // Methods
      isFavorite: (hero: Hero) => favorites.some(h => h.id === hero.id),
      toggleFavorite: toggleFavorite
    }}>
      {children}
    </FavoriteHeroContext>
  )
}