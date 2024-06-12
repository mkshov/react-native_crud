import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Button } from "react-native";

export default function GoToCartBtn() {
  const navigation = useNavigation();

  return <Button title="cart" color={"orange"} onPress={() => navigation.navigate("cart")} />;
}
