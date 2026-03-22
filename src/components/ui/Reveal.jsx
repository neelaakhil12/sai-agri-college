export default function Reveal({ children, delay = 0, className = "" }) {
  return (
    <div
      className={`rv ${className}`}
      style={{ transitionDelay: delay ? `${delay}s` : undefined }}
    >
      {children}
    </div>
  );
}
