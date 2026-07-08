// 梦境分类定义

export const CATEGORIES = [
  { id: 'animal',   name: '动物',   icon: '🐉', order: 1 },
  { id: 'person',   name: '人物',   icon: '👤', order: 2 },
  { id: 'nature',   name: '自然',   icon: '🌧', order: 3 },
  { id: 'object',   name: '物品',   icon: '🏺', order: 4 },
  { id: 'behavior', name: '行为',   icon: '🚶', order: 5 },
  { id: 'emotion',  name: '情感',   icon: '❤',  order: 6 },
  { id: 'ghost',    name: '鬼神',   icon: '☯',  order: 7 },
  { id: 'building', name: '建筑',   icon: '🏯', order: 8 },
  { id: 'plant',    name: '植物',   icon: '🌸', order: 9 },
  { id: 'food',     name: '食物',   icon: '🍚', order: 10 },
];

export const CATEGORY_MAP = Object.fromEntries(
  CATEGORIES.map(c => [c.id, c])
);
