import { jobSummary } from "@type/jobTypes";
import getSeniorityLevel from "./getSeniorityLevel";

const extractTags = (item: jobSummary) => {
  const jobType = item?.jobType ?? "";
  const workPlace = item?.workPlace ?? "";
  const experience = getSeniorityLevel(item?.experience) ?? "";

  return [jobType, workPlace, experience].filter(Boolean);
};

export default extractTags;
