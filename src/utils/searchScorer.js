// 搜索评分算法

/**
 * 计算单条解梦词条与查询词的匹配得分
 * @param {object} dream
 * @param {string[]} tokens
 * @param {string|null} categoryId
 * @returns {number}
 */
export function scoreDream(dream, tokens, categoryId) {
  if (categoryId && dream.categoryId !== categoryId) return 0;
  if (!tokens || tokens.length === 0) return 0;

  let score = 0;
  const title = dream.title || '';
  const textFields = [title, dream.summary, dream.meaning].join(' ');
  const keywordSet = new Set([
    ...(dream.keywords || []),
    ...(dream.tags || []),
  ]);

  let hitCount = 0;
  for (const token of tokens) {
    if (title.includes(token)) {
      score += 100;
      hitCount++;
    } else if (keywordSet.has(token)) {
      score += 30;
      hitCount++;
    } else if (textFields.includes(token)) {
      score += 5;
    }
  }

  // 命中词数越多，额外加成
  score += hitCount * 10;

  return score;
}

/**
 * 对词条列表排序并截取前 N 条
 * @param {object[]} dictionary
 * @param {string[]} tokens
 * @param {string|null} categoryId
 * @param {number} limit
 * @returns {object[]}
 */
export function searchDreams(dictionary, tokens, categoryId = null, limit = 20) {
  const scored = dictionary
    .map(dream => ({
      dream,
      score: scoreDream(dream, tokens, categoryId),
    }))
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map(item => item.dream);
}
