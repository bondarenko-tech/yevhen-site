import { kategorien } from "@/data/kategorien";

export function resolveCategory(id: string) {
  const cat = kategorien.find((k) => k.id === id);

  return {
    entity: cat,
    name: cat?.name ?? id,
    url: `/empfehlungen/${id}/`,
  };
}