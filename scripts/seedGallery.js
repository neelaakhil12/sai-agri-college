require("dotenv").config({ path: "./.env" });
const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const items = [
  { image: "/gallery/1.png",  sub_label: "Main Campus",         label: "Main Academic Block" },
  { image: "/gallery/2.png",  sub_label: "Research Lab",        label: "Advanced Soil Analysis" },
  { image: "/gallery/3.png",  sub_label: "Field Work",          label: "Experimental Research Plot" },
  { image: "/gallery/4.png",  sub_label: "Classrooms",          label: "Digital Learning Hall" },
  { image: "/gallery/5.png",  sub_label: "Hostels",             label: "Modern Student Housing" },
  { image: "/gallery/6.png",  sub_label: "Library",             label: "Scientific Resource Center" },
  { image: "/gallery/7.png",  sub_label: "Agriculture Labs",    label: "Plant Pathology Unit" },
  { image: "/gallery/8.png",  sub_label: "Practical Field",     label: "Agronomy Research Area" },
  { image: "/gallery/9.png",  sub_label: "Campus Life",         label: "Green Campus Environment" },
  { image: "/gallery/10.png", sub_label: "Admissions Hub",      label: "Enquiry & Counseling Center" },
];

async function seed() {
  console.log("🌱 Seeding Gallery table...");
  
  // Check if already seeded
  const { data: existing } = await supabase.from("gallery").select("id").limit(1);
  if (existing && existing.length > 0) {
    console.log("ℹ️ Gallery already has data. Skipping seed.");
    process.exit(0);
  }

  const { error } = await supabase.from("gallery").insert(items);

  if (error) {
    console.error("❌ Seeding error:", error.message);
    process.exit(1);
  }
  
  console.log("✨ Seeding complete!");
  process.exit(0);
}

seed();
