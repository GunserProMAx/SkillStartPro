const SUPABASE_URL = "https://thfeolsioiyfhgmjfoej.supabase.co";
const SUPABASE_KEY = "sb_publishable_MYUhxe0hW0iTbwzwd1xd6w_x3eRJOtO";

let supabaseClient = null;

function getSupabaseClient() {
  if (supabaseClient) return supabaseClient;

  if (
    SUPABASE_URL.includes("ВСТАВЬ_") ||
    SUPABASE_KEY.includes("ВСТАВЬ_")
  ) {
    throw new Error("Не заполнены настройки Supabase.");
  }

  if (!window.supabase) {
    throw new Error("Библиотека Supabase не загрузилась.");
  }

  supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
  );

  return supabaseClient;
}

window.loadServices = async function () {
  const client = getSupabaseClient();

  const { data, error } = await client
    .from("services")
    .select("id, title, description, category, price")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data || [];
};