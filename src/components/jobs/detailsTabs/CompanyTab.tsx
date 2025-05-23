import { AppText } from "@components/ui";
import { View } from "react-native";
import { Employer } from "@type/jobTypes";

interface CompanyTabProps {
  employer: Employer;
}

const CompanyTab = ({ employer }: CompanyTabProps) => {
  return (
    <View className="p-4">
      <AppText variant="medium" className="text-lg mb-2">About Company</AppText>
      <AppText className="color-[--text-muted] mb-4">
        {employer.companyName} is a {employer.companySize} company in the {employer.industry} industry.
      </AppText>
    </View>
  );
};

export default CompanyTab;