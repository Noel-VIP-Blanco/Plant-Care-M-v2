import { StatusBar } from "expo-status-bar";
import { PaperProvider } from "react-native-paper";
import { store } from "@reduxToolkit/Store";
import { Provider } from "react-redux";
import Index from "@root/app/Index";

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <StatusBar style="auto" />
        <Index />
      </PaperProvider>
    </Provider>
  );
}
