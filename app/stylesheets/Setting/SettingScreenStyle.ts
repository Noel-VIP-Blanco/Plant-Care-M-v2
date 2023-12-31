import { dp, sp } from "@root/utilities/shared/SpDp";
import { StyleSheet } from "react-native";
export const SettingScreenStyle = StyleSheet.create({
  accountTextContainer: {
    margin: dp(50),
  },
  accountText: {
    fontSize: sp(60),
    fontWeight: "bold",
  },
  myAccountContainer: {
    marginHorizontal: dp(35),
    borderBottomColor: "black",
    borderRadius: dp(20),
    elevation: 2,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: dp(30),
    borderBottomColor: "black",
    borderBottomWidth: 2,
    borderBottomLeftRadius: dp(30),
    borderBottomRightRadius: dp(30),
  },
  itemTitleText: {
    fontSize: sp(40),
  },
  accountBox1: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  accountBox1Icon: {
    fontSize: sp(70),
    marginRight: dp(15),
  },
  accountBox2: {
    alignItems: "flex-end",
    flex: 1,
  },
  acountBox2Items: {
    flexDirection: "row",
    alignItems: "center",
  },
  accountBox2Icon: {
    fontSize: sp(70),
    marginRight: 5,
  },
});
