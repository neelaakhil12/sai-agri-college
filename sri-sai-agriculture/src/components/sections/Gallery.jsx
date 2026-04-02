import Reveal from "../ui/Reveal";
import SectionHeader from "../ui/SectionHeader";

const items = [
  { img: "/gallery/1.png",  sub: "Main Campus",         label: "Main Academic Block" },
  { img: "/gallery/2.png",  sub: "Research Lab",        label: "Advanced Soil Analysis" },
  { img: "/gallery/3.png",  sub: "Field Work",          label: "Experimental Research Plot" },
  { img: "/gallery/4.png",  sub: "Classrooms",          label: "Digital Learning Hall" },
  { img: "/gallery/5.png",  sub: "Hostels",             label: "Modern Student Housing" },
  { img: "/gallery/6.png",  sub: "Library",             label: "Scientific Resource Center" },
  { img: "/gallery/7.png",  sub: "Agriculture Labs",    label: "Plant Pathology Unit" },
  { img: "/gallery/8.png",  sub: "Practical Field",     label: "Agronomy Research Area" },
  { img: "/gallery/9.png",  sub: "Campus Life",         label: "Green Campus Environment" },
  { img: "/gallery/10.png", sub: "Admissions Hub",      label: "Enquiry & Counseling Center" },
];

export default function Gallery() {
  return (
    <section className="py-16 md:py-24 bg-cream">
      <div className="max-w-site mx-auto px-5 md:px-7">
        <Reveal className="text-center max-w-[600px] mx-auto mb-12">
          <SectionHeader label="Campus Life" title='Life at <em>Sri Sai Institute</em>' center />
          <p className="text-ink/60 text-sm mt-4">Exploring our modern infrastructure, research residencies, and state-of-the-art agricultural science laboratories.</p>
        </Reveal>

        {/* Improved Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {items.map((item, i) => {
            // Define spans for a bento-style layout
            let spanClass = "col-span-1 row-span-1 h-[250px]";
            if (i === 0) spanClass = "lg:col-span-2 lg:row-span-2 h-[350px] lg:h-[520px]";
            else if (i === 3) spanClass = "lg:col-span-1 lg:row-span-2 h-[250px] lg:h-[520px]";
            else if (i === 6) spanClass = "sm:col-span-2 lg:col-span-2 h-[250px]";
            else if (i === 9) spanClass = "sm:col-span-2 lg:col-span-1 h-[250px]";

            return (
              <Reveal key={i} delay={i * 0.05}
                className={`rounded-2xl overflow-hidden relative group cursor-pointer border border-ink/5 shadow-md ${spanClass}`}>
                
                {/* Image */}
                <img 
                  src={item.img} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  alt={item.label} 
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                
                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-5 lg:p-7">
                  <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    {item.sub && (
                      <span className="inline-block bg-blue/90 text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded mb-2">
                        {item.sub}
                      </span>
                    )}
                    <h3 className="text-white text-lg lg:text-xl font-bold leading-tight drop-shadow-md">
                      {item.label}
                    </h3>
                  </div>
                </div>

                {/* Decorative border on hover */}
                <div className="absolute inset-4 border border-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
