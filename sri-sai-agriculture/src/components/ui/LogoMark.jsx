export default function LogoMark({ size = 44 }) {
  return (
    <div
      className="flex items-center justify-center rounded-[10px] flex-shrink-0"
      style={{
        width: size, height: size,
        background: "linear-gradient(135deg, #1347a0, #1c5abf)",
        boxShadow: "0 4px 12px rgba(19,71,160,.3)",
      }}
    >
      <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 28 28" fill="none">
        <path d="M14 2L26 8.5V19.5L14 26L2 19.5V8.5L14 2Z"
          stroke="#93c5fd" strokeWidth="1.5" fill="rgba(147,197,253,.1)" />
        <path d="M14 7L10 21H12.8L14 16.5L15.2 21H18L14 7Z" fill="#93c5fd" />
      </svg>
    </div>
  );
}
