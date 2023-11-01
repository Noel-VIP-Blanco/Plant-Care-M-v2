import { StatusBar } from "expo-status-bar";
import { PaperProvider } from "react-native-paper";
import { store } from "@reduxToolkit/Store";
import { Provider } from "react-redux";
import Index from "@root/app/Index";
import { useColorScheme } from "nativewind";
export default function App() {
  const { colorScheme } = useColorScheme();
  return (
    <Provider store={store}>
      <PaperProvider>
        <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
        <Index />
      </PaperProvider>
    </Provider>
  );
}
