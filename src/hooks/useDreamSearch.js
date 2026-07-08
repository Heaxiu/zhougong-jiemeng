// 梦境搜索 Hook

import { useMemo } from 'react';
import { tokenize } from '../utils/tokenize.js';
import { searchDreams } from '../utils/searchScorer.js';

/**
 * 搜索与分类过滤
 * @param {object[]} dictionary
 * @param {string} query
 * @param {string|null} categoryId
 * @param {number} limit
 * @returns {{ results: object[], tokens: string[], isSearching: boolean }}
 */
export function useDreamSearch(dictionary, query, categoryId = null, limit = 30) {
  return useMemo(() => {
    const trimmed = query.trim();
    const tokens = tokenize(trimmed);

    let results = [];
    if (trimmed === '' && !categoryId) {
      results = [];
    } else if (trimmed === '' && categoryId) {
      results = dictionary
        .filter(d => d.categoryId === categoryId)
        .slice(0, limit);
    } else {
      results = searchDreams(dictionary, tokens, categoryId, limit);
    }

    return {
      results,
      tokens,
      isSearching: trimmed.length > 0 || !!categoryId,
    };
  }, [dictionary, query, categoryId, limit]);
}
