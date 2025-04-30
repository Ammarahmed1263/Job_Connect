import { AppButton, AppText } from "@components/ui";
import ControlledLabelInput from "@components/ui/ControlledLabelInput";
import { useTheme } from "@contexts/ThemeContext";
import Icon from "@expo/vector-icons/Ionicons";
import { useSafeArea } from "@hooks/useSafeArea";
import useAuthStore from "@store/authStore";
import { LoginFormData } from "@type/authTypes";
import { focusRef } from "@utils";
import { useRouter } from "expo-router";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import {
  ScrollView,
  TextInput,
  View
} from "react-native";
import authRules from "schemas/auth";

const Login = () => {
  const router = useRouter();
  const { colors } = useTheme();
  const passwordRef = useRef<TextInput>(null);
  const { control, handleSubmit, setError } = useForm<LoginFormData>({
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { top, bottom } = useSafeArea();
  const { login } = useAuthStore();

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data);
      router.replace('/');
    } catch(error) {
      console.log('final error passed: ', (error as Error).message);
      // Error already handled in store, but could add local handling here
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
      <View className="flex-1 mx-2">
        <View className="flex-1 justify-center">
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
            wrapperClassName="ms-4 mt-2"
            onPress={() => console.log("i was clicked!")}
            flat
          />
          <AppButton
            title="Login"
            wrapperClassName="self-end"
            onPress={handleSubmit(onSubmit, (e) => {
              console.log("Form has errors - aborting submission", e);
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
    </ScrollView>
  );
};

export default Login;
