import React from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { useCart } from "./CartContext";
import Header from "../index/Header";

const HistoryScreen = () => {
  const { orderHistory } = useCart();

  const getPriceForSize = (prices, size) => {
    const priceObj = prices.find((price) => price.size === size);
    return priceObj ? priceObj.price : 0;
  };

  // Group orders by date
  const groupedOrders = orderHistory.reduce((acc, order) => {
    const date = order.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(order);
    return acc;
  }, {});

  // Convert grouped orders to an array
  const uniqueDateOrders = Object.keys(groupedOrders).map((date) => ({
    date,
    orders: groupedOrders[date],
  }));

  const selectedUser = {
    id: "1",
    name: "Hoàng Văn Trường",
    email: "truong@gmail.com",
    password: "12345",
    address: "Phú Thọ",
    avata:
      "https://chiemtaimobile.vn/images/companies/1/%E1%BA%A2nh%20Blog/avatar-facebook-dep/Anh-avatar-hoat-hinh-de-thuong-xinh-xan.jpg?1704788263223",
  };

  return (
    <View style={styles.container}>
      <Header title="Order History" user={selectedUser} />
      <FlatList
        data={uniqueDateOrders}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ flex: 1, paddingHorizontal: 20, marginTop: 20 }}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View>
                <Text style={styles.text1}>Order Date</Text>
                <Text style={styles.text2}>{item.date}</Text>
              </View>
              <View>
                <Text style={styles.text1}>Total Amount</Text>
                <Text style={[styles.text_price, { alignSelf: "flex-end" }]}>
                  <Text style={styles.text_price}>$ </Text>
                  {item.orders
                    .reduce((acc, order) => acc + order.totalAmount, 0)
                    .toFixed(2)}
                </Text>
              </View>
            </View>
            {item.orders.map((order, orderIdx) => (
              <View key={orderIdx}>
                {/* Group items by product name */}
                {Object.values(
                  order.items.reduce((acc, product) => {
                    if (!acc[product.name]) {
                      acc[product.name] = {
                        ...product,
                        sizes: [],
                      };
                    }
                    acc[product.name].sizes.push({
                      size: product.size,
                      quantity: product.quantity,
                      price: getPriceForSize(product.prices, product.size),
                    });
                    return acc;
                  }, {})
                ).map((product, productIdx) => (
                  <View key={productIdx} style={styles.view_pro}>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Image
                        style={styles.image_pro}
                        source={{ uri: product.imagelink_square }}
                      />
                      <View>
                        <Text style={styles.text}>{product.name}</Text>
                        <Text style={styles.text3}>
                          {product.special_ingredient}
                        </Text>
                      </View>

                      {/* Tổng giá */}
                      {/* <Text
                        style={[
                          styles.text,
                          { marginLeft: 10, position: "absolute", right: 0 },
                        ]}
                      >
                        <Text style={{ color: "#D17842" }}>$ </Text>
                        {product.sizes
                          .reduce(
                            (acc, sizeInfo) =>
                              acc + sizeInfo.price * sizeInfo.quantity,
                            0
                          )
                          .toFixed(2)}
                      </Text> */}
                    </View>
                    {product.sizes.map((sizeInfo, idx) => (
                      <View
                        key={idx}
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginTop: 10,
                        }}
                      >
                        <View style={styles.view_size}>
                          <Text style={styles.text1}>{sizeInfo.size}</Text>
                          <View
                            style={{
                              backgroundColor: "gray",
                              width: 0.7,
                              marginHorizontal: 20,
                              position: "absolute",
                              top: 2,
                              bottom: 2,
                              left: 30,
                            }}
                          />
                          <Text style={styles.text1}>
                            <Text style={{ color: "#D17842" }}>$ </Text>
                            {sizeInfo.price}
                          </Text>
                        </View>
                        <Text
                          style={[
                            styles.text1,
                            { marginLeft: 50, marginTop: 5 },
                          ]}
                        >
                          <Text style={{ color: "#D17842" }}>x</Text>
                          {sizeInfo.quantity}
                        </Text>
                        <Text
                          style={[
                            styles.text1,
                            {
                              marginLeft: 40,
                              marginTop: 5,
                              color: "#D17842",
                              position: "absolute",
                              right: 10,
                            },
                          ]}
                        >
                          {(sizeInfo.price * sizeInfo.quantity).toFixed(2)}
                        </Text>
                      </View>
                    ))}
                    {/* tổng giá */}
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        marginTop: 10,
                      }}
                    >
                      <Text style={styles.text1}>Total: </Text>
                      <Text style={[styles.text1, { marginLeft: 10 }]}>
                        <Text style={{ color: "#D17842" }}>$ </Text>
                        {product.sizes
                          .reduce(
                            (acc, sizeInfo) =>
                              acc + sizeInfo.price * sizeInfo.quantity,
                            0
                          )
                          .toFixed(2)}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            ))}
          </View>
        )}
      />
    </View>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0C0F14",
  },
  view_pro: {
    backgroundColor: "#21262E",
    padding: 15,
    borderRadius: 20,
    marginTop: 10,
  },
  view_size: {
    width: "45%",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#0C0F14",
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  text: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 20,
  },
  text1: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  text2: {
    color: "white",
    fontSize: 16,
    fontWeight: "200",
    lineHeight: 25,
  },
  text3: {
    color: "white",
    fontSize: 10,
    fontWeight: "200",
    lineHeight: 15,
    marginLeft: 20,
  },
  text_price: {
    color: "#D17842",
    fontSize: 16,
    fontWeight: "bold",
    lineHeight: 25,
  },
  text_price1: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    flex: 1,
    textAlign: "right",
  },
  image_pro: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
});
