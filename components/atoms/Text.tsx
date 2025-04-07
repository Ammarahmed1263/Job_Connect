import clsx from 'clsx';
import React, { FC } from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';

interface AppTextProps extends TextProps{
  className?: string
}

const AppText: FC<AppTextProps> = ({ children, className, ...props}) => {
  return (
    <Text className={clsx('font-montserrat', className)} {...props}>{children}</Text>
  )
}

export default AppText

const styles = StyleSheet.create({})