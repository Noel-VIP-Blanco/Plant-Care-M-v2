import { StyleSheet } from "react-native";
export const ShowProfileStyle = StyleSheet.create({
  backArrowContiner: {
    marginTop: 30,
    marginLeft: 10,
    width: 80,
    borderRadius: 30,
    flex: 1,
  },
  profileDetailsContainer: {
    flex: 9,
    backgroundColor: "white",
    marginTop: 30,
    borderTopLeftRadius: 100,
    borderBottomRightRadius: 100,
  },
  userImageContainer: {
    padding: 15,
    borderRadius: 70,
  },
  lowerButtonMainContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: 450,
  },
});