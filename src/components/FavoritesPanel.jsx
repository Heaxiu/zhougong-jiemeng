import DreamCard from './DreamCard.jsx';

export default function FavoritesPanel({ favorites, isFavorite, onToggleFavorite, onSelect, onClear }) {
  if (!favorites || favorites.length === 0) {
    return (
      <div className="empty-hint">
        暂无收藏，点击梦境卡片上的星标即可收藏
      </div>
    );
  }

  return (
    <section className="favorites-section">
      <div className="section-header">
        <h2 className="section-title">我的收藏</h2>
        <button type="button" className="text-button" onClick={onClear}>清空</button>
      </div>
      <div className="dream-list">
        {favorites.map(dream => (
          <DreamCard
            key={dream.id}
            dream={dream}
            isFavorite={isFavorite(dream.id)}
            onToggleFavorite={() => onToggleFavorite(dream)}
            onClick={onSelect}
          />
        ))}
      </div>
    </section>
  );
}
