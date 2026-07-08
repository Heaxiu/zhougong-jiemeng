// 收藏夹 Hook

import { useState, useCallback } from 'react';
import { storage } from '../utils/storage.js';

const STORAGE_KEY = 'favorites';

export function useFavorites(maxItems = 200) {
  const [favorites, setFavorites] = useState(() => {
    const raw = storage.get(STORAGE_KEY, []);
    if (Array.isArray(raw)) return raw;
    return [];
  });

  const persist = useCallback((next) => {
    setFavorites(next);
    storage.set(STORAGE_KEY, next);
  }, []);

  const isFavorite = useCallback((id) => {
    return favorites.some(item => item.id === id);
  }, [favorites]);

  const toggleFavorite = useCallback((dream) => {
    persist(prev => {
      const exists = prev.some(item => item.id === dream.id);
      if (exists) {
        return prev.filter(item => item.id !== dream.id);
      }
      const next = [dream, ...prev];
      return next.slice(0, maxItems);
    });
  }, [persist, maxItems]);

  const removeFavorite = useCallback((id) => {
    persist(prev => prev.filter(item => item.id !== id));
  }, [persist]);

  const clearFavorites = useCallback(() => {
    persist([]);
  }, [persist]);

  return {
    favorites,
    isFavorite,
    toggleFavorite,
    removeFavorite,
    clearFavorites,
  };
}
