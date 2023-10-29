import { StyleSheet } from "react-native";
export const ContainerScreenStyle = StyleSheet.create({
  containerContents: {
    flex: 1,
    height: "100%",
    borderTopLeftRadius: 70,
    borderTopRightRadius: 70,
  },
  FAB: {
    position: "absolute",
    margin: 16,
    right: 10,
    bottom: 10,
  },
  buttonContainer: {
    position: "absolute",
    margin: 16,
    bottom: 0,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    marginHorizontal: 20,
  },
});
