import InfoSection from "@/components/InfoSection";

import { getCampusesPage } from "@/lib/queries";
import CampusFilters from "./CampusFilter";
import Pager from "@/components/Pagers";

export const revalidate = 0;
type SearchParams = { [key: string]: string | string[] | undefined }

export default async function AdminCampuses({ searchParams }: { searchParams: SearchParams }) {
  const page = Number(searchParams?.page ?? "1") || 1;
  const pageSize = Number(searchParams?.pageSize ?? "24") || 24;
  const q = typeof searchParams?.q === "string" ? searchParams.q : undefined;
  const state = typeof searchParams?.state === "string" ? searchParams.state : undefined;

  const { items, total, pageCount } = await getCampusesPage({ page, pageSize, q, state });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Campuses</h2>
        <span className="text-sm text-neutral-400">Total: {total.toLocaleString()}</span>
      </div>
      <CampusFilters />
      <InfoSection
        title=""
        items={items.map((c) => ({
          id: c.id,
          title: c.name,
          subtitle: [c.city, c.region, c.country].filter(Boolean).join(", "),
        }))}
        emptyMessage="No results."
      />
      <div className="flex justify-end">
        <Pager page={page} pageCount={pageCount} />
      </div>
    </div>
  );
}
