import { StyleSheet } from "react-native";
export const HomeScreenItemStyle = StyleSheet.create({
  HomeScreenItemContainer: {
    marginTop: 20,
    justifyContent: "space-evenly",
    flexDirection: "row",
    flex: 1,
    flexWrap: "wrap",
  },
  linerGradient: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
    flexDirection: "row",
  },
  leftContainer: {
    //backgroundColor: "red",
    flex: 1,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  rightContainer: {
    //backgroundColor: "blue",
    flex: 1,
    marginRight: 4,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  surface: {
    margin: 5,
    width: 200,
    height: 150,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  screenItemTitle: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 15,
    fontWeight: "bold",
  },

  mapButton: {},
});
