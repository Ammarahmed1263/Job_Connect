import { ProfileFormData, UserProfile } from "@type/userTypes";

const convertProfileToFormData = (profile: Omit<UserProfile, 'id'>): ProfileFormData => {
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
    },
    experience: {
      yearsOfExperience: profile.yearsOfExperience,
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
    certifications: profile.certifications,
    skills: profile.skills,
    resumes: profile.resumes,
  };
};

export default convertProfileToFormData;
