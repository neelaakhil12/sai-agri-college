
export default function AnnouncementBar() {
  return (
    <div className="ann-stripe relative bg-blue text-white text-center py-2 px-6 text-[0.78rem] font-medium
      flex items-center justify-center gap-4 overflow-hidden">
      <span className="live-dot inline-flex items-center gap-2 bg-white/15 border border-white/30
        px-3 py-[3px] rounded-full text-[0.7rem] font-bold tracking-[.07em] uppercase">
        🎓 Admissions Open 2026–27
      </span>
      <span>
        Limited Seats Available&nbsp;–&nbsp;{" "}
        <a href="#contact" className="text-[#fde68a] font-bold no-underline hover:underline">
          Enquire Now →
        </a>
      </span>
    </div>
  );
}
