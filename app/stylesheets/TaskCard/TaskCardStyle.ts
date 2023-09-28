import { StyleSheet, Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;
export const TaskCardStyle = StyleSheet.create({
  surface: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginLeft: screenWidth - screenWidth * 0.95,
    marginRight: screenWidth - screenWidth * 0.95,
    height: 90,
    borderRadius: 20,
  },
  taskCardMainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 100,
  },
  taskCardView: {
    flexDirection: "row",
  },
  doneTaskIcon: {
    fontSize: 30,
  },
  checkboxContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  taskCardBoxContainer2: {
    height: 80,
    alignItems: "center",
    justifyContent: "space-evenly",
    flex: 9,
  },
  taskCardBoxContainer1: {
    height: 80,
    flex: 1,
  },
  itemTextTitle: {
    fontSize: 25,
    fontWeight: "bold",
  },
  itemTextDetailsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
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
  },
});
