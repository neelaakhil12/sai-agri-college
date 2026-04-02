import { Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { siteConfig } from "../../data/siteConfig";

const courses = [
  { label: "B.Sc Agriculture",  href: "/about" },
  { label: "M.Sc Agriculture",  href: "/about" },
  { label: "M.Sc Biology",      href: "/about" },
  { label: "M.Sc Chemistry",    href: "/about" },
  { label: "M.Sc Zoology",      href: "/about" },
];
const quickLinks = [
  { label: "About Us",           href: "/about" },
  { label: "Our Faculty",        href: "/faculty" },
  { label: "Results",            href: "/results" },
  { label: "Hostel",             href: "/hostel" },
  { label: "Admission Enquiry",  href: "/#contact" },
];

export default function Footer() {
  return (
    <footer className="bg-white pt-12 md:pt-14 border-t border-[#e2e8f0]">
      <div className="max-w-site mx-auto px-5 md:px-7 pb-10 md:pb-12 border-b border-[#e2e8f0]
        grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-8 md:gap-9">

        <div>
          <Link to="/" className="flex items-center gap-3 no-underline mb-4 group">
            <img 
               src="/logo.png" 
               alt="Sri Sai Agri Institute Logo" 
               className="h-[50px] md:h-[60px] w-auto transition-opacity duration-300 group-hover:opacity-80"
             />
            <div className="flex flex-col leading-tight">
              <span className="font-lora text-[1.2rem] font-bold text-blue tracking-tight uppercase">Sri Sai Institute</span>
              <span className="text-[0.6rem] font-black text-muted tracking-[0.14em] -mt-1 uppercase">Of Agriculture Sciences</span>
            </div>
          </Link>
          <p className="text-[0.8rem] md:text-[0.82rem] text-ink/65 leading-[1.72] mt-3 mb-[18px]">
            "{siteConfig.motto}" — Dedicated to excellence in agricultural education and research for nine years.
          </p>
        </div>

        <div>
          <h5 className="text-[0.72rem] md:text-[0.74rem] font-bold text-ink/40 uppercase tracking-[.1em] mb-[14px]">Our Programs</h5>
          <ul className="list-none flex flex-col gap-2">
            {courses.map((c) => (
              <li key={c.label}><Link to={c.href} className="text-[0.8rem] md:text-[0.82rem] text-ink/70 no-underline hover:text-blue transition-[color] duration-200">{c.label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h5 className="text-[0.72rem] md:text-[0.74rem] font-bold text-ink/40 uppercase tracking-[.1em] mb-[14px]">Quick Links</h5>
          <ul className="list-none flex flex-col gap-2">
            {quickLinks.map((l) => (
              <li key={l.label}>
                {l.href.startsWith("/#") 
                  ? <a href={l.href} className="text-[0.8rem] md:text-[0.82rem] text-ink/70 no-underline hover:text-blue transition-[color] duration-200">{l.label}</a>
                  : <Link to={l.href} className="text-[0.8rem] md:text-[0.82rem] text-ink/70 no-underline hover:text-blue transition-[color] duration-200">{l.label}</Link>
                }
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h5 className="text-[0.72rem] md:text-[0.74rem] font-bold text-ink/40 uppercase tracking-[.1em] mb-[14px]">Contact Us</h5>
          <ul className="list-none flex flex-col gap-3">
            <li className="text-[0.8rem] text-ink/60 leading-[1.5]">{siteConfig.address}</li>
            <li>
              <a href={`tel:${siteConfig.phones[0]}`} className="flex items-center gap-2 text-[0.8rem] text-ink/70 no-underline hover:text-blue transition-[color] duration-200">
                <Phone size={13} className="text-blue" /> {siteConfig.phonesDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-2 text-[0.8rem] text-ink/70 no-underline hover:text-blue transition-[color] duration-200">
                <Mail size={13} className="text-blue" /> {siteConfig.email}
              </a>
            </li>
            <li className="text-[0.8rem] text-ink/60">{siteConfig.accreditation}</li>
          </ul>
        </div>
      </div>

      <div className="max-w-site mx-auto px-5 md:px-7 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <p className="text-[0.72rem] md:text-[0.74rem] text-ink/30">
          © {new Date().getFullYear()} <span className="text-blue/80 font-semibold">Sri Sai Institute of Agriculture Sciences</span>. All Rights Reserved.
        </p>
        <p className="text-[0.72rem] md:text-[0.74rem] text-ink/30">
           Designed by <a href="https://www.codtechitsolutions.com/" target="_blank" rel="noopener noreferrer" className="text-blue/80 no-underline hover:text-blue font-semibold transition-colors duration-200">CODTECH IT Solutions</a>
        </p>
      </div>
    </footer>
  );
}
