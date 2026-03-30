import { Facebook, Instagram, Youtube, MessageCircle, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { siteConfig } from "../../data/siteConfig";

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
  { Icon: Facebook,      href: "#" },
  { Icon: Instagram,     href: "#" },
  { Icon: Youtube,       href: "#" },
  { Icon: MessageCircle, href: `https://wa.me/${siteConfig.whatsapp}` },
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
          <span className="text-[#93c5fd]">Recognised by Govt. of T.S.</span> · Code: <span className="text-[#93c5fd]">{siteConfig.collegeCode}</span>
        </p>
      </div>
    </footer>
  );
}
