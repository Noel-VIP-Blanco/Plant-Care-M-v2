import { StyleSheet, PixelRatio } from "react-native";

const scale = PixelRatio.get();
export const LoginStyle = StyleSheet.create({
  titleText: {
    fontSize: Math.round(PixelRatio.roundToNearestPixel(33 * scale)),
    fontWeight: "bold",
    color: "#36d436",
    textAlign: "center",
  },
  titleSubText: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 30,
  },

  logInButton: {
    backgroundColor: "#60b147",
    marginTop: 15,
    marginBottom: -25,
  },
});
