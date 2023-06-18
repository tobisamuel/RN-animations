import { StatusBar } from "expo-status-bar";
import { StyleSheet, Switch, Text, View } from "react-native";
import {
  QueryClient,
  QueryClientProvider,
  focusManager,
} from "@tanstack/react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import Ring from "./src/screens/Ring";
import SwitchScreen from "./src/screens/SwitchScreen";
import Gallery from "./src/screens/Gallery";
import ScrollAnimation from "./src/screens/ScrollAnimation";
import Zara from "./src/screens/Zara";
import DialpadScreen from "./src/screens/Dialpad";
import Scroll from "./src/screens/Scroll";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 2 } },
});

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        {/* <Ring /> */}
        {/* <SwitchScreen /> */}
        {/* <Gallery /> */}
        {/* <ScrollAnimation /> */}
        <Scroll />
        {/* <Zara /> */}
        {/* <DialpadScreen /> */}
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
