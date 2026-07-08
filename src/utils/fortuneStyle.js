// 吉凶样式映射

export const FORTUNE_STYLES = {
  '大吉': { className: 'fortune-daji',   color: '#d4a843', label: '大吉' },
  '吉':   { className: 'fortune-ji',     color: '#5a9e5a', label: '吉' },
  '中平': { className: 'fortune-zhong',  color: '#a09080', label: '中平' },
  '凶':   { className: 'fortune-xiong',  color: '#d4884a', label: '凶' },
  '大凶': { className: 'fortune-daxiong',color: '#cc2222', label: '大凶' },
};

export function getFortuneStyle(fortune) {
  return FORTUNE_STYLES[fortune] || FORTUNE_STYLES['中平'];
}
