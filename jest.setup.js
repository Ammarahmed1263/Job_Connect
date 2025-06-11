jest.mock('expo-blur', () => ({
  BlurView: 'BlurView',
}));

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn(),
  notificationAsync: jest.fn(),
  selectionAsync: jest.fn(),
}));

// Keep only one mock for react-native-safe-area-context
jest.mock('react-native-safe-area-context', () => {
  const MockSafeAreaProvider = ({ children }) => children;
  MockSafeAreaProvider.displayName = 'SafeAreaProvider'; // Optional: for better debugging

  return {
    SafeAreaProvider: MockSafeAreaProvider,
    SafeAreaView: ({ children }) => children, // Mock SafeAreaView as well if used directly
    useSafeAreaInsets: () => ({
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    }),
    useSafeAreaFrame: () => ({ x: 0, y: 0, width: 375, height: 667 }),
    initialWindowMetrics: {
      frame: { x: 0, y: 0, width: 0, height: 0 },
      insets: { top: 0, left: 0, right: 0, bottom: 0 },
    },
  };
});

jest.mock('@expo/vector-icons/Ionicons', () => {
  const { Text } = require('react-native');
  return jest.fn((props) => <Text {...props} />);
});

jest.mock('react-native/Libraries/StyleSheet/StyleSheet', () => {
  const RealStyleSheet = jest.requireActual('react-native/Libraries/StyleSheet/StyleSheet');
  return {
    ...RealStyleSheet,
    absoluteFill: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
  };
});

jest.mock('react-native-css-interop', () => {
  const mockStyled = (Component) => Component;
  return { styled: mockStyled };
});
