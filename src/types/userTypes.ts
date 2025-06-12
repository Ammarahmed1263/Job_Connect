export interface AuthUser {
  token: string;
  refreshToken: string;
  email: string;
  name: string;
  role: string;
  id: string;
}

export interface UserProfile {
  id: string,
  firstName: string,
  lastName: string,
  email: string,
  address: string,
  yearsOfExperience?: number,
  degree?: string,
  currentOrDesiredJob?: string,
  bio?: string,
  coverLetter?: string,
  dateOfBirth?: string,
  nationality?: string,
  maritalStatus?: string,
  gender?: string,
  education?: string,
  portfolio?: string,
  facebookLink?: string,
  twitterLink?: string,
  instagramLink?: string,
  linkedInLink?: string,
  collegeName?: string,
  university?: string,
  certifications?: Certifications[],
  companyWorkedAt?: CompanyWorkedAt[],
  skills?: Skills[],
  workedAs?: WorkedAs[],
  resumes?: Resume[]
}

interface Resume {
  resumePath?: string;
  resumeName?: string;
  uploadDate: string;
}

interface Certifications {
  certificationName: string;
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