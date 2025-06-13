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

interface Certifications {
  certificationName: string;
  issueDate: string;
  issuingOrganization: string;
  expiryDate?: string;
}

interface CompanyWorkedAt {
  companyName: string;
}

interface Skills {
  skillName: string;
}

interface WorkedAs {
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
  skills?: Skills[];
  workedAs?: WorkedAs[];
  resumes?: Resume[];
}

export interface ProfileFormData {
  contactInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: string;
    address: string;
    facebookLink?: string;
    twitterLink?: string;
    instagramLink?: string;
    linkedInLink?: string;
    portfolio?: string;
  };
  experience: {
    yearsOfExperience?: number;
    currentOrDesiredJob?: string;
    companyWorkedAt?: CompanyWorkedAt[];
    workedAs?: WorkedAs[];
  };
  about: {
    bio?: string;
    coverLetter?: string;
    dateOfBirth?: string;
    nationality?: string;
    maritalStatus?: string;
    gender?: string;
  };
  education: {
    education?: string;
    degree?: string;
    university?: string;
    collegeName?: string;
  };
  certifications?: Certifications[];
  skills?: Skills[];
  resumes?: Resume[];
}
