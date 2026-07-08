// 搜索历史 Hook

import { useState, useCallback } from 'react';
import { storage } from '../utils/storage.js';

const STORAGE_KEY = 'history';

function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function useDreamHistory(maxItems = 50) {
  const [history, setHistory] = useState(() => {
    const raw = storage.get(STORAGE_KEY, []);
    if (Array.isArray(raw)) return raw;
    return [];
  });

  const persist = useCallback((next) => {
    setHistory(next);
    storage.set(STORAGE_KEY, next);
  }, []);

  const addHistory = useCallback((query, clickedDreamId = null) => {
    if (!query || !query.trim()) return;
    const trimmed = query.trim();

    persist(prev => {
      const filtered = prev.filter(item => item.query !== trimmed);
      const next = [
        { id: generateId(), query: trimmed, clickedDreamId, createdAt: Date.now() },
        ...filtered,
      ].slice(0, maxItems);
      return next;
    });
  }, [persist, maxItems]);

  const removeHistory = useCallback((id) => {
    persist(prev => prev.filter(item => item.id !== id));
  }, [persist]);

  const clearHistory = useCallback(() => {
    persist([]);
  }, [persist]);

  return {
    history,
    addHistory,
    removeHistory,
    clearHistory,
  };
}
