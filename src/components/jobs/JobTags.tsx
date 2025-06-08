import { AppButton, AppText } from "@components/ui";
import React, { FC } from "react";
import { ScrollView, View } from "react-native";

interface JobTagsProps {
  tags: string[];
}

const JobTags: FC<JobTagsProps> = ({ tags }) => {
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      className="mt-4"
      contentContainerClassName="!gap-3"
      nestedScrollEnabled={tags.length > 2}
      horizontal
    >
      {tags.map((tag, index) => (
        <View key={tag + index} className="bg-slate-500/30 dark:bg-white/30 py-1 px-3 rounded-sm">
          <AppText variant="light" className="!text-[--bg-color]">
            {tag}
          </AppText>
        </View>
      ))}
    </ScrollView>
  );
};

export default JobTags;
