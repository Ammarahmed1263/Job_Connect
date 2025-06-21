import { ProfileCompletionProgress } from "@components/complete-profile";
import {
  AccountSecurity,
  ContactInfo,
  PersonalInfo,
  ProfessionalInfo,
} from "@components/register";
import { AppButton, AppLogo, AppText } from "@components/ui";
import { hs, vs, width } from "@constants/metrics";
import { useSafeArea } from "@hooks/useSafeArea";
import useAuthStore from "@store/authStore";
import { RegisterFormData } from "@type/authTypes";
import { useRouter } from "expo-router";
import { useSearchParams } from "expo-router/build/hooks";
import React, { useState } from "react";
import { FieldErrors, FormProvider, useForm } from "react-hook-form";
import { Keyboard, ScrollView, View, StatusBar } from "react-native";

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
      Keyboard.dismiss();
      await register(data);
      const redirectTo = params.get("redirectTo") || "/explore";
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
          <View className="flex-1 flex-grow-0 mx-4">
            <AppLogo
              width={hs(130)}
              height={hs(130)}
              style={{ alignSelf: "center", marginBottom: vs(15) }}
            />

            <AppText className="text-center" variant="medium">
              Explore a new world of job hunting!
            </AppText>
            <ProfileCompletionProgress completed={step} total={4}/>

            {step === 1 && <PersonalInfo setStep={setStep} />}

            {step === 2 && <ContactInfo setStep={setStep} />}

            {step === 3 && <ProfessionalInfo setStep={setStep} />}

            {step === 4 && (
              <AccountSecurity
                setStep={setStep}
                onSubmit={handleSubmit(onSubmit, (e: FieldErrors<RegisterFormData>) => {
                  console.log("Form has errors - aborting submission", e);
                })}
              />
            )}
          </View>
          <View className="h-[1px] bg-[--text-muted] my-6 mx-6" />
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
