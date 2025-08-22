import { Certification, CompanyWorkedAt, Resume, Skill, WorkedAs } from "./userTypes";

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
    yearsOfExperience?: string;
    currentOrDesiredJob?: string;
    companyWorkedAt?: string;
    workedAs?: string;
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
  certifications?: Certification;
  skills?: {
    skillInput: string,
    skills: Skill[];
  };
  resumes?: Resume;
}

export type ContactInfoForm = ProfileFormData["contactInfo"];
export type ExperienceForm = ProfileFormData["experience"];
export type AboutForm = ProfileFormData["about"];
export type EducationForm = ProfileFormData["education"];
export type CertificationsForm = NonNullable<ProfileFormData["certifications"]>;
export type SkillsForm = NonNullable<ProfileFormData["skills"]>;
export type ResumeForm = NonNullable<ProfileFormData["resumes"]>;

export type SectionFormTypes = {
  contactInfo: ContactInfoForm;
  experience: ExperienceForm;
  about: AboutForm;
  education: EducationForm;
  certifications: CertificationsForm;
  skills: SkillsForm;
  resumes: ResumeForm;
};
