import clsx from "clsx";
import React, { FC } from "react";
import { View, ViewProps } from "react-native";
import AppButton, { Props as AppButtonProps } from "./AppButton";
import AppLoading from "./AppLoading";
import AppText from "./AppText";

interface SubmitButtonProps extends Omit<AppButtonProps, "children"> {
  isLoading?: boolean;
  loadingContainerClassName?: ViewProps["className"];
  loadingSource?: any;
  wrapperClassName?: ViewProps["className"];
}

const SubmitButton: FC<SubmitButtonProps> = ({
  title,
  isLoading = false,
  loadingContainerClassName,
  loadingSource,
  disabled,
  wrapperClassName,
  ...props
}) => {
  return (
    <AppButton
      title={title}
      disabled={disabled || isLoading}
      className={clsx(isLoading && "px-4 py-3")}
      wrapperClassName={clsx(
        isLoading && "!border-2 border-[--accent-color]",
        wrapperClassName
      )}
      flat={isLoading}
      {...props}
    >
      {isLoading && (
        <View
          className={`items-center justify-center ${
            loadingContainerClassName || ""
          }`}
        >
          <AppText className="opacity-0">{title}</AppText>
          <AppLoading
            source={loadingSource || require("@assets/lottie/spinner.json")}
            containerClassName="absolute"
          />
        </View>
      )}
    </AppButton>
  );
};

export default SubmitButton;
