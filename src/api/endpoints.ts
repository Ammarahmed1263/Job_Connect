import { JobApplicationParams } from "@type/jobTypes";

export const publicEndpoints = [
  "Accounts/Register/JobSeeker",
  "Accounts/Login",
  "Accounts/Logout",
  "Accounts/ForgotPassword",
  "Accounts/ResetPassword",
  "Accounts/RefreshToken",
  "Home/GetAllJobs",
  "Home/GetAllTags",
  "Home/ContactUs",
];

export const endpoints = {
  accounts: {
    register: "Accounts/Register/JobSeeker",
    login: "Accounts/Login",
    logout: "Accounts/Logout",
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
    getEmployerById: "JobSeeker/GetEmployerById",
  },
  resumes: {
    getResumeByPath: "JobSeeker/GetResume",
    uploadResume: "JobSeeker/UploadResume",
    deleteResume: (resumeId: number) => `JobSeeker/DeleteResume/${resumeId}`,
    getResumes: "JobSeeker/GetResumes",
  },
  jobs: {
    getAllJobs: (page: number, size: number) =>
      `JobSeeker/GetAllJobsPaginated?pageNumber=${page}&pageSize=${size}`,
    getJobById: (jobId: number) => `JobSeeker/GetJobById/${jobId}`,
    saveJob: "JobSeeker/SaveJob",
    unsaveJob: "JobSeeker/UnsaveJob",
    applyForJobByResumeId: ({jobId, resumeId}: Omit<JobApplicationParams, "CoverLetter">) =>
      `JobSeeker/ApplyForJobByResumeId/${jobId}/${resumeId}`,
  },
  home: {
    getAllJobs: "Home/GetAllJobs",
    getAllTags: "Home/GetAllTags",
    contactUs: "Home/ContactUs",
  },
  notifications: {
    getNotifications: "Notification/user-notifications",
    markNotificationAsRead: (notificationId: string) =>
      `Notification/mark-read/${notificationId}`,
    sendPushToken: "Notification/push-token",
  },
  machine: {
    getRecomendedJobs:
      "https://jobconnectrecommendationsystem.onrender.com/recommend",
  },
};
