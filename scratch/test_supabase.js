require('dotenv').config({ path: '../backend/.env' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

console.log("Testing Supabase connection...");
console.log("URL:", supabaseUrl);

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function test() {
  try {
    const { data, error } = await supabase.from('faculty').select('*').limit(1);
    if (error) {
      console.error("Supabase Error:", error);
    } else {
      console.log("Success! Data:", data);
    }
  } catch (err) {
    console.error("Execution Error:", err.message);
    console.error(err);
  }
}

test();
