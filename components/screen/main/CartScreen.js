import React, { useState, useEffect } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useCart } from "./CartContext";
import Header from "../index/Header";

const CartScreen = ({ navigation }) => {
  const { cartItems, addItemToCart, removeItemFromCart } = useCart();
  const [quantityMap, setQuantityMap] = useState({});

  useEffect(() => {
    const initialQuantities = cartItems.reduce((acc, item) => {
      acc[`${item.id}-${item.size}`] = item.quantity;
      return acc;
    }, {});
    setQuantityMap(initialQuantities);
  }, [cartItems]);

  const selectedUser = {
    id: "1",
    name: "Hoàng Văn Trường",
    email: "truong@gmail.com",
    password: "12345",
    address: "Phú Thọ",
    avata:
      "https://chiemtaimobile.vn/images/companies/1/%E1%BA%A2nh%20Blog/avatar-facebook-dep/Anh-avatar-hoat-hinh-de-thuong-xinh-xan.jpg?1704788263223",
  };

  const getPriceForSize = (prices, size) => {
    const priceObj = prices.find((price) => price.size === size);
    return priceObj ? priceObj.price : 0;
  };

  const increaseQuantity = (id, size) => {
    setQuantityMap((prevQuantities) => {
      const newQuantity = (prevQuantities[`${id}-${size}`] || 0) + 1;
      addItemToCart(
        cartItems.find((item) => item.id === id && item.size === size),
        1,
        size
      );
      return { ...prevQuantities, [`${id}-${size}`]: newQuantity };
    });
  };

  const decreaseQuantity = (id, size) => {
    setQuantityMap((prevQuantities) => {
      const newQuantity = (prevQuantities[`${id}-${size}`] || 0) - 1;
      if (newQuantity > 0) {
        addItemToCart(
          cartItems.find((item) => item.id === id && item.size === size),
          -1,
          size
        );
        return { ...prevQuantities, [`${id}-${size}`]: newQuantity };
      } else {
        removeItemFromCart(id, size);
        const { [`${id}-${size}`]: _, ...rest } = prevQuantities;
        return rest;
      }
    });
  };

  const handleQuantityChange = (id, size, text) => {
    const value = parseInt(text, 10);
    if (!isNaN(value) && value >= 0) {
      const diff = value - (quantityMap[`${id}-${size}`] || 0);
      if (diff > 0) {
        addItemToCart(
          cartItems.find((item) => item.id === id && item.size === size),
          diff,
          size
        );
      } else if (diff < 0) {
        removeItemFromCart(id, size);
      }
      setQuantityMap((prevQuantities) => ({
        ...prevQuantities,
        [`${id}-${size}`]: value,
      }));
    }
  };

  const totalAmount = cartItems.reduce(
    (acc, item) =>
      acc + getPriceForSize(item.prices, item.size) * item.quantity,
    0
  );

  const handleItemPress = (item) => {
    navigation.navigate("Detail", {
      item,
      size: item.size,
      price: getPriceForSize(item.prices, item.size),
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Header title="Cart" user={selectedUser} />
        <FlatList
          data={cartItems}
          keyExtractor={(item) => `${item.id}-${item.size}`}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleItemPress(item)}>
              <View style={styles.item}>
                <Image
                  style={styles.image}
                  resizeMode="cover"
                  source={{ uri: item.imagelink_square }}
                />
                <View style={{ marginLeft: 10 }}>
                  <Text style={styles.textName}>{item.name}</Text>
                  <Text style={styles.textName1}>
                    {item.special_ingredient}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <TouchableOpacity style={styles.btnSize}>
                      <Text style={styles.textName2}>{item.size}</Text>
                    </TouchableOpacity>
                    <Text style={[styles.textName2, { marginTop: 6 }]}>
                      <Text style={{ color: "#D17842", fontWeight: "bold" }}>
                        ${" "}
                      </Text>
                      {getPriceForSize(item.prices, item.size)}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "flex-end",
                    }}
                  >
                    <TouchableOpacity
                      style={styles.btnCongTru}
                      onPress={() => decreaseQuantity(item.id, item.size)}
                    >
                      <Image
                        style={{ width: 10 }}
                        source={require("../../../assets/imagesASM/tru.png")}
                      />
                    </TouchableOpacity>
                    <TextInput
                      style={styles.textSL}
                      value={(
                        quantityMap[`${item.id}-${item.size}`] || 0
                      ).toString()}
                      onChangeText={(text) =>
                        handleQuantityChange(item.id, item.size, text)
                      }
                      keyboardType="numeric"
                    />
                    <TouchableOpacity
                      style={styles.btnCongTru}
                      onPress={() => increaseQuantity(item.id, item.size)}
                    >
                      <Image
                        style={{ width: 10, height: 10 }}
                        source={require("../../../assets/imagesASM/add.png")}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 20,
          paddingVertical: 13,
        }}
      >
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={styles.textName1}>Total Price</Text>
          <Text style={styles.textName3}>
            <Text style={{ color: "#D17842", fontWeight: "bold" }}>$ </Text>
            {totalAmount.toFixed(2)}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.btnAdd}
          onPress={() => navigation.navigate("Payment")}
        >
          <Text style={styles.textName2}>Pay</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0C0F14",
  },
  item: {
    flexDirection: "row",
    backgroundColor: "#21262E",
    borderRadius: 28,
    padding: 15,
    marginHorizontal: 15,
    marginTop: 10,
  },
  image: {
    width: "37%",
    height: "100%",
    borderRadius: 18,
  },
  btnCongTru: {
    backgroundColor: "#D17842",
    marginTop: 10,
    width: 30,
    height: 30,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  btnSize: {
    backgroundColor: "#0C0F14",
    marginTop: 10,
    width: "45%",
    height: 35,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  btnAdd: {
    backgroundColor: "#D17842",
    width: "60%",
    height: 55,
    borderRadius: 13,
    justifyContent: "center",
    alignItems: "center",
  },
  textSL: {
    backgroundColor: "#0C0F14",
    color: "white",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#D17842",
    textAlignVertical: "center",
    paddingHorizontal: 25,
    marginHorizontal: 10,
    height: 30,
    marginTop: 10,
    textAlign: "center",
  },
  textName: {
    color: "white",
    fontSize: 20,
  },
  textName1: {
    color: "white",
    fontSize: 10,
    fontWeight: "200",
  },
  textName2: {
    color: "white",
    fontSize: 20,
  },
  textName3: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },
});
