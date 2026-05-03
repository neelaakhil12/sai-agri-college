import React, { useEffect } from "react";
import { useImageModal } from "../hooks/useImageModal";
import PageHeader from "../components/ui/PageHeader";
import Contact from "../components/sections/Contact";
import Reveal from "../components/ui/Reveal";

export default function ActivitiesPage() {
  const { openModal } = useImageModal();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-cream min-h-screen">
      <PageHeader 
        title="Student Activities" 
        subtitle="Exploring learning beyond the classroom with practical exposure."
      />
      
      {/* Internship Section */}
      <section id="internship" className="py-20 bg-white">
        <div className="max-w-site mx-auto px-5 md:px-7">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-lora font-bold text-ink mb-6">
              <em className="text-blue">Internship</em> Programs
            </h2>
            <div className="bg-sky/50 rounded-2xl p-8 md:p-12 border border-[#e2e8f0] mb-8">
              <p className="text-ink/70 text-lg leading-relaxed mb-6">
                Our flagship internship program provides students with unparalleled hands-on experience in the agricultural sector. 
                Most recently, our students successfully completed an intensive internship program at <strong>Prasad Seeds</strong>, 
                a prestigious multinational corporation (MNC) and a global leader in the seed industry. 
                During this placement, students gained invaluable exposure to advanced seed processing, quality control, genetics research, and global agricultural supply chains.
              </p>
              <ul className="list-disc list-inside text-ink/70 text-lg space-y-2">
                <li>Exclusive placement at Prasad Seeds (MNC) for real-world industry training.</li>
                <li>Exposure to state-of-the-art agricultural technologies and seed processing.</li>
                <li>Live projects, problem-solving, and direct mentorship by top industry professionals.</li>
              </ul>
            </div>

            {/* Internship Video */}
            <div className="rounded-2xl h-full min-h-[300px] mb-8 flex items-center justify-center overflow-hidden border border-[#e2e8f0] shadow-sm transform transition-transform hover:scale-[1.02]">
              <video 
                src="/field-visit-media/field-video.mp4" 
                controls 
                autoPlay 
                loop 
                muted 
                playsInline
                className="w-full h-full object-cover max-h-[400px] bg-slate-900"
              >
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Internship Photo Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="overflow-hidden bg-sky rounded-xl border border-[#e2e8f0] hover:scale-[1.03] hover:shadow-xl transition-all duration-300">
                  <img 
                    src={`/internship-photos/intern-${item}.png`} 
                    alt={`Prasad Seeds Internship Photo ${item}`} 
                    className="w-full h-full aspect-square object-cover object-center cursor-pointer" 
                    onClick={() => openModal(`/internship-photos/intern-${item}.png`)}
                  />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Field Visit Section */}
      <section id="field-visit" className="py-20 bg-cream">
        <div className="max-w-site mx-auto px-5 md:px-7">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-lora font-bold text-ink mb-6">
              <em className="text-blue">Field Visit</em>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <p className="text-ink/70 text-lg leading-relaxed mb-6">
                  Practical exposure is key to understanding agricultural sciences. Our regular field visits
                  to agricultural research stations, progressive farms, and agro-industries expose students 
                  to the latest farming techniques, crop management practices, and agricultural machinery.
                </p>
                <div className="bg-white p-6 rounded-xl border border-[#e2e8f0] shadow-sm">
                  <h4 className="font-bold text-ink mb-2">Key Highlights:</h4>
                  <ul className="list-disc list-inside text-ink/70 space-y-2">
                    <li>Visits to ICAR institutes and state agricultural universities.</li>
                    <li>Interaction with progressive farmers and agronomists.</li>
                    <li>Hands-on learning of modern irrigation and farming equipment.</li>
                  </ul>
                </div>
              </div>
              <div className="rounded-2xl h-full min-h-[300px] flex items-center justify-center overflow-hidden border border-[#e2e8f0] shadow-sm transform transition-transform hover:scale-[1.02]">
                <video 
                  src="/field-visit-media/field-video.mp4" 
                  controls 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  className="w-full h-full object-cover aspect-video md:aspect-auto"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>

            {/* Field Visit Photo Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                <div key={item} className="overflow-hidden bg-sky rounded-xl border border-[#e2e8f0] hover:scale-[1.03] hover:shadow-xl transition-all duration-300">
                  <img 
                    src={`/field-visit-media/field-${item}.png`} 
                    alt={`Sri Sai Field Visit Photo ${item}`} 
                    className="w-full h-full aspect-square object-cover object-center cursor-pointer" 
                    onClick={() => openModal(`/field-visit-media/field-${item}.png`)}
                  />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="py-20 bg-white">
        <div className="max-w-site mx-auto px-5 md:px-7">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-lora font-bold text-ink mb-6">
              Campus <em className="text-blue">Events</em>
            </h2>
            <p className="text-ink/70 text-lg leading-relaxed mb-10 max-w-3xl">
              Life at Sri Sai Institute extends beyond academics. We organize various technical fests, 
              cultural events, and agricultural exhibitions that foster a spirit of teamwork, creativity, 
              and leadership among our students.
            </p>
            
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-8 mb-8">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="overflow-hidden bg-sky rounded-xl border border-[#e2e8f0] hover:scale-[1.03] hover:shadow-xl transition-all duration-300">
                  <img 
                    src={`/events-photos/event-${item}.png`} 
                    alt={`Sri Sai Institute Event Photo ${item}`} 
                    className="w-full h-full aspect-square md:aspect-[4/3] object-cover object-center cursor-pointer" 
                    onClick={() => openModal(`/events-photos/event-${item}.png`)}
                  />
                </div>
              ))}
            </div>

            {/* Events Video */}
            <div className="rounded-2xl h-full min-h-[300px] flex items-center justify-center overflow-hidden border border-[#e2e8f0] shadow-sm transform transition-transform hover:scale-[1.02]">
              <video 
                src="/field-visit-media/field-video.mp4" 
                controls 
                autoPlay 
                loop 
                muted 
                playsInline
                className="w-full h-full object-cover max-h-[400px] bg-slate-900"
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Trip Photos Section */}
      <section id="trip-photos" className="py-20 bg-cream">
        <div className="max-w-site mx-auto px-5 md:px-7">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-lora font-bold text-ink mb-6 text-center">
              Our <em className="text-blue">Trip Photos</em>
            </h2>
            <p className="text-ink/70 text-lg leading-relaxed mb-10 max-w-3xl mx-auto text-center">
              Memories from our educational excursions, field visits, and campus tours. We believe that learning is an adventure.
            </p>
            
            {/* Photo Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="overflow-hidden bg-sky rounded-xl border border-[#e2e8f0] hover:scale-[1.03] hover:shadow-xl transition-all duration-300">
                  <img 
                    src={`/trip-photos/trip-${item}.png`} 
                    alt={`Educational Trip Photo ${item}`} 
                    className="w-full h-full aspect-square object-cover object-center cursor-pointer" 
                    onClick={() => openModal(`/trip-photos/trip-${item}.png`)}
                  />
                </div>
              ))}
            </div>

            {/* Trip Photos Video */}
            <div className="rounded-2xl h-full min-h-[300px] flex items-center justify-center overflow-hidden border border-[#e2e8f0] shadow-sm transform transition-transform hover:scale-[1.02]">
              <video 
                src="/field-visit-media/field-video.mp4" 
                controls 
                autoPlay 
                loop 
                muted 
                playsInline
                className="w-full h-full object-cover max-h-[400px] bg-slate-900"
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </Reveal>
        </div>
      </section>

      <Contact />
    </div>
  );
}
