// Five stars for a rating. Amber for filled, light grey for empty.

const PATH =
  "M12 2.6l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.4l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z";

export default function Stars({
  rating,
  size = 18,
  label,
}: {
  rating: number;
  size?: number;
  label: string;
}) {
  const full = Math.round(rating);
  return (
    <span role="img" aria-label={label} style={{ display: "inline-flex", gap: 2, lineHeight: 0 }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
          <path d={PATH} fill={i <= full ? "#ffae19" : "#d5d8dc"} />
        </svg>
      ))}
    </span>
  );
}
