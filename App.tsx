import { StatusBar } from "expo-status-bar";
import { PaperProvider } from "react-native-paper";
import Index from "@root/app/Index";
import { ChangePasswordAccountScreen } from "@screens/index";

export default function App() {
  return (
    <PaperProvider>
      <StatusBar style="auto" />
      {/* <Index /> */}
      <ChangePasswordAccountScreen />
    </PaperProvider>
  );
}
