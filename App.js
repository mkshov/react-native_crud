import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AppNavigation from "./navigation/AppNavigation";
import ProductsContextProvider from "./contexts/ProductsContext";

export default function App() {
  return (
    <ProductsContextProvider>
      <AppNavigation />
    </ProductsContextProvider>
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
