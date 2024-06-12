import { useContext, useEffect, useState } from "react";
import { RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { productsContext } from "../contexts/ProductsContext";
import ProductCard from "../components/ProductCard";

export default function HomePage({ navigation }) {
  const { products, getProducts } = useContext(productsContext);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getProducts();
  }, []);

  function onRefresh() {
    setRefreshing(true);
    getProducts();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }

  return (
    <SafeAreaView>
      <View style={styles.addBtnContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("add-form")} style={styles.goToAddFormBtn}>
          <Text style={styles.goToAddFormBtn.text}>Добавить продукт</Text>
        </TouchableOpacity>

        <ScrollView
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          showsVerticalScrollIndicator={false}
          contentInset={{ bottom: 200 }}
          contentContainerStyle={styles.cardParent}
        >
          {products.map((item) => (
            <ProductCard key={item.id} oneProduct={item} />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  goToAddFormBtn: {
    backgroundColor: "orange",
    paddingHorizontal: 35,
    paddingVertical: 15,
    maxWidth: 300,
    borderRadius: 20,
    text: {
      color: "white",
      fontSize: 20,
      fontWeight: "bold",
      textAlign: "center",
    },
  },
  addBtnContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  cardParent: {
    gap: 20,
    marginTop: 50,
  },
});
