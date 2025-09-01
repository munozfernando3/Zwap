import InfoSection from "@/components/InfoSection";
import { getCategories } from "@/lib/queries";

export const revalidate = 0;



export default async function Page() {
  const categories = await getCategories();

  return (
    <main className="min-h-screen p-6 md:p-10 bg-neutral-950 text-neutral-100">
      <section className="max-w-6xl mx-auto space-y-10">
        <header className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-semibold">Categories</h1>
        </header>

        <InfoSection
          title="Categories"
          items={categories.map((cat) => ({
            id: cat.id,
            title: cat.name,
            subtitle: `/${cat.slug}`,
          }))}
          emptyMessage="No categories yet. Seed them in Supabase."
        />
      </section>
    </main>
  );
}
