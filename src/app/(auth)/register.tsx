import {
  AccountSecurity,
  ContactInfo,
  PersonalInfo,
  ProfessionalInfo,
} from "@components/register";
import { AppButton, AppText } from "@components/ui";
import { RegisterFormData } from "@type/auth";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { StatusBar, View } from "react-native";

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

  const { handleSubmit } = methods;

  const authorizeUser = async (data: RegisterFormData): Promise<AxiosResponse> => {
    return await axios.post(
      "https://job-connect.runasp.net/api/Accounts/Register/JobSeeker",
      {
        firstName: data.personal.firstName,
        lastName: data.personal.lastName,
        email: data.contact.email,
        phoneNumber: data.contact.phone,
        password: data.account.password,
        address: data.contact.address,
        yearsOfExperience: data.professional.experience,
        degree: data.professional.degree,
        currentOrDesiredJob: data.professional.jobTitle,
      }
    );
  };

  const onSubmit = async (data: RegisterFormData) => {
    console.log("form state: ", JSON.stringify(data, null, 2));

    try {
      const response = await authorizeUser(data);
      console.log('api responded with: ', response?.data);
      router.replace("/login");
    } catch (error) {
      const errorResponse: AxiosError = error as AxiosError;
      console.error("error occured authorizing user: ", errorResponse.message);
    }
  };

  return (
    <FormProvider {...methods}>
      <View className="flex-1" style={{ paddingTop: StatusBar.currentHeight }}>
        <View className="flex-1  justify-center align-center mx-2">
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

          {step === 4 && <AccountSecurity setStep={setStep} onSubmit={handleSubmit(onSubmit, (e) => {
            console.log('Form has errors - aborting submission', e);
          })} />}
        </View>
        <View className="flex-row items-center justify-center mb-8">
          <AppText>Already Have an account?</AppText>
          <AppButton
            title="Login"
            onPress={() => router.replace("/login")}
            wrapperClassName="border-b-[1px] border-[--accent-color] rounded-b-none mx-1"
            textClassName="!text-[--accent-color] -mb-1 mt-1"
            textVariant="light"
            flat
          />
        </View>
      </View>
    </FormProvider>
  );
};

export default Register;
