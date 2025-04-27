import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useMemo } from 'react';

export const useSafeArea = () => {
  const insets = useSafeAreaInsets();

  return useMemo(() => ({
    top: insets.top,
    bottom: insets.bottom,
    left: insets.left,
    right: insets.right,
  }), [insets]);
};
