import { StyleSheet } from "react-native";
export const SettingScreenStyle = StyleSheet.create({
  accountTextContainer: {
    margin: 15,
  },
  accountText: {
    fontSize: 25,
    color: "#159415",
    fontWeight: "bold",
  },
  myAccountContainer: {
    marginHorizontal: 15,
    backgroundColor: "white",
    borderBottomColor: "black",
    borderRadius: 10,
    elevation: 2,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomColor: "black",
    borderBottomWidth: 2,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  itemTitleText: {
    fontSize: 15,
  },
  accountBox1: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  accountBox1Icon: {
    fontSize: 30,
    marginRight: 5,
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
    fontSize: 30,
    marginRight: 5,
  },
});
