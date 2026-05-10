require("dotenv").config({ path: "./.env" });
const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("❌ Missing Supabase URL or Anon Key");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function setup() {
  console.log("🛠️ Setting up Gallery table...");
  
  // Note: Supabase doesn't allow direct SQL via the client easily without an RPC.
  // However, we can try to insert a dummy record to see if it works, 
  // but most likely the user needs to run the SQL in the dashboard.
  // I will provide the SQL in a comment and attempt an insert.
  
  const { error } = await supabase
    .from("gallery")
    .select("*")
    .limit(1);

  if (error && error.code === "42P01") {
    console.log("❌ Table 'gallery' does not exist.");
    console.log("Please run the following SQL in your Supabase SQL Editor:");
    console.log(`
      CREATE TABLE IF NOT EXISTS gallery (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        label TEXT NOT NULL,
        sub_label TEXT,
        image TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);
  } else {
    console.log("✅ Table 'gallery' exists or accessible.");
  }
}

setup();
