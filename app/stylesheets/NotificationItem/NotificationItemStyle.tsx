import { sp } from "@root/utilities/shared/SpDp";
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
    fontSize: sp(55),
    fontWeight: "bold",
  },
  notificationSubtitle: {
    textAlign: "center",
    fontSize: sp(40),
    color: "white",
  },
  notificationDate: { textAlign: "center", color: "white" },
  touchRipple: { backgroundColor: "#838af8" },
});
