const SUPABASE_URL = "https://thfeolsioiyfhgmjfoej.supabase.co";
const SUPABASE_KEY = "sb_publishable_MYUhxe0hW0iTbwzwd1xd6w_x3eRJOtO";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

async function loadServices() {
  const { data, error } = await supabaseClient
    .from("services")
    .select("id, title, description, category, price")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Ошибка загрузки услуг:", error.message);
    return [];
  }

  return data;
}