import { CATEGORIES } from '../data/categories.js';

export default function CategoryGrid({ onSelect, onShowAll }) {
  return (
    <section className="category-section">
      <div className="section-header">
        <h2 className="section-title">梦境分类</h2>
        <button
          type="button"
          className="text-button"
          onClick={onShowAll}
        >
          全部
        </button>
      </div>
      <div className="category-grid">
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            type="button"
            className="category-card"
            onClick={() => onSelect(cat.id)}
          >
            <span className="category-icon">{cat.icon}</span>
            <span className="category-name">{cat.name}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
