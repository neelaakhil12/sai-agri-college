require("dotenv").config({ path: "../.env" });
const supabase = require("../utils/supabaseClient");

const DATA = {
  faculty: [
    { name: "Divi Vamsi Krishna", initials: "DV", department: "Agriculture", experience: "Lead Faculty", category: "bio" },
    { name: "Sudhineedi Ramesh", initials: "SR", department: "Science", experience: "Research Expert", category: "chem" },
    { name: "Patchala Thomas", initials: "PT", department: "Agriculture", experience: "Senior Faculty", category: "bio" },
  ],
  courses: [
    { id: "bsc-agri", stream: "Undergraduate", badge: "Agriculture Stream", title: "B.Sc Agriculture", description: "Modern agricultural techniques and soil science.", eligibility: "Intermediate Pass", seatsLabel: "40 Seats" },
    { id: "msc-agri", stream: "Postgraduate", badge: "Agriculture Stream", title: "M.Sc Agriculture", description: "Advanced research in agricultural sciences.", eligibility: "B.Sc Agriculture Pass", seatsLabel: "40 Seats" },
    { id: "msc-sciences", stream: "Postgraduate", badge: "Science Programs", title: "M.Sc Biology, Chemistry & Zoology", description: "Core science research degrees.", eligibility: "B.Sc Pass", seatsLabel: "Limited" },
  ],
  stories: [
    { name: "K. Rakesh", category: "B.Sc Agriculture", achievement: "Agronomy Research Fellow", story: "Research Scholar at Sri Sai" },
    { name: "S. Anusha", category: "M.Sc Research", achievement: "Sustainable Farming Project", story: "Research excellence" },
    { name: "Dr. Vineeth", category: "M.Sc Research", achievement: "Genetic Research", story: "Research excellence" },
  ],
  testimonials: [
    { studentName: "K. Rakesh", initials: "KR", achievement: "B.Sc Agriculture Scholar", quote: "Personalized attention made all the difference.", stars: 5 },
    { studentName: "S. Anusha", initials: "SA", achievement: "M.Sc Research Fellow", quote: "Structured field visits helped a lot.", stars: 5 },
  ],
  gallery: [
    { image: "/gallery/1.png", sub_label: "Main Campus", label: "Main Academic Block" },
    { image: "/gallery/2.png", sub_label: "Research Lab", label: "Advanced Soil Analysis" },
    { image: "/gallery/3.png", sub_label: "Field Work", label: "Experimental Research Plot" },
  ],
  hero: [
    { tag: "🎓 Admissions Open 2026–27", h1: 'Welcome to <em class="italic text-[#fde68a]">Sri Sai Institute</em>', motto: '"Empowering the Future of Agriculture through Excellence."', description: "Offering professional B.Sc and M.Sc programs.", btn1_label: "Apply Now", btn1_href: "#contact" }
  ]
};

async function sync() {
  try {
    for (const [table, items] of Object.entries(DATA)) {
      console.log(`Syncing ${table}...`);
      const { data, error } = await supabase.from(table).select("id").limit(1);
      if (error) {
         console.error(`Error checking ${table}:`, error);
         continue;
      }
      if (!data || data.length === 0) {
        const { error: insErr } = await supabase.from(table).insert(items);
        if (insErr) {
          console.error(`Error inserting into ${table}:`, insErr);
        } else {
          console.log(`✅ ${table} synced.`);
        }
      } else {
        console.log(`ℹ️ ${table} already has data.`);
      }
    }
  } catch (err) {
    console.error("Fatal Error:", err);
  }
}

sync();
