export default function FavoriteButton({ isFavorite, onToggle }) {
  return (
    <button
      type="button"
      className={`favorite-button ${isFavorite ? 'active' : ''}`}
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      aria-label={isFavorite ? '取消收藏' : '收藏'}
    >
      {isFavorite ? '★' : '☆'}
    </button>
  );
}
