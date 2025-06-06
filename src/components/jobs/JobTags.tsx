import { AppButton } from "@components/ui";
import React, { FC } from "react";
import { ScrollView } from "react-native";

interface JobTagsProps {
  tags: string[];
}

const JobTags: FC<JobTagsProps> = ({tags}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="mt-4"
      contentContainerClassName="!gap-3"
      nestedScrollEnabled
    >
      {tags.map((tag, i) => (
        <AppButton
          key={tag + i}
          variant="secondary"
          textVariant="light"
          title={tag}
          wrapperClassName="bg-[--text-secondary] !rounded-sm"
          textClassName="!py-1 !px-3 leading-tight"
          disabled
        />
      ))}
    </ScrollView>
  );
};

export default JobTags;
