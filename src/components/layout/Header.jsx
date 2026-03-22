import { useState, useRef, useEffect } from "react";
import { siteConfig } from "../../data/siteConfig";
import LogoMark from "../ui/LogoMark";

function PhoneIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07
        8.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 0h3a2 2 0 012 1.72 19.79 19.79 0 00.7
        2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 19.79
        19.79 0 002.81.7A2 2 0 0122 14.92z" />
    </svg>
  );
}

function ChevronDown({ open }) {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      style={{ transition: "transform .2s", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function NavLink({ href, children, onClick }) {
  return (
    <a href={href} onClick={onClick}
      className="flex items-center gap-1 text-[0.83rem] font-medium text-[#374151] no-underline
        px-[13px] py-2 rounded-lg transition-all duration-[180ms]
        hover:bg-sky hover:text-blue whitespace-nowrap">
      {children}
    </a>
  );
}

function NavDropdown({ label, href, items, onClose }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close on outside click
  useEffect(() => {
    function handler(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close on Escape
  useEffect(() => {
    function handler(e) { if (e.key === "Escape") setOpen(false); }
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="true"
        className="flex items-center gap-1 text-[0.83rem] font-medium text-[#374151]
          px-[13px] py-2 rounded-lg transition-all duration-[180ms] bg-transparent border-none
          cursor-pointer hover:bg-sky hover:text-blue whitespace-nowrap font-sora">
        {label} <ChevronDown open={open} />
      </button>
      {open && (
        <div className="absolute top-[calc(100%+6px)] left-0 bg-white border border-[#e2e8f0]
          rounded-xl p-[6px] min-w-[210px] shadow-[0_16px_48px_rgba(0,0,0,.11)] z-[300]">
          {items.map((item, i) => (
            <div key={i}>
              {item.divider
                ? <div className="h-px bg-[#e2e8f0] my-1" />
                : <a href={item.href || href}
                    onClick={() => { setOpen(false); onClose?.(); }}
                    className="block px-[13px] py-[9px] rounded-lg text-[0.81rem] font-medium
                      text-[#374151] no-underline transition-all duration-150
                      hover:bg-sky hover:text-blue focus:outline-none focus:bg-sky focus:text-blue">
                    {item.label}
                  </a>
              }
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    {
      type: "dropdown", label: "Engineering Stream", href: "#programs",
      items: [
        { label: "MPC – Overview" },
        { divider: true },
        { label: "JEE Mains – Super 40 Batch" },
        { label: "JEE Advanced Track" },
        { label: "EAPCET Preparation" },
      ],
    },
    {
      type: "dropdown", label: "Medical Stream", href: "#programs",
      items: [
        { label: "BIPC – Overview" },
        { divider: true },
        { label: "NEET Target Batch – 40" },
        { label: "Full Medical Programme" },
        { label: "EAPCET Preparation" },
      ],
    },
    { type: "link", label: "Commerce Stream", href: "#programs" },
    { type: "link", label: "Faculty", href: "#faculty" },
    { type: "link", label: "Results", href: "#achievers" },
  ];

  return (
    <header className="bg-white border-b border-[#e2e8f0] sticky top-0 z-[200]
      shadow-[0_2px_12px_rgba(0,0,0,.07)]">
      <div className="max-w-site mx-auto px-7 flex items-center justify-between h-[70px] gap-5">

        {/* Logo */}
        <a href="/" className="flex items-center gap-2 md:gap-3 no-underline flex-shrink-0 max-w-[70%] sm:max-w-none">
          <LogoMark size={38} className="md:w-[44px] md:h-[44px]" />
          <div className="min-w-0">
            <div className="font-lora text-[0.85rem] md:text-[0.95rem] font-bold text-ink leading-[1.2] truncate sm:whitespace-normal">
              SRI Aakash IIT-Medical Academy
              <span className="hidden xs:inline-block bg-sky2 text-blue border border-[#bfdbfe] px-[6px] md:px-[9px] py-[1px] md:py-[2px]
                rounded text-[0.6rem] md:text-[0.65rem] font-bold tracking-[.05em] ml-[6px] whitespace-nowrap">
                Code: {siteConfig.collegeCode}
              </span>
            </div>
            <span className="text-[0.58rem] md:text-[0.63rem] font-semibold text-blue tracking-[.07em] uppercase block mt-[1px] truncate">
              {siteConfig.tagline}
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-[2px]">
          {navItems.map((item, i) =>
            item.type === "dropdown"
              ? <NavDropdown key={i} label={item.label} href={item.href} items={item.items} />
              : <NavLink key={i} href={item.href}>{item.label}</NavLink>
          )}

          <a href={`tel:${siteConfig.phones[0]}`}
            className="flex items-center gap-[6px] border-[1.5px] border-[#e2e8f0] text-ink
              px-[14px] py-[9px] rounded-lg font-semibold text-[0.81rem] no-underline
              transition-all duration-200 whitespace-nowrap
              hover:border-blue hover:text-blue hover:bg-sky">
            <PhoneIcon /> Call Us
          </a>

          <a href="#contact"
            className="bg-orange text-white px-5 py-[10px] rounded-lg font-bold text-[0.83rem]
              no-underline shadow-[0_4px_12px_rgba(224,92,26,.28)] transition-all duration-200
              whitespace-nowrap hover:bg-[#c94f14] hover:-translate-y-[1px]
              hover:shadow-[0_6px_18px_rgba(224,92,26,.38)]">
            Admission Enquiry
          </a>
        </nav>

        {/* Mobile: CTA + Hamburger */}
        <div className="flex lg:hidden items-center gap-1 sm:gap-2">
          <a href="#contact"
            className="hidden sm:inline-block bg-orange text-white px-4 py-[9px] rounded-lg font-bold text-[0.8rem]
              no-underline whitespace-nowrap">
            Enquire
          </a>
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="w-[36px] h-[36px] md:w-[40px] md:h-[40px] flex flex-col items-center justify-center gap-[4px] md:gap-[5px]
              bg-transparent border-none cursor-pointer rounded-lg hover:bg-sky transition-colors">
            <span className={`block w-5 h-[2px] bg-ink rounded transition-all duration-200
              ${menuOpen ? "rotate-45 translate-y-[6px] md:translate-y-[7px]" : ""}`} />
            <span className={`block w-3 h-[2px] bg-ink rounded transition-all duration-200
              ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-[2px] bg-ink rounded transition-all duration-200
              ${menuOpen ? "-rotate-45 -translate-y-[6px] md:translate-y-[7px]" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-[#e2e8f0] px-5 py-4 flex flex-col gap-1
          shadow-[0_8px_24px_rgba(0,0,0,.08)]">
          {navItems.map((item, i) =>
            item.type === "dropdown"
              ? (
                <MobileDropdown key={i} label={item.label} href={item.href} items={item.items}
                  onClose={() => setMenuOpen(false)} />
              )
              : (
                <a key={i} href={item.href} onClick={() => setMenuOpen(false)}
                  className="px-3 py-[10px] text-[0.88rem] font-medium text-ink no-underline
                    rounded-lg hover:bg-sky hover:text-blue transition-colors">
                  {item.label}
                </a>
              )
          )}
          <div className="border-t border-[#e2e8f0] mt-2 pt-3 flex flex-col gap-2">
            <a href={`tel:${siteConfig.phones[0]}`}
              className="flex items-center gap-2 px-3 py-[10px] text-[0.88rem] font-semibold
                text-ink no-underline rounded-lg border border-[#e2e8f0] hover:border-blue
                hover:text-blue hover:bg-sky transition-colors">
              <PhoneIcon /> {siteConfig.phones[0]}
            </a>
            <a href="#contact" onClick={() => setMenuOpen(false)}
              className="bg-orange text-white px-4 py-[11px] rounded-lg font-bold text-[0.88rem]
                no-underline text-center">
              Admission Enquiry
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

function MobileDropdown({ label, href, items, onClose }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-3 py-[10px] text-[0.88rem]
          font-medium text-ink rounded-lg hover:bg-sky hover:text-blue transition-colors
          bg-transparent border-none cursor-pointer font-sora text-left">
        {label}
        <ChevronDown open={open} />
      </button>
      {open && (
        <div className="ml-3 flex flex-col gap-[2px] mb-1">
          {items.filter((it) => !it.divider).map((item, i) => (
            <a key={i} href={item.href || href} onClick={onClose}
              className="px-3 py-[8px] text-[0.83rem] text-muted no-underline rounded-lg
                hover:bg-sky hover:text-blue transition-colors">
              {item.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
