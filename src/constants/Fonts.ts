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
  },
  regular: {
    fontFamily: fontFamily.regular,
    fontSize: ms(20),
  },
  medium: {
    fontFamily: fontFamily.medium,
    fontSize: ms(24),
  },
  semiBold: {
    fontFamily: fontFamily.semiBold,
    fontSize: ms(28),
  },
  bold: {
    fontFamily: fontFamily.bold,
    fontSize: ms(30),
  },
}