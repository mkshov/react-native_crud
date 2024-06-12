import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { CartContext } from "../contexts/CartContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProductCard({ oneProduct }) {
  const { addProductToCart, checkProductInCart } = useContext(CartContext);
  const [isInCart, setIsInCart] = useState(false);
  const navigation = useNavigation();

  // Инициализация состояния
  useEffect(() => {
    (async () => {
      // Асинхронная анонимная функция для проверки, находится ли продукт в корзине.
      const inCart = await checkProductInCart(oneProduct);
      // Обновление состояния isInCart на основе результата проверки.
      setIsInCart(inCart);
    })();
  }, [oneProduct, checkProductInCart]);

  async function handleAddToCart() {
    // Асинхронное добавление продукта в корзину.
    await addProductToCart(oneProduct);
    // Повторная проверка, находится ли продукт в корзине, после его добавления.
    const inCart = await checkProductInCart(oneProduct);
    // Обновление состояния isInCart на основе результата проверки.
    setIsInCart(inCart);
  }

  return (
    <TouchableOpacity
      style={{ backgroundColor: "white", padding: 30, borderRadius: 20 }}
      onPress={() => navigation.navigate("details", { id: oneProduct.id })}
    >
      <View>
        <Image style={{ width: 300, height: 200, borderRadius: 20 }} source={{ uri: oneProduct.img }} alt="product card" />
        <View style={{ flexDirection: "row", gap: 20, justifyContent: "center", marginTop: 20 }}>
          <Text>{oneProduct.price} сом</Text>
          <Text>{oneProduct.title}</Text>
        </View>
        <View style={{ alignItems: "center", marginTop: 10 }}>
          <TouchableOpacity
            onPress={handleAddToCart}
            style={{ backgroundColor: "orange", paddingHorizontal: 30, paddingVertical: 10, borderRadius: 20 }}
          >
            <Text style={{ color: "white", fontSize: 22, fontWeight: "bold" }}>{isInCart ? "-" : "+"}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}
