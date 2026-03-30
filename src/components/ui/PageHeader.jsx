import Reveal from "./Reveal";

export default function PageHeader({ title, subtitle, bgImage }) {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-ink">
      {/* Background Image with Overlay */}
      {bgImage && (
        <div className="absolute inset-0 z-0">
          <img 
            src={bgImage} 
            alt={title} 
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
        </div>
      )}
      
      <div className="max-w-site mx-auto px-5 md:px-7 relative z-10 text-center">
        <Reveal>
          <h1 className="font-lora text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}
        </Reveal>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </section>
  );
}
