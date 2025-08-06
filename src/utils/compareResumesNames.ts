import { Resume } from "@type/userTypes";

const compareResumesNames = (
  resumeName: string,
  resumes: Resume[]
): number | null => {
  if (!resumeName || !resumes || !Array.isArray(resumes)) return null;

  const uploadedResume = resumes.find(
    (resume) =>
      decodeURIComponent(resume.resumeName) === decodeURIComponent(resumeName)
  );

  return uploadedResume ? uploadedResume.id : null;
};

export default compareResumesNames;
