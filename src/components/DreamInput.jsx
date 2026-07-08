export default function DreamInput({ value = '', onChange, onSubmit }) {
  const handleSubmit = () => {
    if (!value.trim()) return;
    onSubmit(value.trim());
  };

  return (
    <div className="dream-input-section">
      <label className="dream-input-label">描述你的梦境</label>
      <textarea
        className="dream-textarea"
        rows={4}
        placeholder="例如：我梦见龙在天上飞，周围金光闪闪……"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <button type="button" className="dream-submit-button" onClick={handleSubmit}>
        <span className="submit-icon">☯</span>
        开始解梦
      </button>
    </div>
  );
}
