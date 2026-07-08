import { getFortuneStyle } from '../utils/fortuneStyle.js';

export default function FortuneBadge({ fortune }) {
  const style = getFortuneStyle(fortune);
  return (
    <span
      className={`fortune-badge ${style.className}`}
      style={{ '--fortune-color': style.color }}
    >
      {style.label}
    </span>
  );
}
