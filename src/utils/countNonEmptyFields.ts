import { UserProfile } from "@type/userTypes";

const countNonEmptyFields = (obj: Record<string, unknown>): number => {
  let count = 0;
  const { id, ...formData } = obj;
  for (const key in formData) {
    const value = formData[key as keyof Omit<UserProfile, "id">];
    const isFilled =
      value !== undefined &&
      value !== "" &&
      value !== null &&
      (!Array.isArray(value) || value.length > 0) &&
      (typeof value !== "object" ||
        value === null ||
        Array.isArray(value) ||
        Object.keys(value).length > 0);

    if (isFilled) count++;
  }
  return count;
};

export default countNonEmptyFields;
