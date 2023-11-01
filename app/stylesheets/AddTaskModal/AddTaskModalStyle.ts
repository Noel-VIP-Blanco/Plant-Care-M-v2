import { dp, sp } from "@root/utilities/shared/SpDp";
import { StyleSheet } from "react-native";
export const AddTaskModalStyle = StyleSheet.create({
  mainContainer: {
    padding: dp(50),
    margin: dp(70),
    borderRadius: dp(70),
  },
  textTitle: { fontSize: sp(80), textAlign: "center" },
  selectListContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
  },
  dateButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: dp(8),
  },
});
