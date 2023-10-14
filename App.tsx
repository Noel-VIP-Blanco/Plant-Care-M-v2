import { StatusBar } from "expo-status-bar";
import { PaperProvider } from "react-native-paper";

import { Provider } from "react-redux";
import Index from "@root/app/Index";
import { store } from "@backend/RTKQuery/store";
//import { store } from "@reduxToolkit/Store";
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
