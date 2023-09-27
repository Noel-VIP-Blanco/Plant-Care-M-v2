import { StyleSheet } from "react-native";
export const OneNotificationModalStyle = StyleSheet.create({
  modalMainContainer: {
    backgroundColor: "white",
    padding: 20,
    margin: 30,
    borderRadius: 30,
  },
  notificationText: {
    fontSize: 40,
    color: "#00ad00",
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 20,
  },
  contentContainer: { marginBottom: 10 },
  title: { fontSize: 30, fontWeight: "bold", textAlign: "center" },
  subTitle: { fontSize: 20, textAlign: "center" },
  date: { fontSize: 18, textAlign: "center" },
});
