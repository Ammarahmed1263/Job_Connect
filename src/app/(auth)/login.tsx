import { AppButton, AppText } from "@components/ui";
import ControlledLabelInput from "@components/ui/ControlledLabelInput";
import { useTheme } from "@contexts/ThemeContext";
import Icon from "@expo/vector-icons/Ionicons";
import { useSafeArea } from "@hooks/useSafeArea";
import { LoginFormData } from "@type/auth";
import { focusRef } from "@utils";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "expo-router";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { StatusBar, TextInput, View } from "react-native";
import authRules from "schemas/auth";

const Login = () => {
  const router = useRouter();
  const { colors } = useTheme();
  const passwordRef = useRef<TextInput>(null);
  const { control, handleSubmit, trigger } = useForm<LoginFormData>({
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const {top, bottom} = useSafeArea();

  const logUserIn = async (data: LoginFormData): Promise<AxiosResponse> => {
    return await axios.post(
      "https://job-connect.runasp.net/api/Accounts/Login",
      data
    );
  };

  const onSubmit = async (data: LoginFormData) => {
    console.log("form state: ", JSON.stringify(data, null, 2));
    try {
      const response = await logUserIn(data);
      router.replace("/");
      console.log('api responded with: ', response?.data);
    } catch (error) {
      const errorResponse: AxiosError = error as AxiosError;
      console.error("error occured logging user in: ", errorResponse.message);
    }
  };

  return (
    <View className="flex-1" style={{ paddingTop: top}}>
      <View className="flex-1 gap-y-4 align-center justify-center mx-2">
        <AppText className="text-center">
          Welcome back! We have missed you! 
        </AppText>

        <ControlledLabelInput
          control={control}
          name="email"
          title="Email"
          placeholder="example@domain.com"
          inputMode="email"
          rules={authRules.email}
          autoComplete="email"
          submitBehavior="submit"
          onSubmitEditing={() => focusRef(passwordRef)}
        >
          <Icon
            name="mail-outline"
            size={20}
            color={colors["--text-primary"]}
          />
        </ControlledLabelInput>

        <ControlledLabelInput
          ref={passwordRef}
          control={control}
          name="password"
          title="Password"
          placeholder="password"
          rules={{ required: authRules.password.required }}
          autoComplete="password"
          returnKeyType="done"
          secureTextEntry
        >
          <Icon
            name="lock-closed-outline"
            size={20}
            color={colors["--text-primary"]}
          />
        </ControlledLabelInput>

        <AppButton
          textVariant="light"
          title="forget password?"
          onPress={() => console.log("i was clicked!")}
          flat
        />
        <AppButton
          title="Login"
          wrapperClassName="self-end"
          onPress={handleSubmit(onSubmit, (e) => {
            console.log('Form has errors - aborting submission', e);
          })}
        />
      </View>
      <View className="flex-row items-center justify-center mb-8">
        <AppText>Don't have an account?</AppText>
        <AppButton
          title="Register"
          onPress={() => router.replace("/register")}
          wrapperClassName="border-b-[1px] border-[--accent-color] rounded-b-none mx-1"
          textClassName="!text-[--accent-color] -mb-1 mt-1"
          textVariant="light"
          flat
        />
      </View>
    </View>
  );
};

export default Login;
