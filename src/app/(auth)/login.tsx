import { AppText, LabelInput, AppButton } from "@components/ui";
import { useTheme } from "@contexts/ThemeContext";
import Icon from "@expo/vector-icons/Ionicons";
import { focusRef } from "@utils";
import { useRouter } from "expo-router";
import { useRef } from "react";
import { StatusBar, TextInput, View } from "react-native";

const Login = () => {
  const router = useRouter();
  const { colors } = useTheme();
  const passwordRef = useRef<TextInput>(null);

  return (
    <View className="flex-1" style={{ paddingTop: StatusBar.currentHeight }}>
      <View className="flex-1 gap-y-4 justify-center align-center mx-2">
        <AppText className="text-center">
          Welcome back! We have missed you!
        </AppText>
        <LabelInput
          title="Email"
          placeholder="example@domain.com"
          inputMode="email"
          autoComplete="email"
          submitBehavior="submit"
          onSubmitEditing={() => focusRef(passwordRef)}
        >
          <Icon name="mail-outline" size={20} color={colors["--text-primary"]} />
        </LabelInput>
        <LabelInput
          ref={passwordRef}
          title="Password"
          placeholder="password"
          autoComplete="password"
          returnKeyType="done"
          secureTextEntry
        >
          <Icon name="lock-closed-outline" size={20} color={colors["--text-primary"]} />
        </LabelInput>

        <AppButton
          textVariant="light"
          title="forget password?"
          onPress={() => console.log("i was clicked!")}
          wrapperClassName="self-end"
          flat
        />
        <AppButton title="Login" onPress={() => console.log("hello, world")} />
      </View>
      <View className="flex-row items-center justify-center mb-8">
        <AppText>First Time?</AppText>
        <AppButton
          title="Register"
          onPress={() => router.replace("/register")}
          wrapperClassName="border-b-[1px] border-[--primary-200] rounded-b-none mx-1"
          textClassName="color-[--primary-200] -mb-1 mt-1"
          textVariant="light"
          flat
        />
      </View>
    </View>
  );
};

export default Login;
