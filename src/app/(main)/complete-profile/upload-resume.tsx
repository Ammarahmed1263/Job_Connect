import { AppButton, AppIcon, AppText, NavigationHeader } from "@components/ui";
import React from "react";
import { Alert, FlatList, TouchableOpacity, View } from "react-native";
import { Resume } from "@type/userTypes";
import { useFetchResumes, useUploadResume } from "@queries/resumeQueries";
import { useTheme } from "@contexts/ThemeContext";
import { handlePickDocument } from "@utils";
import ResumeItem from "@components/complete-profile/ResumeItem";

const UploadResume = () => {
  const { data: resumes = [], isPending } = useFetchResumes();
  const { mutateAsync } = useUploadResume();
  const { colors } = useTheme();

  return (
    <>
      <NavigationHeader title="Resume/CV" />
      <View className="flex-1 px-4">
        <View className="w-full h-40 mt-10 mb-4">
          <TouchableOpacity
            className="w-full h-full items-center justify-center border border-[--accent-color] border-dashed rounded-lg p-4"
            onPress={() => handlePickDocument(mutateAsync)}
          >
            <AppIcon
              name="file-send"
              size={50}
              color={colors["--accent-color"]}
            />
            <AppText className="text-center">Browse file</AppText>
          </TouchableOpacity>
        </View>

        {isPending ? (
          <AppText className="text-center mt-4">Loading...</AppText>
        ) : (
          <>
            <AppText className="mt-4 border-b border-[--accent-color] self-start pe-2 pb-1 !font-montserrat-bold">
              You have {resumes.length} document{resumes.length > 1 && "s"}:
            </AppText>
            <FlatList
              data={resumes}
              renderItem={({ item }) => <ResumeItem item={item} />}
              keyExtractor={(item) => item.id.toString()}
              ListEmptyComponent={() => (
                <AppText className="text-center mt-8">
                  Your uploaded documents will appear here.
                </AppText>
              )}
            />
          </>
        )}
      </View>
    </>
  );
};

export default UploadResume;
