import {
  AccountSecurity,
  ContactInfo,
  PersonalInfo,
  ProfessionalInfo,
} from "@components/register";
import { AppButton, AppText } from "@components/ui";
import { useSafeArea } from "@hooks/useSafeArea";
import useAuthStore from "@store/authStore";
import { RegisterFormData } from "@type/authTypes";
import { useRouter } from "expo-router";
import { useSearchParams } from "expo-router/build/hooks";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ScrollView, StatusBar, View } from "react-native";

const Register = () => {
  const [step, setStep] = useState(1);
  const router = useRouter();
  const methods = useForm<RegisterFormData>({
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      personal: { firstName: "", lastName: "" },
      contact: { email: "", phone: "", address: "" },
      professional: { jobTitle: "", degree: "", experience: "" },
      account: { password: "", confirmPassword: "" },
    },
  });
  const { top, bottom } = useSafeArea();
  const { register } = useAuthStore();
  const params = useSearchParams();
  const { handleSubmit } = methods;

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await register(data);
      const redirectTo = params.get("redirectTo") || "/home";
      router.replace({
        pathname: redirectTo as any,
      });
    } catch (error) {
      console.log("final register error: ", (error as Error).message);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        paddingTop: top,
        paddingBottom: bottom,
      }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <FormProvider {...methods}>
        <View
          className="flex-1"
          style={{ paddingTop: StatusBar.currentHeight }}
        >
          <View className="flex-1  justify-center align-center mx-2 mb-4">
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

            {step === 4 && (
              <AccountSecurity
                setStep={setStep}
                onSubmit={handleSubmit(onSubmit, (e) => {
                  console.log("Form has errors - aborting submission", e);
                })}
              />
            )}
          </View>
          <View className="flex-row items-center justify-center mb-8">
            <AppText>Already Have an account?</AppText>
            <AppButton
              title="Login"
              onPress={() => router.replace("/login")}
              wrapperClassName="border-b-[1px] border-[--accent-color] rounded-b-none mx-1 self-start"
              textClassName="!text-[--accent-color] -mb-1 mt-1"
              textVariant="light"
              flat
            />
          </View>
        </View>
      </FormProvider>
    </ScrollView>
  );
};

export default Register;
