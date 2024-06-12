import { useContext, useEffect } from "react";
import { Button, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CartContext } from "../contexts/CartContext";

export default function Cart() {
  const { cart, getCart, deleteProduct, changeProductCount } = useContext(CartContext);

  useEffect(() => {
    getCart();
  }, []);

  const totalPrice = cart?.products.reduce((sum, item) => sum + item.newPrice, 0);

  return (
    <View style={styles.mainParent}>
      <ScrollView style={styles.cardsParent}>
        {cart &&
          cart.products.map((item) => (
            <View key={item.product.id} style={styles.cardProduct}>
              <View style={styles.cardProductInner}>
                <Image source={{ uri: item.product.img }} style={styles.cardImage} />
                <View style={styles.cardText}>
                  <Text style={styles.cardTitle}>
                    {item.product.title.length > 15 ? item.product.title.slice(0, 15) + "..." : item.product.title}
                  </Text>
                  <Text style={styles.cardPrice}>{item.product.price} сом</Text>
                </View>
                <TouchableOpacity onPress={() => deleteProduct(item.product.id)} style={styles.deleteBtn}>
                  <Text style={styles.deleteText}>Удалить</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.cardProductInner2}>
                <View style={styles.cardQuantyties}>
                  <TouchableOpacity onPress={() => changeProductCount(item.count - 1, item.product.id)} style={styles.cardQuantityBtn}>
                    <Text style={styles.cardAction}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.cardQuantity}>{item.count}</Text>
                  <TouchableOpacity onPress={() => changeProductCount(item.count + 1, item.product.id)} style={styles.cardQuantityBtn}>
                    <Text style={styles.cardAction}>+</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.cardTotalPrice}>Итого: {item.newPrice} сом</Text>
              </View>
            </View>
          ))}
      </ScrollView>
      <View style={styles.end}>
        <Text style={styles.totalPrice}>Общая сумма: {totalPrice} сом</Text>
        <TouchableOpacity style={styles.buy}>
          <Text style={styles.buyText}>Оформить заказ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainParent: {
    justifyContent: "space-between",
    height: "98%",
  },
  cardProduct: {
    backgroundColor: "white",
    padding: 20,
    margin: 10,
    borderRadius: 20,
    gap: 15,
    position: "relative",
  },
  cardProductInner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  cardProductInner2: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardsParent: {
    height: 410,
  },
  cardText: {
    justifyContent: "space-around",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "500",
  },
  cardPrice: {},
  cardImage: {
    width: 100,
    height: 100,
    borderRadius: 20,
  },
  cardQuantyties: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  cardQuantityBtn: {
    backgroundColor: "orange",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
  },
  cardAction: {
    fontSize: 18,
    color: "white",
  },
  cardQuantity: {
    fontSize: 18,
    fontWeight: "500",
  },
  cardTotalPrice: {
    fontSize: 17,
    fontWeight: "600",
  },
  end: {
    alignItems: "center",
    paddingVertical: 20,
    gap: 20,
    marginHorizontal: 10,
  },
  totalPrice: {
    fontSize: 22,
    fontWeight: "700",
  },
  buy: {
    backgroundColor: "orange",
    paddingVertical: 20,
    width: "100%",
    borderRadius: 20,
  },
  buyText: {
    textAlign: "center",
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  deleteBtn: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 20,
    position: "absolute",
    top: -10,
    right: -10,
  },
  deleteText: {
    color: "white",
    fontWeight: "700",
  },
});
