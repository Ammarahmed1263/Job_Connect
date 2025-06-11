import { colors } from "@constants/Colors"; // Or your default theme
import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import "@testing-library/jest-native/extend-expect";
import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import LabelInput from "../LabelInput";

// Mock useTheme to provide default theme values
jest.mock("@contexts/ThemeContext", () => ({
  useTheme: () => ({
    colors: {
      "--primary-100": "rgb(79, 70, 229)",
      "--primary-200": "rgb(67, 56, 202)",
      "--primary-300": "rgb(55, 48, 163)",
    }, // Provide your default/mock theme colors
    theme: "dark", // Provide a default theme name
    isDarkTheme: true, // Provide a default value
    setTheme: jest.fn(), // Mock setTheme function
  }),
}));

jest.mock("@constants/metrics", () => ({
  ms: (value: number) => value,
}));

// Mock @expo/vector-icons/Ionicons
const MockIonicons = jest.fn();
jest.mock("@expo/vector-icons/Ionicons", () => ({
  __esModule: true,
  default: (props: any) => {
    MockIonicons(props);
    const { Text } = require("react-native");
    return <Text {...props}>{props.children}</Text>;
  },
}))

// Mock AppText
const mockAppText = jest.fn();
jest.mock("../AppText", () => ({
  __esModule: true,
  default: (props: any) => {
    mockAppText(props);
    const { Text } = require("react-native");
    return <Text {...props}>{props.children}</Text>;
  },
}));

describe("LabelInput", () => {
  const defaultProps = {
    title: "Test Title",
    onChangeText: jest.fn(),
    onFocus: jest.fn(),
    onBlur: jest.fn(),
    error: "Error Title",
    placeholder: "Enter text",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Helper to render with ThemeProvider if you prefer this over mocking useTheme directly
  // const renderWithTheme = (component: React.ReactElement) => {
  //   return render(<ThemeProvider>{component}</ThemeProvider>);
  // };

  it("renders correctly with default props", () => {
    const { getByTestId } = render(<LabelInput {...defaultProps} />);
    expect(getByTestId("error-message")).toHaveTextContent("Error Title");
    expect(getByTestId("label-input")).toBeTruthy();
    expect(getByTestId("label-input")).toHaveProp("placeholder", "Enter text");
  });

  it("does not render title when empty", () => {
    const { queryByTestId } = render(<LabelInput {...defaultProps} title="" />);
    expect(queryByTestId("label-input-title")).toBeNull();
  });

  it("displays error message when provided", () => {
    const { getByTestId } = render(
      <LabelInput {...defaultProps} error="Required field" />
    );
    const errorMessage = getByTestId("error-message");
    expect(errorMessage).toHaveTextContent("Required field");
    // Check if the AppText component for the error has the correct className for styling
    expect(errorMessage.props["className"]).toContain(
      "color-[--error-color]"
    );
  });

  it("applies focus styles when focused", () => {
    const { getByTestId } = render(<LabelInput {...defaultProps} error="" />);
    const input = getByTestId("label-input");
    fireEvent(input, "focus");
    const pressable = getByTestId("pressable-container");
    // Check for the className that applies the focus border
    expect(pressable.props.className).toContain("border-[--accent-color]");
  });

  it("applies error styles when error is present", () => {
    const { getByTestId } = render(
      <LabelInput {...defaultProps} error="Required field" />
    );
    const pressable = getByTestId("pressable-container");
    // Check for the className that applies the error border
    expect(pressable.props.className).toContain("border-[--error-color]");
  });

  it("toggles password visibility when secureTextEntry is true", () => {
    const { getByTestId } = render(
      <LabelInput {...defaultProps} secureTextEntry />
    ); // Ensure secureTextEntry is true
    const input = getByTestId("label-input");
    const toggleButton = getByTestId("toggle-visibility");

    expect(input).toHaveProp("secureTextEntry", true);
    expect(getByTestId("icon-eye-off-outline")).toBeTruthy();

    fireEvent.press(toggleButton);
    expect(input).toHaveProp("secureTextEntry", false);
    expect(getByTestId("icon-eye-outline")).toBeTruthy();

    fireEvent.press(toggleButton);
    expect(input).toHaveProp("secureTextEntry", true);
    expect(getByTestId("icon-eye-off-outline")).toBeTruthy();
  });

  it("does not render password toggle when secureTextEntry is false", () => {
    const { queryByTestId } = render(
      <LabelInput {...defaultProps} secureTextEntry={false} />
    ); // Explicitly false
    expect(queryByTestId("toggle-visibility")).toBeNull();
    expect(queryByTestId("icon-eye-off-outline")).toBeNull();
    expect(queryByTestId("icon-eye-outline")).toBeNull();
  });

  it("renders custom left component", () => {
    const leftComponent = jest.fn(() => {
      const { Text } = require("react-native");
      return <Text testID="left-custom-component">Left</Text>;
    });
    const { getByTestId } = render(
      <LabelInput {...defaultProps} leftComponent={leftComponent} />
    );
    expect(leftComponent).toHaveBeenCalled();
    expect(getByTestId("left-custom-component")).toBeTruthy();
  });

  it("renders custom right component for password input", () => {
    const rightComponent = jest.fn((isVisible) => {
      const { Text } = require("react-native");
      return (
        <Text testID="right-custom-component">
          {isVisible ? "Hide" : "Show"}
        </Text>
      );
    });
    const { getByTestId, getByText } = render(
      <LabelInput
        {...defaultProps}
        secureTextEntry
        rightComponent={rightComponent}
      />
    );
    expect(rightComponent).toHaveBeenCalledWith(false); // Initially not visible
    expect(getByText("Show")).toBeTruthy();

    const toggleButton = getByTestId("toggle-visibility");
    fireEvent.press(toggleButton);
    expect(rightComponent).toHaveBeenCalledWith(true); // Now visible
    expect(getByText("Hide")).toBeTruthy();
  });

  it("calls onFocus and onBlur props", () => {
    const onFocusMock = jest.fn();
    const onBlurMock = jest.fn();
    const { getByTestId } = render(
      <LabelInput {...defaultProps} onFocus={onFocusMock} onBlur={onBlurMock} />
    );
    const input = getByTestId("label-input");

    fireEvent(input, "focus");
    expect(onFocusMock).toHaveBeenCalledTimes(1);

    fireEvent(input, "blur");
    expect(onBlurMock).toHaveBeenCalledTimes(1);
  });

  it("applies containerStyle and containerClassName", () => {
    const containerStyle = { marginTop: 10 };
    const containerClassName = "custom-container-class";
    const { getByTestId } = render(
      <LabelInput
        {...defaultProps}
        containerStyle={containerStyle}
        containerClassName={containerClassName}
      />
    );
    const container = getByTestId("container");
    expect(container).toHaveStyle(containerStyle);
    expect(container.props.className).toContain(containerClassName);
    expect(container.props.className).toContain("mx-2"); // Default class
  });
});
