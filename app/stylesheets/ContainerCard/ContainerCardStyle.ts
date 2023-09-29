import { StyleSheet, Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;
export const ContainerCardStyle = StyleSheet.create({
  surface: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginLeft: screenWidth - screenWidth * 0.95,
    marginRight: screenWidth - screenWidth * 0.95,
    height: 150,
    borderRadius: 20,
  },
  checkboxContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  containerCardBoxContainer1: {
    height: 150,
    flex: 1,
  },
  containerCardBoxContainer2: {
    height: 150,
    alignItems: "center",
    justifyContent: "space-evenly",
    flex: 9,
  },
  dataSurfaceContainer: {
    margin: 3,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  itemTextDetails: {
    margin: 7,

    fontSize: 20,
  },
  dataSurface: {
    borderRadius: 15,
    margin: 3,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});
