const getExperienceYears = (input: number | string): number | null => {
  if (typeof input === 'number') return input;
  
  const str = input.toString().trim();
  const num = parseFloat(str.replace(/[^0-9.-]/g, ''));
  return isNaN(num) ? null : num;
};

export default getExperienceYears;

