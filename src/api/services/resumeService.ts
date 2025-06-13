import apiClient from "@api/apiClient";
import { endpoints } from "@api/endpoints";
import { getFileMimeType } from "@utils";
import { DocumentPickerAsset } from "expo-document-picker";

const resumeBase = endpoints.resumes;

const resumeService = {
  fetchResumes: async () => {
    try {
      const { data } = await apiClient.get(resumeBase.getResumes);
      console.log('fetch resumes called: ', data)
      return data;
    } catch (error) {
      throw error;
    }
  },
  uploadResume: async (Resume: DocumentPickerAsset) => {
    try {
      const fileToSend = {
        uri: Resume.uri,
        name: Resume.name,
        type: getFileMimeType(Resume.mimeType),
      };

      const formData = new FormData();
      formData.append("Resume", fileToSend as any, fileToSend.name);

      const { data } = await apiClient.postForm(
        resumeBase.uploadResume,
        formData
      );

      console.log("resume uploaded successfully: ", data);
      return data;
    } catch (error) {
      throw error;
    }
  },
  deleteResume: async (resumeId: number) => {
    try {
      const { data } = await apiClient.delete(resumeBase.deleteResume(resumeId));

      console.log("resume deleted successfully: ", data);
      return data;
    } catch (error) {
      console.log('resume deletion failed: ', error)
      throw error;
    }
  }
};

export default resumeService;
