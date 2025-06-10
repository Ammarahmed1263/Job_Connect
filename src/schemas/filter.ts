import { Filters } from "@type/filterTypes";

const filterRules = (filters: Filters) => {
  const { minSalary, maxSalary } = filters;

  return {
    location: {},
    jobType: {},
    workplace: {},
    minSalary: {
      validate: (value: unknown) => {
        if (!value) return true;
        if (typeof value !== "string") return "Must be a number";
        if (!/^\d+$/.test(value)) return "Must be a number";
        if (parseInt(value) <= 0) return "Must be greater than 0";
        if (maxSalary && parseInt(value) > parseInt(maxSalary)) {
          return "Min must be ≤ Max";
        }
        return true;
      },
    },
    maxSalary: {
      validate: (value: unknown) => {
        if (!value) return true;
        if (typeof value !== "string") return "Must be a number";
        if (!/^\d+$/.test(value)) return "Must be a number";
        if (parseInt(value) > 1_000_000) return "Max must be ≤ 1,000,000";
        if (minSalary && parseInt(value) < parseInt(minSalary)) {
          return "Max must be ≥ Min";
        }
        return true;
      },
    },
    experience: {},
    education: {},
  };
};

export default filterRules;
