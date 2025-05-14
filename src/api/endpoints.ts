export const publicEndpoints = [
  "Accounts/Register/JobSeeker",
  "Accounts/Login",
];

export const endpoints = {
  accounts: {
    register: "Accounts/Register/JobSeeker",
    login: "Accounts/Login",
    forgotPassword: "Accounts/ForgotPassword",
    resetPassword: "Accounts/ResetPassword",
    refreshToken: "Accounts/RefreshToken",
  },
  user: {
    getSavedJobs: "JobSeeker/GetSavedJobs",
    getAppliedJobs: "JobSeeker/GetAppliedJobs",
    getAllEmployers: "JobSeeker/GetAllEmployers",
  },
  jobs: {
    getAllJobs: (page: number, size: number) =>
      `JobSeeker/GetAllJobsPaginated?page=${page}&size=${size}`,
    getJobById: (jobId: number) => `JobSeeker/GetJobById/${jobId}`,
    saveJob: "JobSeeker/SaveJob",
    unsaveJob: "JobSeeker/UnsaveJob",
    applyForJob: "JobSeeker/ApplyForJob",
  },
};
