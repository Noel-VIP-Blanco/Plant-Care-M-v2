import { PixelRatio } from "react-native";
export const dp = (px: number) => {
  return px / PixelRatio.get();
};
export const sp = (px: number) => {
  return px / (PixelRatio.getFontScale() * PixelRatio.get());
};
