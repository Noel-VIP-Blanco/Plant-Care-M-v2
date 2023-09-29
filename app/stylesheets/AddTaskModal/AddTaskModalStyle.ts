import { StyleSheet } from "react-native";
export const AddTaskModalStyle = StyleSheet.create({
  mainContainer: {
    backgroundColor: "white",
    padding: 20,
    margin: 30,
    borderRadius: 30,
  },
  textTitle: { fontSize: 30, color: "#00ad00", textAlign: "center" },
  selectListContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
  },
  dateButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
});
