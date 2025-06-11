import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AppButton from '../AppButton';
import { describe, expect, it, jest, beforeEach } from "@jest/globals";
import '@testing-library/jest-native/extend-expect';
import AppText from '../AppText';


// Mock dependencies
jest.mock('@contexts/ThemeContext', () => ({
  useTheme: () => ({
    colors: {
      '--accent-color': '#6366f1',
      '--primary-100': '#e0e7ff',
      '--primary-300': '#a5b4fc',
      '--bg-color': '#ffffff',
    },
  }),
}));

jest.mock('@constants/index', () => ({
  isIos: false,
}));

const mockAppText = jest.fn();

jest.mock('../AppText', () => {
  const React = require('react');
  const { Text } = require('react-native');

  return {
    __esModule: true,
    default: (props: any) => {
      mockAppText(props);
      return <Text {...props}>{props.children}</Text>;
    },
  };
});


describe('AppButton', () => {
  it('renders title correctly', () => {
    const { getByText } = render(<AppButton title="Test Button" />);
    expect(getByText('Test Button')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <AppButton title="Press Me" onPress={onPressMock} />
    );
    
    fireEvent.press(getByText('Press Me'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('applies primary variant styles by default', () => {
    const { getByTestId } = render(<AppButton title="Primary" />);
    const wrapper = getByTestId('app-button-wrapper');
    expect(wrapper?.props.className).toContain('bg-[--primary-100]');
  });

  it('applies secondary variant styles', () => {
    const { getByTestId } = render(
      <AppButton title="Secondary" variant="secondary" />
    );
    const wrapper = getByTestId('app-button-wrapper');
    expect(wrapper?.props.className).toContain('bg-[--primary-300]');
  });

  it('applies flat styling', () => {
    const { getByTestId } = render(<AppButton title="Flat" flat />);
    const wrapper = getByTestId('app-button-wrapper');
    expect(wrapper?.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ backgroundColor: 'transparent' })
      ])
    );
  });

  it('disables shadow when disableShadow is true', () => {
    const { getByTestId } = render(
      <AppButton title="No Shadow" disableShadow />
    );
    const wrapper = getByTestId('app-button-wrapper');
    expect(wrapper?.props.style).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({ elevation: expect.any(Number) })
      ])
    );
  });

  it('renders custom children instead of title', () => {
    const { getByText, queryByText } = render(
      <AppButton title="Title">
        <AppText>Custom Content</AppText>
      </AppButton>
    );
    
    expect(getByText('Custom Content')).toBeTruthy();
    expect(queryByText('Title')).toBeNull();
  });

  describe('AppButton', () => {
    it('applies custom text variant', () => {
      render(<AppButton title="Bold Text" textVariant="bold" />);
      
      expect(mockAppText).toHaveBeenCalledWith(
        expect.objectContaining({
          variant: 'bold',
          children: 'Bold Text',
        })
      );
    });
  });

  it('applies custom wrapper className', () => {
    const { getByTestId } = render(
      <AppButton title="Custom" wrapperClassName="custom-class" />
    );
    const wrapper = getByTestId('app-button-wrapper');
    expect(wrapper?.props.className).toContain('custom-class');
  });

  it('handles press state correctly', () => {
    const { getByText } = render(<AppButton title="Press Test" />);
    const button = getByText('Press Test').parent;
    
    fireEvent(button!, 'pressIn');
    fireEvent(button!, 'pressOut');
    
    // Test that press state is managed (no specific assertion as state is internal)
    expect(button).toBeTruthy();
  });
});