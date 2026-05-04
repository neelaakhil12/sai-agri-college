const express = require("express");
const router = express.Router();
const pool = require("../utils/db");
const authenticate = require("../utils/authMiddleware");

const DATA = {
  faculty: [
    { name: "Divi Vamsi Krishna", initials: "DV", department: "Agriculture", experience: "Lead Faculty", category: "Agriculture" },
    { name: "Sudhineedi Ramesh", initials: "SR", department: "Science", experience: "Research Expert", category: "Science" },
    { name: "Patchala Thomas", initials: "PT", department: "Agriculture", experience: "Senior Faculty", category: "Agriculture" },
  ],
  courses: [
    { stream: "Undergraduate", title: "B.Sc Agriculture", description: "Modern agricultural techniques and soil science.", details: JSON.stringify(["Agronomy", "Plant Breeding", "Soil Science"]) },
    { stream: "Postgraduate", title: "M.Sc Agriculture", description: "Advanced research in agricultural sciences.", details: JSON.stringify(["Research Methodology", "Agri-Biotechnology", "Sustainable Farming"]) },
    { stream: "Postgraduate", title: "M.Sc Biology, Chemistry & Zoology", description: "Core science research degrees.", details: JSON.stringify(["M.Sc Biology", "M.Sc Chemistry", "M.Sc Zoology"]) },
  ],
  stories: [
    { name: "K. Rakesh", initials: "KR", place: "Agronomy Research Fellow", category: "B.Sc Agriculture" },
    { name: "S. Anusha", initials: "SA", place: "Sustainable Farming Project", category: "B.Sc Agriculture" },
    { name: "M. Rahul", initials: "MR", place: "Crop Science Specialist", category: "B.Sc Agriculture" },
    { name: "P. Kavitha", initials: "PK", place: "Agri-Business Intern", category: "B.Sc Agriculture" },
    { name: "V. Sanjay", initials: "VS", place: "Soil Health Expert", category: "B.Sc Agriculture" },
    { name: "Dr. Vineeth", initials: "DV", place: "M.Sc Genetic Research", category: "M.Sc Research" },
    { name: "A. Srikanth", initials: "AS", place: "Modern Biotechnology M.Sc", category: "M.Sc Research" },
    { name: "B. Meena", initials: "BM", place: "National Science Scholar", category: "M.Sc Research" },
    { name: "D. Satish", initials: "DS", place: "Sustainable Agriculture Award", category: "M.Sc Research" },
    { name: "J. Naveen", initials: "JN", place: "Agricultural Officer", category: "Successful Alumni" },
    { name: "E. Sindhuja", initials: "ES", place: "Environmental Scientist", category: "Successful Alumni" },
  ],
  testimonials: [
    { student_name: "K. Rakesh", initials: "KR", achievement: "B.Sc Agriculture Scholar", quote: "Personalized attention made all the difference.", stars: 5 },
    { student_name: "S. Anusha", initials: "SA", achievement: "M.Sc Research Fellow", quote: "Structured field visits helped a lot.", stars: 5 },
  ],
  ranks: [
    { student_name: "T. Sai Kumar", rank: "Top Researcher", exam: "B.Sc Agri", stream: "Agri Science", hall_ticket_number: "AG2401", year: 2024 },
    { student_name: "M. Sneha", rank: "M.Sc Scholar", exam: "M.Sc Agri", stream: "Agri Science", hall_ticket_number: "AG2442", year: 2024 },
    { student_name: "R. Rahul", rank: "Distinction", exam: "B.Sc Agri", stream: "Agri Science", hall_ticket_number: "AG2491", year: 2024 },
    { student_name: "K. Divya", rank: "Top Performer", exam: "M.Sc Biology", stream: "Biological Sci", hall_ticket_number: "BS2482", year: 2024 },
  ],
  gallery: [
    { image: "/gallery/1.png", sub_label: "Main Campus", label: "Main Academic Block" },
    { image: "/gallery/2.png", sub_label: "Research Lab", label: "Advanced Soil Analysis" },
    { image: "/gallery/3.png", sub_label: "Field Work", label: "Experimental Research Plot" },
  ],
  hero: [
    { 
      tag: "🎓 Admissions Open 2026–27", 
      h1: JSON.stringify(["Welcome to", "Sri Sai Institute"]), 
      motto: "\"Empowering the Future of Agriculture through Excellence.\"", 
      description: "Offering professional B.Sc and M.Sc programs.", 
      btn1_label: "Apply Now", 
      btn1_href: "#contact", 
      bg_gradient: "linear-gradient(115deg,#071428 0%,#065f46 45%,#15803d 100%)", 
      image: "/gallery/1.png" 
    }
  ]
};

router.post("/sync", authenticate, async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const results = {};

    const syncTable = async (table, data) => {
      try {
        // Check if table has data
        const [existing] = await connection.query(`SELECT id FROM ${table} LIMIT 1`);
        
        if (existing.length === 0 || table === 'stories' || table === 'hero') {
          // If stories or hero, we refresh them to ensure the latest fixed content
          if (table === 'stories' || table === 'hero') {
            await connection.query(`DELETE FROM ${table}`);
          }
          
          for (const item of data) {
            const keys = Object.keys(item);
            const values = Object.values(item);
            const placeholders = keys.map(() => "?").join(", ");
            await connection.query(
              `INSERT INTO ${table} (${keys.join(", ")}) VALUES (${placeholders})`,
              values
            );
          }
          return `Inserted/Refreshed ${data.length} records`;
        }
        return "Already has data, skipping";
      } catch (e) {
        console.error(`Sync Error for ${table}:`, e.message);
        return `Error: ${e.message}`;
      }
    };

    results.faculty = await syncTable("faculty", DATA.faculty);
    results.courses = await syncTable("courses", DATA.courses);
    results.stories = await syncTable("stories", DATA.stories);
    results.testimonials = await syncTable("testimonials", DATA.testimonials);
    results.ranks = await syncTable("ranks", DATA.ranks);
    results.gallery = await syncTable("gallery", DATA.gallery);
    results.hero = await syncTable("hero", DATA.hero);

    res.json({ message: "Sync process completed (MySQL)", details: results });
  } catch (err) {
    console.error("CRITICAL SYNC ERROR:", err);
    res.status(500).json({ message: "Sync failed", error: err.message });
  } finally {
    connection.release();
  }
});

module.exports = router;
