import { StyleSheet } from "react-native";
export const NotificationItemStyle = StyleSheet.create({
  mainContainer: {
    marginVertical: 3,
    flexDirection: "row",
  },
  profilePicContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  notificationContentContainer: {
    flex: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  notificationTitle: {
    textAlign: "center",
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
  },
  notificationSubtitle: {
    textAlign: "center",
    fontSize: 15,
    color: "white",
  },
  notificationDate: { textAlign: "center", color: "white" },
  touchRipple: { backgroundColor: "#838af8" },
});
