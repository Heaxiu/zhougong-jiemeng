// 中文关键词提取

import { STOP_WORDS } from '../data/stopWords.js';

/**
 * 清理并提取有效关键词
 * @param {string} text
 * @returns {string[]}
 */
export function tokenize(text) {
  if (!text || typeof text !== 'string') return [];

  const cleaned = text
    .toLowerCase()
    .replace(/[^\u4e00-\u9fa5a-z0-9]/g, ' ')
    .trim();

  if (!cleaned) return [];

  let tokens = [];

  // 优先使用 Intl.Segmenter 进行中文分词
  if (typeof Intl !== 'undefined' && Intl.Segmenter) {
    try {
      const segmenter = new Intl.Segmenter('zh-CN', { granularity: 'word' });
      for (const seg of segmenter.segment(cleaned)) {
        if (seg.isWordLike) {
          tokens.push(seg.segment);
        }
      }
    } catch {
      tokens = [];
    }
  }

  // 兜底：按空白拆分
  if (tokens.length === 0) {
    tokens = cleaned.split(/\s+/).filter(Boolean);
  }

  return [...new Set(
    tokens.filter(token => {
      if (!token) return false;
      if (/^\d+$/.test(token)) return false;
      if (STOP_WORDS.has(token)) return false;
      return true;
    })
  )];
}

/**
 * 判断文本中是否包含任意 token（用于高亮）
 * @param {string} text
 * @param {string[]} tokens
 */
export function containsAnyToken(text, tokens) {
  if (!text || !tokens || tokens.length === 0) return false;
  const lower = text.toLowerCase();
  return tokens.some(t => lower.includes(t));
}
