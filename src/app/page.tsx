import Link from "next/link";


export const revalidate = 0;

export default async function HomePage() {


  return (
    <main className="min-h-screen p-6 md:p-10 bg-neutral-950 text-neutral-100">
      <section className="max-w-6xl mx-auto space-y-10">
        <header className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-semibold">Student Marketplace</h1>
          <Link href="/admin" className="inline-block px-4 py-2 rounded border border-neutral-700 hover:bg-neutral-900">
  Open Admin
</Link>
        </header> 
      </section>
    </main>
  );
}
