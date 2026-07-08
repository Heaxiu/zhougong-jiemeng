// 分享与复制辅助

/**
 * 组合分享文本
 * @param {object} dream
 * @returns {string}
 */
export function buildShareText(dream) {
  return `【${dream.title}】\n${dream.summary}\n\n解梦：${dream.meaning}\n\n吉凶：${dream.fortune}\n建议：${dream.advice}\n\n——来自周公解梦`;
}

/**
 * 尝试调用系统分享，不支持则复制到剪贴板
 * @param {object} dream
 * @returns {Promise<{shared:boolean}>}
 */
export async function shareDream(dream) {
  const text = buildShareText(dream);
  const title = dream.title;

  if (navigator.share) {
    try {
      await navigator.share({ title, text });
      return { shared: true };
    } catch (err) {
      if (err.name === 'AbortError') {
        return { shared: false };
      }
      // 分享失败则回退复制
    }
  }

  try {
    await navigator.clipboard.writeText(text);
    return { shared: false, copied: true };
  } catch {
    return { shared: false, copied: false };
  }
}
