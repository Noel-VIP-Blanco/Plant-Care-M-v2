import { StatusBar } from "expo-status-bar";
import { PaperProvider } from "react-native-paper";
import { store } from "@reduxToolkit/Store";
import { Provider } from "react-redux";
import Index from "@root/app/Index";
import { useColorScheme } from "nativewind";
import registerNNPushToken from "native-notify";
export default function App() {
  const { colorScheme } = useColorScheme();
  registerNNPushToken(13240, "JgacDlBDrMg8qvQWalJuRM");
  // registerNNPushToken(16867, "PWEmCyU340w68O32FbbIK6");
  return (
    <Provider store={store}>
      <PaperProvider>
        <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
        <Index />
      </PaperProvider>
    </Provider>
  );
}
