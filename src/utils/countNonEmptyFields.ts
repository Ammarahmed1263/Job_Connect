const countNonEmptyFields = (obj: Record<string, unknown>): number => {
  let count = 0;
  for (const key in obj) {
    const value = obj[key];
    const isFilled =
      value !== null &&
      value !== undefined &&
      value !== "" &&
      !(Array.isArray(value) && value.length === 0) &&
      !(typeof value === "object" && !Array.isArray(value) && Object.keys(value).length === 0);
  
    if (isFilled) count++;
  }
  return count;
};

export default countNonEmptyFields;
