import {
  AppButton,
  AppLogo,
  AppText,
  ControlledLabelInput,
  AppIcon,
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
  ActivityIndicator,
  Keyboard,
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
            leftComponent={() =>
              <Icon
                name="mail-outline"
                size={24}
                color={colors["--text-primary"]}
              />
            }
          />

          <ControlledLabelInput
            ref={passwordRef}
            control={control}
            name="password"
            title="Password"
            placeholder="password"
            rules={authRules.password}
            autoComplete="password"
            returnKeyType="done"
            rightComponent={
              (passwordVisible) => (
                <AppIcon
                  name={passwordVisible ? "eye-outline" : "eye-closed"}
                  size={22}
                  color={colors["--text-primary"]}
                />
              )
            }
            leftComponent={() =>
              <Icon
                name="lock-closed-outline"
                size={22}
                color={colors["--text-primary"]}
              />
            }
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
            wrapperClassName="m-4"
            onPress={handleSubmit(onSubmit, (e) => {
              console.log("Form has errors - aborting submission", e);
            })}
            disabled={isLoading}
          >
            {isLoading && (
              <View className="items-center justify-center">
                <AppText className="opacity-0 px-4 py-2">Login</AppText>
                <ActivityIndicator
                  size="small"
                  color={colors["--accent-color"]}
                  className="absolute"
                />
              </View>
            )}
          </AppButton>
          <AppButton
            textVariant="light"
            title="forget password?"
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
