import { supabase } from "@/lib/supabase";
import { Campus, Category } from "./types";


// keep pages fresh while iterating
export const revalidate = 0;



type CampusPageOpts = {
  page?: number;        // 1-based
  pageSize?: number;    // e.g., 24
  q?: string;           // search term
  state?: string;       // region filter, e.g., "UT"
};

export async function getCampusesPage(opts: CampusPageOpts = {}) {
  const page = Math.max(1, opts.page ?? 1);
  const pageSize = Math.min(100, Math.max(1, opts.pageSize ?? 24));
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from("campuses")
    .select("id, name, city, region, country")
    .order("name", { ascending: true });

  if (opts.q && opts.q.trim()) {
    // simple name OR city ilike filter
    const q = `%${opts.q.trim()}%`;
    query = query.or(`name.ilike.${q},city.ilike.${q}`);
  }

  if (opts.state && opts.state.trim()) {
    query = query.eq("region", opts.state.trim().toUpperCase());
  }

  const { data, error, count } = await query.range(from, to);
  if (error) throw new Error(error.message);

  return {
    items: (data ?? []) as Campus[],
    total: count ?? 0,
    page,
    pageSize,
    pageCount: Math.max(1, Math.ceil((count ?? 0) / pageSize)),
  };
}

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from("categories")
    .select("id, name, slug, parent_id")
    .order("name");
  if (error) throw new Error(error.message);
  return data ?? [];
}
