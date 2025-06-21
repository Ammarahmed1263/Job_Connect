import { SectionFormTypes } from "@type/profileFormTypes";
import { UserProfile } from "@type/userTypes";

const convertProfileToFormData = (profile: Omit<UserProfile, 'id'>): SectionFormTypes => {
  return {
    contactInfo: {
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: profile.email,
      address: profile.address,
      phoneNumber: profile.phoneNumber,
      facebookLink: profile.facebookLink,
      twitterLink: profile.twitterLink,
      instagramLink: profile.instagramLink,
      linkedInLink: profile.linkedInLink,
      portfolio: profile.portfolio,
    },
    experience: {
      yearsOfExperience: profile.yearsOfExperience?.toString() || "",
      companyWorkedAt: profile.companyWorkedAt,
      currentOrDesiredJob: profile.currentOrDesiredJob,
      workedAs: profile.workedAs,
    },
    about: {
      bio: profile.bio,
      coverLetter: profile.coverLetter,
      dateOfBirth: profile.dateOfBirth,
      nationality: profile.nationality,
      maritalStatus: profile.maritalStatus,
      gender: profile.gender,
    },
    education: {
      education: profile.education,
      collegeName: profile.collegeName,
      university: profile.university,
      degree: profile.degree,
    },
    certifications: {
      certificationName: '',
      issueDate: '',
      issuingOrganization: '',
      expiryDate: '',
    },
    skills: {
      skillName: '',
    },
    resumes: {
      id: 1,
      resumePath: '',
      resumeName: '',
    },
  };
};

export default convertProfileToFormData;
