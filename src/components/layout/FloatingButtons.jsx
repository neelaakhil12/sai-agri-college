import { Phone, MessageCircle } from "lucide-react";
import { siteConfig } from "../../data/siteConfig";

export default function FloatingButtons() {
  return (
    <div className="fixed bottom-4 right-3 md:bottom-6 md:right-6 z-[500] flex flex-col gap-2 md:gap-[9px] items-end">
      <a href={`https://wa.me/${siteConfig.whatsapp}`}
        className="flex items-center gap-2 md:gap-[9px] text-white px-3 md:px-4 py-2 md:py-[11px]
          rounded-full font-bold text-[0.75rem] md:text-[0.83rem] no-underline transition-all duration-200 hover:scale-[1.03]"
        style={{ background: "#25d366", boxShadow: "0 4px 16px rgba(37,211,102,.38)" }}>
        <MessageCircle size={14} className="md:size-[16px]" />
        <span className="hidden xs:inline sm:inline">WhatsApp Us</span>
      </a>
      <a href={`tel:${siteConfig.phones[0]}`}
        className="flex items-center gap-2 md:gap-[9px] text-white px-3 md:px-[18px] py-2 md:py-3
          rounded-full font-bold text-[0.78rem] md:text-[0.87rem] no-underline transition-all duration-200 hover:scale-[1.03]"
        style={{ background: "#e05c1a", boxShadow: "0 6px 22px rgba(224,92,26,.42)", animation: "fpulse 3s infinite" }}>
        <Phone size={14} className="md:size-[16px]" />
        <span className="hidden xs:inline sm:inline">Call Now</span>
      </a>
    </div>
  );
}
