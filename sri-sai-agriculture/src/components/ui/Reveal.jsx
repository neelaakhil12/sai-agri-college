export default function Reveal({ children, delay = 0, className = "", ...props }) {
  return (
    <div
      className={`rv ${className}`}
      style={{ transitionDelay: delay ? `${delay}s` : undefined }}
      {...props}
    >
      {children}
    </div>
  );
}
