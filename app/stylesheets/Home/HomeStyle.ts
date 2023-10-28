import { dp } from "@root/utilities/shared/SpDp";
import { StyleSheet } from "react-native";

export const HomeStyle = StyleSheet.create({
  pageContainer: {
    flex: 1,
    height: "100%",
  },
  linearGradient: { flex: 1, height: "100%" },
  notificationBellContainer: {
    marginTop: "10%",
    alignItems: "flex-end",
  },
  bottomMainContainer: {
    backgroundColor: "#fff",
    flex: 1,
    marginTop: dp(200),
    height: "100%",
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
    alignItems: "center",
  },
});
