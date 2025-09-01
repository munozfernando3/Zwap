type InfoItem = {
  id: number | string;
  title: string;
  subtitle?: string;
};

type Props = {
  title: string;
  items: InfoItem[];
  emptyMessage: string;
};

export default function InfoSection({ title, items, emptyMessage }: Props) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.length ? (
          items.map((item) => (
            <div key={item.id} className="rounded-2xl border border-neutral-800 p-4">
              <div className="text-lg font-medium">{item.title}</div>
              {item.subtitle && (
                <div className="text-sm text-neutral-400">{item.subtitle}</div>
              )}
            </div>
          ))
        ) : (
          <div className="text-neutral-400">{emptyMessage}</div>
        )}
      </div>
    </div>
  );
}
