import { ms } from "./metrics";

export const fontFamily = {
  light: "Montserrat-Light",
  regular: "Montserrat-Regular",
  medium: "Montserrat-Medium",
  semiBold: "Montserrat-SemiBold",
  bold: "Montserrat-Bold",
}

export type FontVariants = keyof typeof fontVariants;

export const fontVariants = {
  light: {
    fontFamily: fontFamily.light,
    fontSize: ms(16),
    lineHeight: ms(16 * 1.25),
  },
  regular: {
    fontFamily: fontFamily.regular,
    fontSize: ms(20),
    lineHeight: ms(20 * 1.25),
  },
  medium: {
    fontFamily: fontFamily.medium,
    fontSize: ms(22),
    lineHeight: ms(28 * 1.27),
  },
  semiBold: {
    fontFamily: fontFamily.semiBold,
    fontSize: ms(26),
    lineHeight: ms(32 * 1.23),
  },
  bold: {
    fontFamily: fontFamily.bold,
    fontSize: ms(28),
    lineHeight: ms(36 * 1.28),
  },
};