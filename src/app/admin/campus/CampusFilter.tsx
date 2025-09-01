"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function CampusFilters() {
  const router = useRouter();
  const params = useSearchParams();
  const [q, setQ] = useState(params.get("q") ?? "");
  const [state, setState] = useState(params.get("state") ?? "");
  const [pageSize, setPageSize] = useState(params.get("pageSize") ?? "24");

  useEffect(() => setQ(params.get("q") ?? ""), [params]);
  useEffect(() => setState(params.get("state") ?? ""), [params]);
  useEffect(() => setPageSize(params.get("pageSize") ?? "24"), [params]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const sp = new URLSearchParams(params.toString());
    if (q) sp.set("q", q); else sp.delete("q");
    if (state) sp.set("state", state.toUpperCase()); else sp.delete("state");
    if (pageSize) sp.set("pageSize", pageSize);
    sp.set("page", "1"); // reset page on new filters
    router.push(`?${sp.toString()}`);
  };

  return (
    <form onSubmit={submit} className="flex flex-wrap gap-3 items-end">
      <div className="flex flex-col">
        <label className="text-xs text-neutral-400">Search</label>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="name or city"
          className="px-3 py-2 rounded bg-neutral-900 border border-neutral-800"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-xs text-neutral-400">State</label>
        <input
          value={state}
          onChange={(e) => setState(e.target.value)}
          placeholder="e.g., UT, CA"
          maxLength={2}
          className="px-3 py-2 rounded bg-neutral-900 border border-neutral-800 w-24 uppercase"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-xs text-neutral-400">Page size</label>
        <select
          value={pageSize}
          onChange={(e) => setPageSize(e.target.value)}
          className="px-3 py-2 rounded bg-neutral-900 border border-neutral-800"
        >
          {["12","24","48","96"].map(n => <option key={n} value={n}>{n}</option>)}
        </select>
      </div>
      <button className="px-4 py-2 rounded border border-neutral-700 hover:bg-neutral-900">
        Apply
      </button>
    </form>
  );
}
