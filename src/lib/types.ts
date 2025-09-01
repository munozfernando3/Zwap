export type Campus = {
  id: number;
  name: string;
  city: string | null;
  region: string | null;
  country: string | null;
};

export type Category = {
  id: number;
  name: string;
  slug: string;
  parent_id: number | null;
};
