import { dp, sp } from "@root/utilities/shared/SpDp";
import { StyleSheet, Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;
export const ContainerCardStyle = StyleSheet.create({
  surface: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: dp(40),
    marginLeft: screenWidth - screenWidth * 0.95,
    marginRight: screenWidth - screenWidth * 0.95,
    height: dp(370),
    borderRadius: dp(70),
  },
  checkboxContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  containerCardBoxContainer1: {
    height: dp(330),
    flex: 1,
  },
  containerCardBoxContainer2: {
    height: dp(330),
    alignItems: "center",
    justifyContent: "space-evenly",
    flex: 9,
  },
  dataSurfaceContainer: {
    margin: dp(7),
    flexDirection: "row",
    justifyContent: "space-around",
  },
  itemTextDetails: {
    margin: dp(16),
    fontSize: sp(45),
  },
  dataSurface: {
    borderRadius: dp(45),
    margin: dp(7),
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});
