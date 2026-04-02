import { Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { siteConfig } from "../../data/siteConfig";

const WhatsAppIcon = ({ size = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const courses = [
  { label: "Engineering Stream (MPC)", href: "/engineering" },
  { label: "Medical Stream (BIPC)",   href: "/medical" },
  { label: "Commerce Stream (MEC)",    href: "/commerce" }
];
const quickLinks = [
  { label: "About Us & Vision",  href: "/#about" },
  { label: "Our Faculty",        href: "/faculty" },
  { label: "Success Stories",    href: "/results" },
  { label: "Admission Enquiry",  href: "/#contact" },
  { label: "Contact & Location", href: "/#contact" },
];
const socialIcons = [
  { Icon: WhatsAppIcon, href: `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent("Hello! I am interested in SRI Aakash IIT-Medical Academy. Please provide more details.")}` },
];

export default function Footer() {
  return (
    <footer className="bg-ink pt-12 md:pt-14">
      <div className="max-w-site mx-auto px-5 md:px-7 pb-10 md:pb-12 border-b border-white/[.08]
        grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-8 md:gap-9">

        <div>
          <Link to="/" className="flex items-center gap-3 no-underline mb-1">
            <div className="flex items-center gap-1 flex-shrink-0">
              <img src="/logo.png" alt="SRI Aakash Academy" className="h-[32px] w-auto" />
              <img src="/logo2.png" alt="Aakash Junior College" className="h-[28px] w-auto" />
            </div>
            <div>
              <div className="font-lora text-[0.88rem] md:text-[0.9rem] font-bold text-white">SRI Aakash IIT-Medical Academy</div>
              <div className="text-[0.6rem] md:text-[0.62rem] text-[#93c5fd] font-semibold tracking-[.07em] uppercase">Aakash Junior College · Hyderabad</div>
            </div>
          </Link>
          <p className="text-[0.8rem] md:text-[0.82rem] text-white/45 leading-[1.72] mt-3 mb-[18px]">
            "{siteConfig.motto}" — Nine years of shaping Hyderabad's brightest futures.
            Recognised by the Govt. of Telangana (Code: {siteConfig.collegeCode}).
          </p>
          <div className="flex gap-2">
            {socialIcons.map(({ Icon, href }, i) => (
              <a key={i} href={href}
                className="w-[34px] h-[34px] rounded-lg flex items-center justify-center text-white/55
                  no-underline transition-all duration-200 hover:bg-blue hover:text-white"
                style={{ background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.10)" }}>
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h5 className="text-[0.72rem] md:text-[0.74rem] font-bold text-white/55 uppercase tracking-[.1em] mb-[14px]">Our Programs</h5>
          <ul className="list-none flex flex-col gap-2">
            {courses.map((c) => (
              <li key={c.label}><Link to={c.href} className="text-[0.8rem] md:text-[0.82rem] text-white/45 no-underline hover:text-[#93c5fd] transition-[color] duration-200">{c.label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h5 className="text-[0.72rem] md:text-[0.74rem] font-bold text-white/55 uppercase tracking-[.1em] mb-[14px]">Quick Links</h5>
          <ul className="list-none flex flex-col gap-2">
            {quickLinks.map((l) => (
              <li key={l.label}>
                {l.href.startsWith("/#") 
                  ? <a href={l.href} className="text-[0.8rem] md:text-[0.82rem] text-white/45 no-underline hover:text-[#93c5fd] transition-[color] duration-200">{l.label}</a>
                  : <Link to={l.href} className="text-[0.8rem] md:text-[0.82rem] text-white/45 no-underline hover:text-[#93c5fd] transition-[color] duration-200">{l.label}</Link>
                }
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h5 className="text-[0.72rem] md:text-[0.74rem] font-bold text-white/55 uppercase tracking-[.1em] mb-[14px]">Contact Us</h5>
          <ul className="list-none flex flex-col gap-3">
            <li className="text-[0.8rem] text-white/45 leading-[1.5]">{siteConfig.address}</li>
            <li>
              <a href={`tel:${siteConfig.phones[0]}`} className="flex items-center gap-2 text-[0.8rem] text-white/45 no-underline hover:text-[#93c5fd] transition-[color] duration-200">
                <Phone size={13} /> {siteConfig.phonesDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-2 text-[0.8rem] text-white/45 no-underline hover:text-[#93c5fd] transition-[color] duration-200">
                <Mail size={13} /> {siteConfig.email}
              </a>
            </li>
            <li className="text-[0.8rem] text-white/45">{siteConfig.accreditation} · Code: {siteConfig.collegeCode}</li>
          </ul>
        </div>
      </div>

      <div className="max-w-site mx-auto px-5 md:px-7 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <p className="text-[0.72rem] md:text-[0.74rem] text-white/28">
          © 2025 <span className="text-[#93c5fd]">SRI Aakash IIT-Medical Academy / Aakash Junior College</span>. All Rights Reserved.
        </p>
        <p className="text-[0.72rem] md:text-[0.74rem] text-white/28">
          Designed by <a href="https://www.codtechitsolutions.com/" target="_blank" rel="noopener noreferrer" className="text-[#93c5fd] no-underline hover:text-white transition-colors duration-200">CODTECH IT Solutions</a>
        </p>
      </div>
    </footer>
  );
}
