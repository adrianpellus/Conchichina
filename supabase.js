const SUPABASE_URL = 'TU_SUPABASE_URL';
const SUPABASE_KEY = 'TU_SUPABASE_ANON_KEY';

const SB_HEADERS = {
  'apikey': SUPABASE_KEY,
  'Authorization': 'Bearer ' + SUPABASE_KEY,
  'Content-Type': 'application/json'
};

async function sbGet(key) {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/store_data?key=eq.${key}&select=value`,
    { headers: SB_HEADERS }
  );
  if (!res.ok) return null;
  const data = await res.json();
  return data.length ? data[0].value : null;
}

async function sbSet(key, value) {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/store_data`,
    {
      method: 'POST',
      headers: { ...SB_HEADERS, 'Prefer': 'resolution=merge-duplicates,return=minimal' },
      body: JSON.stringify({ key, value })
    }
  );
  return res.ok;
}
