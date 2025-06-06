import getExperienceYears from "./getExperienceYears";

type SeniorityLevel = 'Entry-level' | 'Junior' | 'Mid-level' | 'Senior' | 'Lead' | null;


export const getSeniorityLevel = (input: number | string | null | undefined): SeniorityLevel => {
  if (input === null || input === undefined) return null;
  
  const years = getExperienceYears(input);

  if (years === null) return null;
  if (years === 0) return 'Entry-level';
  if (years <= 2) return 'Junior';
  if (years <= 5) return 'Mid-level';
  if (years <= 8) return 'Senior';
  return 'Lead';
};

export default getSeniorityLevel;