import { useScrollReveal } from "../hooks/useScrollReveal";

// Sections
import HeroSlider   from "../components/sections/HeroSlider";
import StatsBand    from "../components/sections/StatsBand";
import About        from "../components/sections/About";
import Programs     from "../components/sections/Programs";
import Features     from "../components/sections/Features";
import Faculty      from "../components/sections/Faculty";
import Achievers    from "../components/sections/Achievers";
import WhyChooseUs  from "../components/sections/WhyChooseUs";
import Testimonials from "../components/sections/Testimonials";
import Gallery      from "../components/sections/Gallery";
import FAQ          from "../components/sections/FAQ";
import CTABand      from "../components/sections/CTABand";
import Contact      from "../components/sections/Contact";

export default function Home() {
  useScrollReveal();

  return (
    <>
      <HeroSlider />
      <StatsBand />
      <About />
      <Programs />
      <Features />
      <Faculty />
      <Achievers />
      <WhyChooseUs />
      <Testimonials />
      <Gallery />
      <FAQ />
      <CTABand />
      <Contact />
    </>
  );
}
