import { useState } from 'react';
import FortuneBadge from './FortuneBadge.jsx';
import FavoriteButton from './FavoriteButton.jsx';
import { shareDream } from '../utils/shareHelper.js';

export default function DreamDetail({ dream, isFavorite, onToggleFavorite, onClose }) {
  const [shareStatus, setShareStatus] = useState(null);

  const handleShare = async () => {
    const result = await shareDream(dream);
    if (result.shared) {
      setShareStatus('已分享');
    } else if (result.copied) {
      setShareStatus('已复制');
    } else {
      setShareStatus('分享失败');
    }
    setTimeout(() => setShareStatus(null), 2000);
  };

  return (
    <div className="dream-detail-overlay" onClick={onClose}>
      <div className="dream-detail-panel" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="dream-detail-close" onClick={onClose}>✕</button>

        <div className="dream-detail-header">
          <h2 className="dream-detail-title">{dream.title}</h2>
          <FortuneBadge fortune={dream.fortune} />
        </div>

        <div className="dream-detail-section">
          <h3 className="detail-section-title">简评</h3>
          <p className="detail-summary">{dream.summary}</p>
        </div>

        <div className="dream-detail-section">
          <h3 className="detail-section-title">详细解梦</h3>
          <p className="detail-meaning">{dream.meaning}</p>
        </div>

        <div className="dream-detail-section">
          <h3 className="detail-section-title">趋吉避凶</h3>
          <p className="detail-advice">{dream.advice}</p>
        </div>

        <div className="dream-detail-tags">
          {dream.tags.map(tag => (
            <span key={tag} className="dream-tag">{tag}</span>
          ))}
        </div>

        <div className="dream-detail-actions">
          <FavoriteButton isFavorite={isFavorite} onToggle={onToggleFavorite} />
          <button type="button" className="action-button share-button" onClick={handleShare}>
            {shareStatus || '分享解梦'}
          </button>
        </div>
      </div>
    </div>
  );
}
