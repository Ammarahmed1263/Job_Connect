type BaseFilter = {
  location: string;
  jobType: 'Full-time' | 'Part-time' | 'Contract' | 'Internship' | '';
  workplace: 'Remote' | 'On-site' | 'Hybrid' | '';
  minSalary: string;
  maxSalary: string;
  experience: 'Entry' | 'Mid-level' | 'Senior' | 'Lead' | 'Manager' | '';
  education: 'High School' | "Associate's" | "Bachelor's" | "Master's" | "PhD" | '';
}

export type Filters = Partial<BaseFilter> 