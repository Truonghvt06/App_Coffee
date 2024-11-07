import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useCart } from "./CartContext";

const PaymentScreen = (props) => {
  const { cartItems, addOrderToHistory, clearCart } = useCart();
  const [selectedMethod, setSelectedMethod] = useState(null);
  const { navigation } = props;

  useEffect(() => {
    setSelectedMethod("credit");
  }, []);

  const handleSelectMethod = (method) => {
    setSelectedMethod(method);
  };

  const getPriceForSize = (prices, size) => {
    const priceObj = prices.find((price) => price.size === size);
    return priceObj ? priceObj.price : 0;
  };

  const totalAmount = cartItems.reduce(
    (acc, item) =>
      acc + getPriceForSize(item.prices, item.size) * item.quantity,
    0
  );

  const handlePaymentSuccess = () => {
    const order = {
      date: new Date().toLocaleDateString(),
      totalAmount,
      items: cartItems,
    };

    addOrderToHistory(order);
    clearCart();

    Alert.alert("Thanh toán thành công", "Bạn đã thanh toán thành công!", [
      {
        text: "OK",
        onPress: () => navigation.navigate("BottomTab"),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={styles.btnBack}
          onPress={() => navigation.goBack()}
        >
          <Image source={require("../../../assets/imagesASM/back.png")} />
        </TouchableOpacity>
        <Text style={styles.textName}>Payment</Text>
      </View>
      <TouchableOpacity
        onPress={() => handleSelectMethod("credit")}
        style={[
          styles.viewCredit,
          {
            borderColor: selectedMethod === "credit" ? "#D17842" : "#0C0F14",
          },
        ]}
      >
        <Text style={styles.textName1}>Credit Card</Text>
        <View style={styles.viewCredit1}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Image source={require("../../../assets/imagesASM/maCR.png")} />
            <Image source={require("../../../assets/imagesASM/visa.png")} />
          </View>
          <Text style={styles.textVisa}>3897 8923 6745 4638</Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.textName3}>Card Holder Name</Text>
            <Text style={styles.textName3}>Expiry Date</Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.textName2}>Robert Evans</Text>
            <Text style={styles.textName2}>02/30</Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleSelectMethod("wallet")}
        style={[
          styles.viewCredit2,
          {
            borderColor: selectedMethod === "wallet" ? "#D17842" : "#0C0F14",
          },
        ]}
      >
        <Image source={require("../../../assets/imagesASM/wallet.png")} />
        <Text style={[styles.textName1, { flex: 1, marginLeft: 15 }]}>
          Wallet
        </Text>
        <Text style={styles.textName1}>$ 100.50</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleSelectMethod("googlePay")}
        style={[
          styles.viewCredit2,
          {
            borderColor: selectedMethod === "googlePay" ? "#D17842" : "#0C0F14",
          },
        ]}
      >
        <Image source={require("../../../assets/imagesASM/ggPay.png")} />
        <Text style={[styles.textName1, { flex: 1, marginLeft: 15 }]}>
          Google Pay
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleSelectMethod("applePay")}
        style={[
          styles.viewCredit2,
          {
            borderColor: selectedMethod === "applePay" ? "#D17842" : "#0C0F14",
          },
        ]}
      >
        <Image source={require("../../../assets/imagesASM/apple.png")} />
        <Text style={[styles.textName1, { flex: 1, marginLeft: 15 }]}>
          Apple Pay
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleSelectMethod("amazonPay")}
        style={[
          styles.viewCredit2,
          {
            borderColor: selectedMethod === "amazonPay" ? "#D17842" : "#0C0F14",
          },
        ]}
      >
        <Image source={require("../../../assets/imagesASM/amazonPay.png")} />
        <Text style={[styles.textName1, { flex: 1, marginLeft: 15 }]}>
          Amazon Pay
        </Text>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          position: "absolute",
          bottom: 40,
          right: 20,
          left: 20,
        }}
      >
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={styles.textName3}>Price</Text>
          <Text style={styles.textName}>
            <Text style={{ color: "#D17842", fontWeight: "bold" }}>$ </Text>
            {totalAmount.toFixed(2)}
          </Text>
        </View>
        <TouchableOpacity style={styles.btnAdd} onPress={handlePaymentSuccess}>
          <Text style={styles.textName2}>Proceed from Credit Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0C0F14",
    padding: 20,
  },
  btnBack: {
    backgroundColor: "#21262E",
    marginTop: 10,
    width: 45,
    height: 45,
    borderRadius: 15,
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
  viewCredit: {
    marginTop: 40,
    borderRadius: 20,
    borderWidth: 2,
    padding: 10,
  },
  viewCredit1: {
    backgroundColor: "#21262E",
    marginTop: 10,
    borderRadius: 20,
    padding: 15,
  },
  viewCredit2: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "#21262E",
    borderRadius: 25,
    marginTop: 13,
    borderWidth: 2,
  },
  textName: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
    alignSelf: "center",
  },
  textVisa: {
    marginVertical: 35,
    textAlign: "center",
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  textName1: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  textName2: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  textName3: {
    color: "gray",
    fontSize: 14,
    fontWeight: "bold",
  },
});
