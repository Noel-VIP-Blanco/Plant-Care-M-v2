import { StatusBar } from "expo-status-bar";
import { PaperProvider } from "react-native-paper";
import Index from "@root/app/Index";

export default function App() {
  return (
    <PaperProvider>
      <StatusBar style="auto" />
      <Index />
    </PaperProvider>
  );
}
