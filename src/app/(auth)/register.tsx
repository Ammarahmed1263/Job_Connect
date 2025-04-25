import { AccountSecurity, ContactInfo, PersonalInfo, ProfessionalInfo } from "@components/register";
import { AppButton, AppText, LabelInput } from "@components/ui";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StatusBar, View } from "react-native";

const Register = () => {
  const [step, setStep] = useState(1);
  const router = useRouter();
  console.log('height: ', StatusBar.currentHeight);

  return (
    <View className="flex-1" style={{ paddingTop: StatusBar.currentHeight }}>
      <View className="flex-1  justify-center align-center mx-2" >
        <AppText className="text-center" variant="medium">
          Explore a new world of job hunting!
        </AppText>
        <View className="border-2 border-[--primary-300] mx-4 mt-2 mb-4 py-4">
          <AppText className="text-center">
            I will be a progress indicator: {step}
          </AppText> 
        </View>

        {step === 1 && <PersonalInfo setStep={setStep} />}

        {step === 2 && <ContactInfo setStep={setStep} />}

        {step === 3 && <ProfessionalInfo setStep={setStep} />}

        {step === 4 && <AccountSecurity setStep={setStep} />}
      </View>
      <View className="flex-row items-center justify-center mb-8">
        <AppText>Already Have an account?</AppText>
        <AppButton
          title="Login"
          onPress={() => router.replace("/login")}
          wrapperClassName="border-b-[1px] border-[--primary-200] rounded-b-none mx-1"
          textClassName="color-[--primary-200] -mb-1 mt-1"
          textVariant="light"
          flat
        />
      </View>
    </View>
  );
};

export default Register;
