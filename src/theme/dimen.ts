import DeviceInfo from 'react-native-device-info';

export const fw = (size: number) => DeviceInfo.isTablet() ? Math.round(Number(size) * 1.3) : Number(size);
export const font = (size: number) => DeviceInfo.isTablet() ? Math.round(Number(size) * 1.3) : Number(size);

const margin: Size = {
  tiny: fw(2),
  xsmall: fw(4),
  small: fw(8),
  medium: fw(16),
  large: fw(24),
  xlarge: fw(32),
};

const text: TextSize = {
  label: {
    tiny: font(6),
    xsmall: font(7),
    small: font(8),
    medium: font(9),
    large: font(10),
    xlarge: font(11),
  },
  content: {
    tiny: font(10),
    xsmall: font(11),
    small: font(12),
    medium: font(13),
    large: font(14),
    xlarge: font(15),
  },
  heading: {
    tiny: font(16),
    xsmall: font(18),
    small: font(20),
    medium: font(22),
    large: font(24),
    xlarge: font(26),
  },
};

const button = {
  title: text.content.xlarge,
  description: text.label.large,
  corners: fw(4),
};

const input = {
  title: text.label.large,
  text: text.content.small,
};

const image = {
  small: {
    width: fw(24),
    height: fw(24),
  },
  medium: {
    width: fw(42),
    height: fw(42),
  },
  profile: {
    width: fw(60),
    height: fw(60),
  },
};

const icon = {
  tiny: fw(12),
  xsmall: fw(16),
  small: fw(24),
  medium: fw(32),
  large: fw(48),
  xlarge: fw(64),
};

export const dimen = {
  margin,
  text,
  button,
  input,
  icon,
  image,
};

export type Dimen = typeof dimen;
