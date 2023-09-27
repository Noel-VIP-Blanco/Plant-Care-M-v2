import { COLORS } from "@root/utilities/shared/Colors";
import { StyleSheet } from "react-native";

export const LoginStyle = StyleSheet.create({
  titleText: {
    fontSize: 80,
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
  safeAreaView: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
  },
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUNDCOLOR,
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    padding: 15,
    borderRadius: 70,
  },
  logoImage: {
    maxHeight: 200,
    maxWidth: 200,
    borderRadius: 100,
  },
  contentContainer: {
    marginTop: -150,
    padding: 7,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginHorizontal: 25,
    backgroundColor: "white",
  },
  textInputOutline: { borderRadius: 30, borderColor: "#3dff3d" },
  textInputStyle: { fontSize: 20, margin: 5 },
  utilitiesContainer: { flexDirection: "row", justifyContent: "space-around" },
  rememberMeText: {
    marginLeft: 10,
    marginRight: 5,
    fontSize: 20,
  },
  rememberMeContainer: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center",
  },
  forgotPasswordContainer: { marginTop: 17, alignItems: "center" },
  forgotPasswordText: {
    fontSize: 20,
    color: "green",
  },
});
