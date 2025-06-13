import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import resumeService from "@api/services/resumeService";
import { Resume } from "@type/userTypes";
import * as DocumentPicker from "expo-document-picker";

export const useFetchResumes = () =>
  useQuery<Resume[]>({
    queryKey: ["resumes"],
    queryFn: async () => {
      const response = await resumeService.fetchResumes();
      return response.data;
    },
  });

export const useUploadResume = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (document: DocumentPicker.DocumentPickerAsset) => {
      return resumeService.uploadResume(document);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["resumes"],
      });
      queryClient.invalidateQueries({
        queryKey: ["getSeekerProfile"],
      });
    },
    onError: (error) => {
      console.error("Error uploading resume:", error);
    },
  });
};

export const useDeleteResume = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (resumeId: number) => {
      return resumeService.deleteResume(resumeId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["resumes"],
      });
      queryClient.invalidateQueries({
        queryKey: ["getSeekerProfile"],
      });
    },
  });
};
