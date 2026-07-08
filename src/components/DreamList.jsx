import DreamCard from './DreamCard.jsx';

export default function DreamList({ items, isFavorite, onToggleFavorite, onSelect, emptyHint = '暂无相关解梦结果' }) {
  if (!items || items.length === 0) {
    return (
      <div className="empty-hint">
        {emptyHint}
      </div>
    );
  }

  return (
    <div className="dream-list">
      {items.map(dream => (
        <DreamCard
          key={dream.id}
          dream={dream}
          isFavorite={isFavorite(dream.id)}
          onToggleFavorite={() => onToggleFavorite(dream)}
          onClick={onSelect}
        />
      ))}
    </div>
  );
}
