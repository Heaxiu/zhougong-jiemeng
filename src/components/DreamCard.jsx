import FortuneBadge from './FortuneBadge.jsx';
import FavoriteButton from './FavoriteButton.jsx';

export default function DreamCard({ dream, isFavorite, onToggleFavorite, onClick }) {
  return (
    <div className="dream-card" onClick={() => onClick(dream)}>
      <div className="dream-card-header">
        <h3 className="dream-card-title">{dream.title}</h3>
        <FavoriteButton isFavorite={isFavorite} onToggle={onToggleFavorite} />
      </div>
      <p className="dream-card-summary">{dream.summary}</p>
      <div className="dream-card-footer">
        <FortuneBadge fortune={dream.fortune} />
        <div className="dream-card-tags">
          {dream.tags.slice(0, 3).map(tag => (
            <span key={tag} className="dream-tag">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
