import Reveal from "./Reveal";

export default function PageHeader({ title, subtitle }) {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden"
      style={{ background: "linear-gradient(135deg,#0b1220 0%,#15803d 60%,#065f46 100%)" }}>

      {/* Subtle decorative circles */}
      <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full opacity-[0.07]"
        style={{ background: "radial-gradient(circle,#fff 0%,transparent 70%)" }} />
      <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full opacity-[0.06]"
        style={{ background: "radial-gradient(circle,#93c5fd 0%,transparent 70%)" }} />

      <div className="max-w-site mx-auto px-5 md:px-7 relative z-10 text-center">
        <Reveal>
          <h1 className="font-lora text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-white/65 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}
        </Reveal>
      </div>

      {/* Bottom border accent */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </section>
  );
}
