import { supabase } from "@/lib/supabase";

export const revalidate = 0; // always fresh while building MVP

async function getCampuses() {
  const { data, error } = await supabase
    .from("campuses")
    .select("id, name, city, region, country")
    .order("name");
  if (error) throw error;
  return data ?? [];
}

async function getCategories() {
  const { data, error } = await supabase
    .from("categories")
    .select("id, name, slug, parent_id")
    .order("name");
  if (error) throw error;
  return data ?? [];
}

export default async function HomePage() {
  const [campuses, categories] = await Promise.all([
    getCampuses(),
    getCategories(),
  ]);

  return (
    <main className="min-h-screen p-6 md:p-10 bg-neutral-950 text-neutral-100">
      <section className="max-w-6xl mx-auto space-y-10">
        <header className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-semibold">Student Marketplace</h1>
          <p className="text-neutral-400">
            MVP admin view — campuses & categories loaded from Supabase.
          </p>
        </header>

        {/* Campuses */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Campuses</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {campuses.map((c) => (
              <div key={c.id} className="rounded-2xl border border-neutral-800 p-4">
                <div className="text-lg font-medium">{c.name}</div>
                <div className="text-sm text-neutral-400">
                  {[c.city, c.region, c.country].filter(Boolean).join(", ")}
                </div>
              </div>
            ))}
            {campuses.length === 0 && (
              <div className="text-neutral-400">No campuses yet. Seed a few in Supabase.</div>
            )}
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Categories</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat) => (
              <div key={cat.id} className="rounded-2xl border border-neutral-800 p-4">
                <div className="text-lg font-medium">{cat.name}</div>
                <div className="text-xs text-neutral-400">/{cat.slug}</div>
              </div>
            ))}
            {categories.length === 0 && (
              <div className="text-neutral-400">No categories yet. Seed them in Supabase.</div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}