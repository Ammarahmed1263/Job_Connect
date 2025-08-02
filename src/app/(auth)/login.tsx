import {
  AppButton,
  AppIcon,
  AppLoading,
  AppLogo,
  AppText,
  ControlledLabelInput,
} from "@components/ui";
import { hs, vs } from "@constants/metrics";
import { useTheme } from "@contexts/ThemeContext";
import Icon from "@expo/vector-icons/Ionicons";
import { useSafeArea } from "@hooks/useSafeArea";
import useAuthStore from "@store/authStore";
import { LoginFormData } from "@type/authTypes";
import { focusRef } from "@utils";
import { useRouter } from "expo-router";
import { useSearchParams } from "expo-router/build/hooks";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import {
  Keyboard,
  ScrollView,
  TextInput,
  View
} from "react-native";
import authRules from "schemas/auth";

const Login = () => {
  const router = useRouter();
  const { colors } = useTheme();
  const passwordRef = useRef<TextInput | null>(null);
  const { control, handleSubmit, clearErrors } = useForm<LoginFormData>({
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { top, bottom } = useSafeArea();
  const { login, isLoading, error } = useAuthStore();
  const params = useSearchParams();

  const onSubmit = async (data: LoginFormData) => {
    try {
      Keyboard.dismiss();
      await login(data);
      const redirectTo = params.get("redirectTo") || "/explore";
      router.replace({
        pathname: redirectTo as any,
      });
    } catch (error) {
      console.log("final login error: ", (error as Error).message);
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
      <View className="flex-1 mx-4 justify-center">
        <View className="flex-1 flex-grow-0 justify-center">
          <AppLogo
            width={hs(130)}
            height={hs(130)}
            style={{ alignSelf: "center", marginBottom: vs(15) }}
          />
          <AppText className="text-center mx-8">
            Welcome back! We have missed you!
          </AppText>

          <ControlledLabelInput
            control={control}
            clearErrors={clearErrors}
            name="email"
            title="Email"
            placeholder="example@domain.com"
            inputMode="email"
            rules={authRules.email}
            autoComplete="email"
            autoCapitalize="none"
            autoCorrect={false}
            autoFocus={true}
            submitBehavior="submit"
            onSubmitEditing={() => focusRef(passwordRef)}
            leftComponent={({ focused }) => (
              <Icon
                name="mail-outline"
                size={24}
                color={
                  focused ? colors["--accent-color"] : colors["--text-primary"]
                }
              />
            )}
          />

          <ControlledLabelInput
            ref={passwordRef}
            control={control}
            clearErrors={clearErrors}
            name="password"
            title="Password"
            placeholder="password"
            rules={authRules.password}
            autoComplete="password"
            returnKeyType="done"
            rightComponent={({ passwordVisible, focused }) => (
              <AppIcon
                name={passwordVisible ? "eye-outline" : "eye-closed"}
                size={22}
                color={
                  focused ? colors["--accent-color"] : colors["--text-primary"]
                }
              />
            )}
            leftComponent={({ focused }) => (
              <Icon
                name="lock-closed-outline"
                size={22}
                color={
                  focused ? colors["--accent-color"] : colors["--text-primary"]
                }
              />
            )}
            secureTextEntry
          />

          {error && (
            <AppText
              variant="light"
              className="py-4 text-center color-[--error-color]"
            >
              {error}
            </AppText>
          )}
          <AppButton
            title="Login"
            wrapperClassName="mt-12 mb-4"
            onPress={handleSubmit(onSubmit, (e) => {
              console.log("Form has errors - aborting submission", e);
            })}
            disabled={isLoading}
          >
            {isLoading && (
              <View className="items-center justify-center">
                <AppText className="opacity-0">Login</AppText>
                <AppLoading size={100} containerClassName="absolute"/>
              </View>
            )}
          </AppButton>
          <AppButton
            textVariant="light"
            title="forgot password?"
            wrapperClassName="ms-4 mt-2 self-center"
            onPress={() => console.log("i was clicked!")}
            flat
          />
        </View>
        <View className="h-[1px] bg-[--text-muted] my-6 mx-4" />
        <View className="flex-row items-center justify-center mb-8">
          <AppText>Don't have an account?</AppText>
          <AppButton
            title="Register"
            onPress={() => router.replace("/register")}
            wrapperClassName="border-b-[1px] !border-[--accent-color] rounded-b-none mx-1 self-start"
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
