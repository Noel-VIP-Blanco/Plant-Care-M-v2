import { dp, sp } from "@root/utilities/shared/SpDp";
import { StyleSheet } from "react-native";
export const HomeScreenItemStyle = StyleSheet.create({
  HomeScreenItemContainer: {
    marginTop: dp(50),
    justifyContent: "space-evenly",
    flexDirection: "row",
    flex: 1,
    flexWrap: "wrap",
  },
  linerGradient: {
    width: "100%",
    height: "100%",
    borderRadius: dp(50),
    flexDirection: "row",
  },
  leftContainer: {
    //backgroundColor: "red",
    flex: 1,
    borderTopLeftRadius: dp(50),
    borderBottomLeftRadius: dp(50),
    alignItems: "center",
    justifyContent: "center",
  },
  rightContainer: {
    //backgroundColor: "blue",
    flex: 1,
    marginRight: 4,
    borderBottomRightRadius: dp(50),
    borderTopRightRadius: dp(50),
    alignItems: "center",
    justifyContent: "center",
  },
  surface: {
    margin: 5,
    width: dp(500),
    height: dp(400),
    borderRadius: dp(50),
    alignItems: "center",
    justifyContent: "center",
  },
  screenItemTitle: {
    fontSize: sp(42),
    textAlign: "center",
    marginBottom: dp(30),
    fontWeight: "bold",
  },
  button: {
    height: dp(105),
    justifyContent: "center",
  },
});
