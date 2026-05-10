async function test() {
  try {
    const res = await fetch('https://exbdkwxvjxadmtvnbmrz.supabase.co');
    console.log('Status:', res.status);
  } catch (err) {
    console.error('Fetch error:', err.message);
  }
}
test();
