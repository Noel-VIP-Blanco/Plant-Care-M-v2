import { StyleSheet } from "react-native";

export const ChangePasswordAccountStyle = StyleSheet.create({
  backButtonContainer: {
    marginTop: 30,
    marginLeft: 10,
    width: 80,
    borderRadius: 30,
  },
  lowerContainer: {
    backgroundColor: "white",
    flex: 1,
    marginTop: 100,
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
  },
  outerLogoContainer: {
    marginTop: -70,
    alignItems: "center",
  },
  innerLogoContainer: {
    padding: 15,
    borderRadius: 70,
  },
  image: { height: 120, width: 120, borderRadius: 60 },
  outerTitleContainer: {
    justifyContent: "center",
    alignContent: "center",
    marginHorizontal: 15,
  },
  innerTitleContainer: { marginTop: 20, marginLeft: 20, marginBottom: 20 },
  resetPasswordText: { fontSize: 50, fontWeight: "bold", color: "#36d436" },
  textInputOutline: { borderRadius: 30, borderColor: "#3dff3d" },
});
