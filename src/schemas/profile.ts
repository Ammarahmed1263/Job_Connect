const socialMediaPatterns = {
  facebook: {
    value: /^(https?:\/\/)?(www\.)?(facebook|fb)\.com\/.+/i,
    message: "Please enter a valid Facebook profile URL",
  },
  twitter: {
    value: /^(https?:\/\/)?(www\.)?(twitter|x)\.com\/.+/i,
    message: "Please enter a valid Twitter/X profile URL",
  },
  instagram: {
    value: /^(https?:\/\/)?(www\.)?instagram\.com\/.+/i,
    message: "Please enter a valid Instagram profile URL",
  },
  linkedIn: {
    value: /^(https?:\/\/)?(www\.)?linkedin\.com\/(in|company)\/.+/i,
    message: "Please enter a valid LinkedIn profile URL",
  },
  portfolio: {
    value: /^(https?:\/\/)?(www\.)?[\w-]+\.[\w.-]+([\/#?].*)?$/i,
    message: "Please enter a valid website URL",
  },
};

const profileRules = {
  // Contact Info
  firstName: {
    required: "First name is required",
  },
  lastName: {
    required: "Last name is required",
  },
  email: {
    required: "Email is required",
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Please enter a valid email address",
    },
  },
  address: {
    required: "Address is required",
  },
  facebookLink: {
    pattern: socialMediaPatterns.facebook,
  },
  twitterLink: {
    pattern: socialMediaPatterns.twitter,
  },
  instagramLink: {
    pattern: socialMediaPatterns.instagram,
  },
  linkedInLink: {
    pattern: socialMediaPatterns.linkedIn,
  },
  portfolio: {
    pattern: socialMediaPatterns.portfolio,
  },

  // Experience
  yearsOfExperience: {
    pattern: {
      value: /^[0-9]+$/,
      message: "Please enter a valid number of years",
    },
  },

  // About
  bio: {
    maxLength: {
      value: 500,
      message: "Bio cannot exceed 500 characters",
    },
  },
  coverLetter: {
    maxLength: {
      value: 1000,
      message: "Cover letter cannot exceed 1000 characters",
    },
  },
  dateOfBirth: {
    pattern: {
      value: /^\d{2}\/\d{2}\/\d{4}$/,
      message: "Please use format: DD/MM/YYYY",
    },
  },

  // Education
  education: {
    maxLength: {
      value: 100,
      message: "Education cannot exceed 100 characters",
    },
  },
  degree: {
    maxLength: {
      value: 100,
      message: "Degree cannot exceed 100 characters",
    },
  },
  university: {
    maxLength: {
      value: 100,
      message: "University name cannot exceed 100 characters",
    },
  },
  collegeName: {
    maxLength: {
      value: 100,
      message: "College name cannot exceed 100 characters",
    },
  },

  // Certifications
  certificationName: {
    required: "Certification name is required",
  },
  issueDate: {
    required: "Issue date is required",
    pattern: {
      value: /^\d{2}\/\d{2}\/\d{4}$/,
      message: "Please use format: DD/MM/YYYY",
    },
  },
  issuingOrganization: {
    required: "Issuing organization is required",
  },
  expiryDate: {
    pattern: {
      value: /^\d{2}\/\d{2}\/\d{4}$/,
      message: "Please use format: DD/MM/YYYY",
    },
  },

  // Skills
  skillInput: {
    maxLength: {
      value: 20,
      message: "Skill name cannot exceed 20 characters",
    },
  },
};

export default profileRules;
