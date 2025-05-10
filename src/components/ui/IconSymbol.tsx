import Ionicons from '@expo/vector-icons/Ionicons';
import { SymbolWeight } from 'expo-symbols';
import React, { ComponentProps } from 'react';
import { OpaqueColorValue, StyleProp, TextStyle, ViewStyle } from 'react-native';

export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: ComponentProps<typeof Ionicons>['name'];
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  return <Ionicons color={color} size={size} name={name} style={style} />;
}
