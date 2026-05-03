require("dotenv").config();
const supabase = require("./utils/supabaseClient");
const bcrypt = require("bcryptjs");

const username = process.env.ADMIN_USERNAME;
const password = process.env.ADMIN_PASSWORD;

async function initAdmin() {
  if (!username || !password) {
    console.error("❌ Missing ADMIN_USERNAME or ADMIN_PASSWORD in environment variables!");
    process.exit(1);
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const { data: existingAdmin, error: fetchError } = await supabase
      .from("admins")
      .select("*")
      .eq("username", username)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      throw fetchError;
    }

    if (existingAdmin) {
      console.log("ℹ️ Admin already exists, updating password...");
      const { error: updateError } = await supabase
        .from("admins")
        .update({ password: hashedPassword })
        .eq("id", existingAdmin.id);

      if (updateError) throw updateError;
      console.log("✨ Admin password updated successfully!");
    } else {
      console.log("ℹ️ Creating new admin user...");
      const { error: insertError } = await supabase
        .from("admins")
        .insert([{ username, password: hashedPassword }]);

      if (insertError) throw insertError;
      console.log("✨ Admin user created successfully!");
    }
    process.exit(0);
  } catch (err) {
    console.error("❌ Error in initAdmin script:", err.message);
    process.exit(1);
  }
}

initAdmin();

