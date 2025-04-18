import { ms } from "./metrics";

const fontFamily = {
  "regular": "Montserrat-Regular",
  "medium": "Montserrat-Medium",
  "semiBold": "Montserrat-SemiBold",
  "bold": "Montserrat-Bold",
}

export type FontVariants = keyof typeof fontVariants;

export const fontVariants = {
  regular: {
    fontFamily: fontFamily.regular,
    fontSize: ms(24),
  },
  medium: {
    fontFamily: fontFamily.medium,
    fontSize: ms(28),
  },
  semiBold: {
    fontFamily: fontFamily.semiBold,
    fontSize: ms(30),
  },
  bold: {
    fontFamily: fontFamily.bold,
    fontSize: ms(34),
  },
}