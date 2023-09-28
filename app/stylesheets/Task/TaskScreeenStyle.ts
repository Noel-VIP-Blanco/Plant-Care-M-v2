import { StyleSheet } from "react-native";
export const TaskScreeenStyle = StyleSheet.create({
  contentMainContainer: {
    backgroundColor: "white",
    flex: 1,
    height: "100%",
    borderTopLeftRadius: 70,
    borderTopRightRadius: 70,
  },
  searchBarContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  listOfPlantTubeText: {
    fontSize: 30,
    marginVertical: 5,
    color: "#086308",
    fontWeight: "bold",
    textAlign: "center",
  },
});
