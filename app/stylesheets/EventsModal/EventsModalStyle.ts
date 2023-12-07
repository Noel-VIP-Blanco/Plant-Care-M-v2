import { sp } from "@root/utilities/shared/SpDp";
import { Dimensions, StyleSheet } from "react-native";
export const EventsModalStyle = StyleSheet.create({
  renderEventContainer: {
    borderRadius: 15,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  renderEventText: {
    fontSize: sp(50),
    fontWeight: "bold",
    textAlign: "center",
    color: "black",
  },
  renderEmptyEventContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modal: { alignItems: "center" },
  modalInnerContainer: {
    backgroundColor: "white",
    padding: 20,
    margin: 30,
    width: Dimensions.get("screen").width * 0.9,
    height: Dimensions.get("screen").height * 0.9,
    borderRadius: 30,
  },
  harvestDateText: {
    fontSize: 28,
    color: "#00ad00",
    textAlign: "center",
  },
});
