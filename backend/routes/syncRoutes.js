const express = require("express");
const router = express.Router();
const supabase = require("../utils/supabaseClient");
const authenticate = require("../utils/authMiddleware");

const DATA = {
  faculty: [
    { name: "Divi Vamsi Krishna", initials: "DV", department: "Agriculture", experience: "Lead Faculty", category: "Agriculture" },
    { name: "Sudhineedi Ramesh", initials: "SR", department: "Science", experience: "Research Expert", category: "Science" },
    { name: "Patchala Thomas", initials: "PT", department: "Agriculture", experience: "Senior Faculty", category: "Agriculture" },
  ],
  courses: [
    { stream: "Undergraduate", title: "B.Sc Agriculture", description: "Modern agricultural techniques and soil science.", details: ["Agronomy", "Plant Breeding", "Soil Science"] },
    { stream: "Postgraduate", title: "M.Sc Agriculture", description: "Advanced research in agricultural sciences.", details: ["Research Methodology", "Agri-Biotechnology", "Sustainable Farming"] },
    { stream: "Postgraduate", title: "M.Sc Biology, Chemistry & Zoology", description: "Core science research degrees.", details: ["M.Sc Biology", "M.Sc Chemistry", "M.Sc Zoology"] },
  ],
  success_stories: [
    // B.Sc Achievers
    { name: "K. Rakesh", initials: "KR", place: "Agronomy Research Fellow", category: "B.Sc Agriculture" },
    { name: "S. Anusha", initials: "SA", place: "Sustainable Farming Project", category: "B.Sc Agriculture" },
    { name: "M. Rahul", initials: "MR", place: "Crop Science Specialist", category: "B.Sc Agriculture" },
    { name: "P. Kavitha", initials: "PK", place: "Agri-Business Intern", category: "B.Sc Agriculture" },
    { name: "V. Sanjay", initials: "VS", place: "Soil Health Expert", category: "B.Sc Agriculture" },
    // M.Sc Scholars
    { name: "Dr. Vineeth", initials: "DV", place: "M.Sc Genetic Research", category: "M.Sc Research" },
    { name: "A. Srikanth", initials: "AS", place: "Modern Biotechnology M.Sc", category: "M.Sc Research" },
    { name: "B. Meena", initials: "BM", place: "National Science Scholar", category: "M.Sc Research" },
    { name: "D. Satish", initials: "DS", place: "Sustainable Agriculture Award", category: "M.Sc Research" },
    // Alumni
    { name: "J. Naveen", initials: "JN", place: "Agricultural Officer", category: "Successful Alumni" },
    { name: "E. Sindhuja", initials: "ES", place: "Environmental Scientist", category: "Successful Alumni" },
  ],
  testimonials: [
    { student_name: "K. Rakesh", initials: "KR", achievement: "B.Sc Agriculture Scholar", quote: "Personalized attention made all the difference.", stars: 5 },
    { student_name: "S. Anusha", initials: "SA", achievement: "M.Sc Research Fellow", quote: "Structured field visits helped a lot.", stars: 5 },
  ],
  ranks: [
    { student_name: "T. Sai Kumar", rank: "Top Researcher", exam: "B.Sc Agri", stream: "Agri Science", hall_ticket_number: "AG2401" },
    { student_name: "M. Sneha", rank: "M.Sc Scholar", exam: "M.Sc Agri", stream: "Agri Science", hall_ticket_number: "AG2442" },
    { student_name: "R. Rahul", rank: "Distinction", exam: "B.Sc Agri", stream: "Agri Science", hall_ticket_number: "AG2491" },
    { student_name: "K. Divya", rank: "Top Performer", exam: "M.Sc Biology", stream: "Biological Sci", hall_ticket_number: "BS2482" },
  ],
  gallery: [
    { image: "/gallery/1.png", sub_label: "Main Campus", label: "Main Academic Block" },
    { image: "/gallery/2.png", sub_label: "Research Lab", label: "Advanced Soil Analysis" },
    { image: "/gallery/3.png", sub_label: "Field Work", label: "Experimental Research Plot" },
  ],
  hero: [
    { tag: "🎓 Admissions Open 2026–27", h1: 'Welcome to <em class="italic text-[#fde68a]">Sri Sai Institute</em>', motto: '"Empowering the Future of Agriculture through Excellence."', description: "Offering professional B.Sc and M.Sc programs.", btn1_label: "Apply Now", btn1_href: "#contact", bg_gradient: "linear-gradient(115deg,#071428 0%,#065f46 45%,#15803d 100%)", image: "/gallery/1.png" }
  ]
};

router.post("/sync", authenticate, async (req, res) => {
  try {
    const results = {};

    const syncTable = async (table, data) => {
      try {
        // For success_stories, we want to overwrite to ensure all 3 lines are restored
        if (table === "success_stories") {
           await supabase.from(table).delete().neq("id", "00000000-0000-0000-0000-000000000000");
           const { error: insErr } = await supabase.from(table).insert(data);
           if (insErr) throw insErr;
           return `Restored ${data.length} records`;
        }

        const { data: existing, error: checkErr } = await supabase.from(table).select("id").limit(1);
        if (checkErr) throw checkErr;

        if (!existing || existing.length === 0) {
          const { error: insErr } = await supabase.from(table).insert(data);
          if (insErr) throw insErr;
          return `Inserted ${data.length} records`;
        }
        return "Already has data, skipping";
      } catch (e) {
        console.error(`Sync Error for ${table}:`, e.message);
        return `Error: ${e.message}`;
      }
    };

    results.faculty = await syncTable("faculty", DATA.faculty);
    results.courses = await syncTable("courses", DATA.courses);
    results.stories = await syncTable("success_stories", DATA.success_stories);
    results.testimonials = await syncTable("testimonials", DATA.testimonials);
    results.ranks = await syncTable("ranks", DATA.ranks);
    results.gallery = await syncTable("gallery", DATA.gallery);
    results.hero = await syncTable("hero", DATA.hero);

    res.json({ message: "Sync process completed", details: results });
  } catch (err) {
    console.error("CRITICAL SYNC ERROR:", err);
    res.status(500).json({ message: "Sync failed", error: err.message });
  }
});

module.exports = router;
