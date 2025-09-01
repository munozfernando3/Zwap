"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function Pager({ page, pageCount }: { page: number; pageCount: number }) {
  const params = useSearchParams();
  const toUrl = (p: number) => {
    const sp = new URLSearchParams(params.toString());
    sp.set("page", String(p));
    return `?${sp.toString()}`;
    };
  return (
    <div className="flex items-center gap-3">
      <Link
        href={page > 1 ? toUrl(page - 1) : "#"}
        aria-disabled={page === 1}
        className={`px-3 py-1 rounded border ${page===1?"opacity-40 pointer-events-none":"hover:bg-neutral-900"}`}
      >
        ← Prev
      </Link>
      <span className="text-sm text-neutral-400">
        Page {page} / {pageCount}
      </span>
      <Link
        href={page < pageCount ? toUrl(page + 1) : "#"}
        aria-disabled={page === pageCount}
        className={`px-3 py-1 rounded border ${page===pageCount?"opacity-40 pointer-events-none":"hover:bg-neutral-900"}`}
      >
        Next →
      </Link>
    </div>
  );
}
