export interface Employer {
  id: string;
  name: string;
  email: string;
  companyName: string;
  companySize: string;
  industry: string;
  logoBase64: string | null;
}

export interface JobDetails {
  id: number;
  title: string;
  status: string;
  jobType: string;
  workPlace: 'Remote' | 'On-site' | 'Hybrid';
  experience: string;
  daysRemaining: number;
  applicationsCount: number;
  postedDate: string;
  location: string;
  shortListed: boolean;
  description: string;
  minSalary: number;
  maxSalary: number;
  salaryType: string;
  tags: string[];
  responsibilities: string[];
  employer: Employer;
}