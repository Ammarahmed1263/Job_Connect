import React from 'react';
import { render } from '@testing-library/react-native';
import AppText from '../AppText';
import { fontVariants } from '@constants/Fonts';
import {describe, expect, it, jest} from '@jest/globals';

// Mock the font variants
jest.mock('@constants/Fonts', () => ({
  fontVariants: {
    regular: { fontFamily: 'Montserrat-Regular', fontSize: 14 },
    light: { fontFamily: 'Montserrat-Light', fontSize: 14 },
    bold: { fontFamily: 'Montserrat-Bold', fontSize: 14 },
  },
}));

describe('AppText', () => {
  it('renders children correctly', () => {
    const { getByText } = render(<AppText>Hello World</AppText>);
    expect(getByText('Hello World')).toBeTruthy();
  });

  it('applies default variant (regular)', () => {
    const { getByText } = render(<AppText>Test Text</AppText>);
    const textElement = getByText('Test Text');
    expect(textElement.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining(fontVariants.regular)
      ])
    );
  });

  it('applies custom variant', () => {
    const { getByText } = render(
      <AppText variant="bold">Bold Text</AppText>
    );
    const textElement = getByText('Bold Text');
    expect(textElement.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining(fontVariants.bold)
      ])
    );
  });

  it('applies custom style', () => {
    const customStyle = { color: 'red', fontSize: 20 };
    const { getByText } = render(
      <AppText style={customStyle}>Styled Text</AppText>
    );
    const textElement = getByText('Styled Text');
    expect(textElement.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining(customStyle)])
    );
  });

  it('applies className correctly', () => {
    const { getByText } = render(
      <AppText className="text-red-500">Classed Text</AppText>
    );
    const textElement = getByText('Classed Text');
    expect(textElement.props.className).toContain('text-red-500');
  });

  it('passes through additional props', () => {
    const { getByText } = render(
      <AppText testID="test-text" numberOfLines={2}>
        Test Text
      </AppText>
    );
    const textElement = getByText('Test Text');
    expect(textElement.props.testID).toBe('test-text');
    expect(textElement.props.numberOfLines).toBe(2);
  });
});