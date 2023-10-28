// import { COLORS } from "@root/utilities/shared/Colors";
// import { StyleSheet } from "react-native";
// import { moderateScale, scale } from "react-native-size-matters";
// export const LoginStyle = StyleSheet.create({
//   titleText: {
//     fontSize: moderateScale(45),
//     fontWeight: "bold",
//     color: "#36d436",
//     textAlign: "center",
//   },
//   titleSubText: {
//     textAlign: "center",
//     fontSize: moderateScale(20),
//     fontWeight: "bold",
//     marginBottom: scale(20),
//   },
//   logInButton: {
//     backgroundColor: "#60b147",
//     marginTop: scale(10),
//     marginBottom: scale(-15),
//   },
//   safeAreaView: {
//     flex: 1,
//     justifyContent: "center",
//     backgroundColor: "white",
//   },
//   mainContainer: {
//     flex: 1,
//     backgroundColor: COLORS.BACKGROUNDCOLOR,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   logoContainer: {
//     padding: scale(10),
//     borderRadius: 70,
//   },
//   logoImage: {
//     maxHeight: 200,
//     maxWidth: 200,
//     borderRadius: 100,
//   },
//   contentContainer: {
//     marginTop: -150,
//     padding: 7,
//     borderRadius: 20,
//     paddingHorizontal: 10,
//     marginHorizontal: 25,
//     backgroundColor: "white",
//   },
//   textInputOutline: { borderRadius: scale(25), borderColor: "#3dff3d" },
//   textInputStyle: { fontSize: moderateScale(15), margin: scale(5) },
//   utilitiesContainer: { flexDirection: "row", justifyContent: "space-around" },
//   rememberMeText: {
//     marginLeft: 10,
//     marginRight: 5,
//     fontSize: moderateScale(15),
//   },
//   rememberMeContainer: {
//     flexDirection: "row",
//     marginTop: 10,
//     alignItems: "center",
//   },
//   forgotPasswordContainer: { marginTop: 17, alignItems: "center" },
//   forgotPasswordText: {
//     fontSize: moderateScale(15),
//     color: "green",
//   },
// });
import { COLORS } from "@root/utilities/shared/Colors";
import { StyleSheet } from "react-native";
import { dp, sp } from "@root/utilities/shared/SpDp";
export const LoginStyle = StyleSheet.create({
  titleText: {
    fontSize: sp(150),
    fontWeight: "bold",
    color: "#36d436",
    textAlign: "center",
  },
  titleSubText: {
    textAlign: "center",
    fontSize: sp(70),
    fontWeight: "bold",
    marginBottom: dp(40),
  },
  logInButton: {
    backgroundColor: "#60b147",
    marginTop: dp(40),
    marginBottom: dp(-50),
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
    padding: dp(30),
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
  textInputOutline: { borderRadius: dp(40), borderColor: "#3dff3d" },
  textInputStyle: { fontSize: sp(50), margin: dp(15) },
  utilitiesContainer: { flexDirection: "row", justifyContent: "space-around" },
  rememberMeText: {
    marginLeft: 10,
    marginRight: 5,
    fontSize: sp(50),
  },
  rememberMeContainer: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center",
  },
  forgotPasswordContainer: { marginTop: 17, alignItems: "center" },
  forgotPasswordText: {
    fontSize: sp(45),
    color: "green",
  },
});
