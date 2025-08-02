export interface AuthUser {
  token: string;
  refreshToken: string;
  email: string;
  name: string;
  role: string;
  id: string;
}

export interface Resume {
  id: number;
  resumePath: string;
  resumeName: string;
}

export interface Certifications {
  certificationName: string;
  issueDate: string;
  issuingOrganization: string;
  expiryDate?: string;
}

export interface CompanyWorkedAt {
  companyName: string;
}

export interface Skill {
  skillName: string;
}

export interface WorkedAs {
  jobTitle: string;
}

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  yearsOfExperience?: number;
  degree?: string;
  currentOrDesiredJob?: string;
  bio?: string;
  coverLetter?: string;
  dateOfBirth?: string;
  nationality?: string;
  maritalStatus?: string;
  gender?: string;
  education?: string;
  portfolio?: string;
  facebookLink?: string;
  twitterLink?: string;
  instagramLink?: string;
  linkedInLink?: string;
  collegeName?: string;
  university?: string;
  phoneNumber?: string;
  certifications?: Certifications[];
  companyWorkedAt?: CompanyWorkedAt[];
  skills?: Skill[];
  workedAs?: WorkedAs[];
  resumes?: Resume[];
}
