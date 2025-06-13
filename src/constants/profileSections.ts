import { ProfileSection } from "@components/complete-profile";

const profileSectionsData: ProfileSection[] = [
  {
    id: "1",
    sectionName: "Contact Info",
    iconName: "person-outline",
    status: "Completed",
    screen: "contact-info",
    sectionValue: "contactInfo",
  },
  {
    id: "2",
    sectionName: "About Me",
    iconName: "user-id",
    status: "Completed",
    screen: "about-me",
    sectionValue: "about",
  },
  {
    id: "3",
    sectionName: "Experience",
    iconName: "case-outline",
    status: "Completed",
    screen: "experience",
    sectionValue: "experience",
  },
  {
    id: "4",
    sectionName: "Education",
    iconName: "academic-cap",
    status: "Completed",
    screen: "education",
    sectionValue: "education",
  },
  {
    id: "6",
    sectionName: "Certificates & License",
    iconName: "diploma",
    status: "Not Completed",
    screen: "certificates",
    sectionValue: "certifications",
  },
  {
    id: "9",
    sectionName: "Skills",
    iconName: "chart",
    status: "Not Completed",
    screen: "skills",
    sectionValue: "skills",
  },
  {
    id: "10",
    sectionName: "Resume/CV",
    iconName: "document-text",
    status: "Not Completed",
    screen: "upload-resume",
    sectionValue: "resumes",
  },
];

export const profileSectionsFields = {
  contactInfo: [
    "firstName",
    "lastName",
    "email",
    "address",
    "phoneNumber",
    "facebookLink",
    "twitterLink",
    "instagramLink",
    "linkedInLink",
  ],
  experience: [
    "yearsOfExperience",
    "companyWorkedAt",
    "currentOrDesiredJob",
    "workedAs",
  ],
  about: [
    "bio",
    "coverLetter",
    "dateOfBirth",
    "nationality",
    "maritalStatus",
    "gender",
  ],
  education: ["education", "degree", "university", "collegeName"],
  certifications: [
    "certificationName",
    "issueDate",
    "issuingOrganization",
    "expiryDate",
  ],
  skills: ["skillsName"],
  resumes: ["resume"],
} as const;

export type ProfileSectionKey = keyof typeof profileSectionsFields;

export default profileSectionsData;
