export default function SearchBox({ value, onChange, placeholder = '搜索梦境关键词，如：蛇、龙、水……' }) {
  return (
    <div className="search-box">
      <span className="search-icon">🔍</span>
      <input
        type="text"
        className="search-input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button
          type="button"
          className="search-clear"
          onClick={() => onChange('')}
          aria-label="清除"
        >
          ✕
        </button>
      )}
    </div>
  );
}
