import React from 'react';
import { render } from '@testing-library/react-native';
import { describe, expect, it, jest, beforeEach } from '@jest/globals';
import '@testing-library/jest-native/extend-expect';

const mockAppText = jest.fn();
jest.mock('../AppText', () => ({
  __esModule: true,
  default: (props: any) => {
    mockAppText(props);
    const { Text } = require('react-native');
    return <Text {...props}>{props.children}</Text>;
  },
}));

describe('AppIcon', () => {
  let mockIcon: jest.Mock;

  beforeEach(() => {
    jest.resetModules(); // Clear module registry
    jest.clearAllMocks();
    mockIcon = jest.fn(() => null);
    global.__DEV__ = true;
  });

  it('renders valid icon correctly', () => {
    jest.doMock('@assets/icons', () => ({
      __esModule: true,
      home: mockIcon,
    }));

    const AppIcon = require('../AppIcon').default;
    render(<AppIcon name="home" size={24} color="red" />);

    expect(mockIcon).toHaveBeenCalledWith(
      expect.objectContaining({
        width: 24,
        height: 24,
        color: 'red',
      }),
      {}
    );
  });

  it('applies default props correctly', () => {
    jest.doMock('@assets/icons', () => ({
      __esModule: true,
      home: mockIcon,
    }));

    const AppIcon = require('../AppIcon').default;
    render(<AppIcon name="home" />);

    expect(mockIcon).toHaveBeenCalledWith(
      expect.objectContaining({
        width: 24,
        height: 24,
        color: 'black',
      }),
      {}
    );
  });

  it('renders fallback for invalid icon name in development', () => {
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const AppIcon = require('../AppIcon').default;

    const { getByText } = render(<AppIcon name="invalid-icon" />);
    expect(getByText('?')).toBeTruthy();
    expect(consoleSpy).toHaveBeenCalledWith(
      '[AppIcon] Invalid icon name passed: "invalid-icon"'
    );

    consoleSpy.mockRestore();
  });

  it('does not log warning in production', () => {
    global.__DEV__ = false;
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const AppIcon = require('../AppIcon').default;

    render(<AppIcon name="invalid-icon" />);
    expect(consoleSpy).not.toHaveBeenCalled();

    consoleSpy.mockRestore();
  });

  it('passes through additional SVG props', () => {
    jest.doMock('@assets/icons', () => ({
      __esModule: true,
      home: mockIcon,
    }));

    const AppIcon = require('../AppIcon').default;
    render(<AppIcon name="home" testID="test-icon" opacity={0.5} />);

    expect(mockIcon).toHaveBeenCalledWith(
      expect.objectContaining({
        testID: 'test-icon',
        opacity: 0.5,
      }),
      {}
    );
  });
});
