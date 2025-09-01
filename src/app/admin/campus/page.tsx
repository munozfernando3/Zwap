
import AdminCampuses from "./AdminCampus";

export const revalidate = 0;
type SearchParams = { [key: string]: string | string[] | undefined };

export default function Page({ searchParams }: { searchParams: SearchParams }) {
  return (
    <main className="min-h-screen p-6 md:p-10 bg-neutral-950 text-neutral-100">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-semibold">Admin · Campuses</h1>
          <p className="text-neutral-400">Manage and browse all campuses.</p>
        </header>
        <AdminCampuses searchParams={searchParams} />
      </div>
    </main>
  );
}
