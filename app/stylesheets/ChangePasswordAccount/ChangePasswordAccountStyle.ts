import { dp, sp } from "@root/utilities/shared/SpDp";
import { StyleSheet } from "react-native";

export const ChangePasswordAccountStyle = StyleSheet.create({
  backButtonContainer: {
    marginTop: dp(50),
    marginLeft: dp(25),
    width: dp(120),
    borderRadius: dp(50),
  },
  lowerContainer: {
    backgroundColor: "white",
    flex: 1,
    marginTop: dp(150),
    borderTopLeftRadius: dp(140),
    borderTopRightRadius: dp(140),
  },
  outerLogoContainer: {
    marginTop: dp(-100),
    alignItems: "center",
  },
  innerLogoContainer: {
    padding: dp(25),
    borderRadius: dp(100),
  },
  image: { height: dp(300), width: dp(300), borderRadius: dp(100) },
  outerTitleContainer: {
    justifyContent: "center",
    alignContent: "center",
    marginHorizontal: dp(15),
  },
  innerTitleContainer: {
    marginTop: dp(50),
    marginLeft: dp(50),
    marginBottom: dp(50),
  },
  resetPasswordText: {
    fontSize: sp(100),
    fontWeight: "bold",
    color: "#36d436",
  },
  textInputOutline: { borderRadius: dp(50), borderColor: "#3dff3d" },
});
