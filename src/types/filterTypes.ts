export type JobType = 'Full-time' | 'Part-time' | 'Contract' | 'Internship' | '';
export type Workplace = 'Remote' | 'On-site' | 'Hybrid' | '';
export type Experience = 'Entry' | 'Mid-level' | 'Senior' | 'Lead' | 'Manager' | '';
export type Education = 'High School' | "Associate's" | "Bachelor's" | "Master's" | "PhD" | '';


type BaseFilter = {
  location: string;
  jobType: JobType;
  workplace: Workplace;
  minSalary: string;
  maxSalary: string;
  experience: Experience;
  education: Education;
}

export type Filters = Partial<BaseFilter> 
