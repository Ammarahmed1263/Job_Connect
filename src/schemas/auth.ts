const authRules = {
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
  password: {
    required: "Password is required",
    validate: {
      length: (value: unknown) =>
        typeof value === "string"
          ? (value.length >= 6) ||
            "Password must be at least 6 characters long"
          : "Invalid value",
      complexity: (value: unknown) =>
        typeof value === "string"
          ? /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*()_+}])/.test(value) ||
            "Must include: 1 uppercase, 1 lowercase, 1 digit, 1 special char (!@#$%&*()_+})"
          : "Invalid value",
    },
  },
  phone: {
    required: "Phone is required",
  },
  address: {
    required: "Address is required",
  },
  jobTitle: {
    required: "Job title is required",
    minLength: {
      value: 4,
      message: "Job title must be at least 4 characters long",
    },
  },
  experience: {
    required: "Experience is required",
    pattern: {
      value: /^[0-9]+$/,
      message: "Please enter a valid experience in years",
    },
  },
  degree: {
    required: "Degree is required",
  },
  confirmPassword: (getValues: () => { account: { password: string } }) => ({
    required: "Confirm password is required",
    validate: (value: unknown) => {
      if (typeof value === "string") {
        return (
          value === getValues().account.password || "Passwords do not match"
        );
      }
      return "Invalid value";
    },
  }),
};

export default authRules;
