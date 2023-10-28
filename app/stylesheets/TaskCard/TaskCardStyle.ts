import { dp, sp } from "@root/utilities/shared/SpDp";
import { StyleSheet, Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;
export const TaskCardStyle = StyleSheet.create({
  surface: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: dp(50),
    marginLeft: screenWidth - screenWidth * 0.97,
    marginRight: screenWidth - screenWidth * 0.97,
    height: dp(220),
    borderRadius: dp(60),
  },
  taskCardMainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: dp(200),
  },
  taskCardView: {
    flexDirection: "row",
  },
  // doneTaskIcon: {
  //   fontSize: sp(50),
  // },
  checkboxContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  taskCardBoxContainer2: {
    height: dp(180),
    alignItems: "center",
    justifyContent: "space-evenly",
    flex: 9,
  },
  taskCardBoxContainer1: {
    height: dp(180),
    flex: 1,
  },
  itemTextTitle: {
    fontSize: sp(70),
    fontWeight: "bold",
  },
  itemTextDetailsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  itemTextDetails: {
    margin: dp(16),
    fontSize: sp(39),
  },
  dataSurface: {
    borderRadius: dp(50),
    margin: dp(15),
    justifyContent: "center",
    alignItems: "center",
  },
});
