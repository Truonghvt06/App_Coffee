// DetailsScreen.js

import React, { useState } from "react";
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFavorites } from "./FavoriteContext";
import { useCart } from "./CartContext";

const DetailsScreen = ({ route, navigation }) => {
  const { item } = route.params;
  const [selectedSize, setSelectedSize] = useState(
    item.prices[0]?.size || null
  );
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const { addItemToCart } = useCart(); // Access the cart context
  const isFavorite = favorites.some((fav) => fav.id === item.id);

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      removeFavorite(item);
    } else {
      addFavorite(item);
    }
  };

  const handleAddToCart = () => {
    const selectedPrice = item.prices.find(
      (price) => price.size === selectedSize
    );
    addItemToCart(item, 1, selectedSize); // Add item with size
    // navigation.navigate("Cart"); // Navigate to CartScreen or any other action
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        <ImageBackground
          source={{ uri: item.imagelink_square }}
          style={styles.content1}
          resizeMode="cover"
        >
          <View style={styles.headerContainer}>
            <TouchableOpacity
              style={styles.btnBack}
              onPress={() => navigation.goBack()}
            >
              <Image source={require("../../../assets/imagesASM/back.png")} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnBack}
              onPress={handleFavoriteToggle}
            >
              <Image
                style={{ tintColor: isFavorite ? "red" : "white" }}
                source={require("../../../assets/imagesASM/tim.png")}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.viewName}>
            <View>
              <Text style={styles.textName}>{item.name}</Text>
              <Text style={styles.textName1}>{item.special_ingredient}</Text>
              <View style={styles.ratingContainer}>
                <Image
                  style={styles.starImage}
                  source={require("../../../assets/imagesASM/star.png")}
                />
                <Text style={styles.ratingText}>{item.average_rating}</Text>
                <Text style={styles.textName1}>({item.ratings_count})</Text>
              </View>
            </View>
            <View>
              <View style={styles.iconContainer}>
                <TouchableOpacity style={styles.btnIcon}>
                  <Image
                    source={require("../../../assets/imagesASM/logo_coffee.png")}
                  />
                  <Text style={styles.textName1}>{item.type}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnIcon}>
                  <Image
                    source={require("../../../assets/imagesASM/drop.png")}
                  />
                  <Text style={styles.textName1}>{item.type}</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.btnIcon1}>
                <Text style={styles.textName1}>{item.roasted}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>

        <ScrollView style={styles.content2}>
          <Text style={[styles.textName2, styles.sectionTitle]}>
            Description
          </Text>
          <Text style={styles.textName3}>{item.description}</Text>
          <Text style={[styles.textName2, styles.sectionTitle]}>Size</Text>
          <View style={styles.sizeContainer}>
            {item.prices.map((price) => (
              <TouchableOpacity
                key={price.size}
                style={[
                  styles.btnIcon2,
                  selectedSize === price.size && styles.selectedSize,
                ]}
                onPress={() => setSelectedSize(price.size)}
              >
                <Text
                  style={[
                    styles.textName2,
                    selectedSize === price.size && styles.selectedSizeText,
                  ]}
                >
                  {price.size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </ScrollView>
      <View style={styles.fixedFooter}>
        <View style={styles.priceContainer}>
          <Text style={styles.textName1}>Price</Text>
          <Text style={styles.textName2}>
            <Text style={styles.priceSymbol}>$ </Text>
            {item.prices.find((price) => price.size === selectedSize)?.price ||
              item.prices[0].price}
          </Text>
        </View>
        <TouchableOpacity style={styles.btnAdd} onPress={handleAddToCart}>
          <Text style={styles.textName2}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0C0F14",
  },
  content1: {
    flex: 2.5,
    justifyContent: "space-between",
    paddingTop: 15,
  },
  content2: {
    flex: 1,
    padding: 20,
    marginBottom: 120,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btnBack: {
    backgroundColor: "#21262E",
    marginHorizontal: "6%",
    marginTop: 20,
    width: 45,
    height: 45,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  viewName: {
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    backgroundColor: "rgba(20, 20, 20, 0.5)",
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "70%",
  },
  textName: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
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
    fontWeight: "200",
    lineHeight: 22,
    marginBottom: 30,
  },
  ratingContainer: {
    flexDirection: "row",
    paddingTop: 20,
    alignItems: "center",
  },
  starImage: {
    width: 22,
    height: 22,
  },
  ratingText: {
    fontSize: 20,
    fontWeight: "500",
    color: "white",
    marginHorizontal: 5,
  },
  iconContainer: {
    flexDirection: "row",
  },
  btnIcon: {
    backgroundColor: "#21262E",
    marginLeft: 10,
    width: 55,
    height: 55,
    borderRadius: 13,
    justifyContent: "center",
    alignItems: "center",
  },
  btnIcon1: {
    backgroundColor: "#21262E",
    marginTop: 10,
    marginLeft: 10,
    height: 45,
    borderRadius: 13,
    justifyContent: "center",
    alignItems: "center",
  },
  btnIcon2: {
    backgroundColor: "#21262E",
    marginTop: 10,
    marginLeft: 10,
    width: "28%",
    height: 45,
    borderRadius: 13,
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
  fixedFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#0C0F14",
    paddingHorizontal: 15,
    paddingBottom: 25,
    paddingTop: 15,
    borderTopWidth: 1,
    borderColor: "#21262E",
    width: "100%",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  sectionTitle: {
    marginBottom: 10,
  },
  sizeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  selectedSize: {
    borderColor: "#D17842",
    borderWidth: 2,
  },
  selectedSizeText: {
    color: "#D17842",
  },
  priceContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  priceSymbol: {
    color: "#D17842",
    fontWeight: "bold",
  },
});
