export const publicEndpoints = [
  "Accounts/Register/JobSeeker",
  "Accounts/Login",
  "Home/GetAllJobs",
  "Home/GetAllTags",
  "Home/ContactUs",
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
    getSeekerProfile: "JobSeeker/GetSeekerProfile",
    updateSeekerProfile: "JobSeeker/UpdateSeekerProfile",
    deleteSeekerProfile: "JobSeeker/DeleteSeekerProfile",
    getEmployerById: 'JobSeeker/GetEmployerById',
  },
  resumes: {
    getResumeByPath: 'JobSeeker/GetResume',
    uploadResume: 'JobSeeker/UploadResume',
    deleteResume: 'JobSeeker/DeleteResume',
    getResumes: 'JobSeeker/GetResumes',
  },
  jobs: {
    getAllJobs: (page: number, size: number) =>
      `JobSeeker/GetAllJobsPaginated?pageNumber=${page}&pageSize=${size}`,
    getJobById: (jobId: number) => `JobSeeker/GetJobById/${jobId}`,
    saveJob: "JobSeeker/SaveJob",
    unsaveJob: "JobSeeker/UnsaveJob",
    applyForJob: "JobSeeker/ApplyForJob",
    applyForJobByResumeId: "JobSeeker/ApplyForJobByResumeId",
  },
  home: {
    getAllJobs: "Home/GetAllJobs",
    getAllTags: "Home/GetAllTags",
    contactUs: "Home/ContactUs",
  },
};
