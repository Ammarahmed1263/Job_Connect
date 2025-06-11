export interface Employer {
  id: string;
  name: string;
  email: string;
  companyName: string;
  companySize: string;
  industry: string;
  logoBase64: string | null;
}

export interface jobSummary {
  id: number;
  title: string;
  status: string;
  jobType: string;
  workPlace: "Remote" | "On-site" | "Hybrid";
  experience: string;
  applicationsCount: number;
  postedDate: string;
  minSalary: number;
  maxSalary: number;
  salaryType: string;
  location: string;
  employer: Employer;
}

export interface JobDetails extends jobSummary {
  applicationsCount: number;
  shortListed: boolean;
  description: string;
  tags: string[];
  responsibilities: string[];
}

export interface JobsApiResponse {
  message: string;
  data: JobDetails[];
  pageNumber: number;
  totalPages: number;
  pageSize: number;
  totalCount: number;
}
