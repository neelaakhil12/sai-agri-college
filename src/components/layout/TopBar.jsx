import { Phone, Mail } from "lucide-react";
import { siteConfig } from "../../data/siteConfig";

export default function TopBar() {
  return (
    <div className="bg-ink py-[6px] text-[0.72rem] text-white/60 hidden sm:block">
      <div className="max-w-site mx-auto px-5 md:px-7 flex items-center justify-between flex-wrap gap-[6px]">
        <div className="flex items-center gap-[10px] flex-wrap">
          <span className="bg-[rgba(79,70,229,.3)] border border-[rgba(99,102,241,.5)] text-[#a5b4fc]
            px-[10px] py-[2px] rounded text-[0.65rem] font-bold tracking-[.07em] uppercase">
            {siteConfig.accreditation}
          </span>
          <span>College Code: <strong className="text-white">{siteConfig.collegeCode}</strong></span>
        </div>
        <div className="flex items-center flex-wrap gap-1">
          <span className="flex items-center gap-1">
            <Phone size={11} />
            {siteConfig.phones.map((p, i) => (
              <span key={p}>
                <a href={`tel:${p}`} className="text-[#93c5fd] hover:text-[#bfdbfe] no-underline">
                  {i === 0 ? p : p.slice(-2)}
                </a>
                {i < siteConfig.phones.length - 1 && " / "}
              </span>
            ))}
          </span>
          <span className="mx-2 opacity-30">|</span>
          <span className="flex items-center gap-1">
            <Mail size={11} />
            <a href={`mailto:${siteConfig.email}`} className="text-[#93c5fd] hover:text-[#bfdbfe] no-underline">
              {siteConfig.email}
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}
