export type LoginFormData = {
  email: string;
  password: string;
};

export type RegisterFormData = {
  personal: {
    firstName: string;
    lastName: string;
  };
  contact: {
    email: string;
    phone: string;
    address: string;
  };
  professional: {
    jobTitle: string;
    degree: string;
    experience: string;
  };
  account: {
    password: string;
    confirmPassword: string;
  };
};