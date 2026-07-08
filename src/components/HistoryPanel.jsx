export default function HistoryPanel({ history, onSelect, onRemove, onClear }) {
  if (!history || history.length === 0) return null;

  return (
    <section className="history-section">
      <div className="section-header">
        <h2 className="section-title">最近解梦</h2>
        <button type="button" className="text-button" onClick={onClear}>清空</button>
      </div>
      <div className="history-list">
        {history.map(item => (
          <div key={item.id} className="history-item">
            <button
              type="button"
              className="history-query"
              onClick={() => onSelect(item.query)}
            >
              {item.query}
            </button>
            <button
              type="button"
              className="history-remove"
              onClick={() => onRemove(item.id)}
              aria-label="删除"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
