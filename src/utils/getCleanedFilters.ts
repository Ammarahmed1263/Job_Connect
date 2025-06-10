import { Filters } from "@type/filterTypes";

const getCleanedFilters = (queryFilters: Filters) => {
  return Object.entries(queryFilters).reduce(
    (acc, [key, value]) => {
      if (value !== undefined && value !== "") {
        acc[key as keyof Filters] = value as any;
      }
      return acc;
    },
    {} as Partial<Filters>
  );
}

export default getCleanedFilters;