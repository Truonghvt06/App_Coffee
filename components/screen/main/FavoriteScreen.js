import React from "react";
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
import Header from "../index/Header";

const FavoriteScreen = ({ navigation }) => {
  const { favorites, removeFavorite } = useFavorites();
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
    // <SafeAreaView style={{ flex: 1 }}>
    <View style={styles.container}>
      <View>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <Header title="Favorites" user={selectedUser} />
          {favorites.map((item) => (
            <View style={{ padding: 20 }}>
              <View key={item.id} style={styles.item}>
                <ImageBackground
                  source={{ uri: item.imagelink_square }}
                  style={styles.content1}
                  resizeMode="cover"
                >
                  <View style={styles.header}>
                    <TouchableOpacity
                      style={styles.btnBack}
                      onPress={() => {
                        removeFavorite(item);
                      }}
                    >
                      <Image
                        style={{ tintColor: "red" }}
                        source={require("../../../assets/imagesASM/tim.png")}
                      />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.viewName}>
                    <View>
                      <Text style={styles.textName}>{item.name}</Text>
                      <Text style={styles.textName1}>
                        {item.special_ingredient}
                      </Text>
                      <View style={styles.rating}>
                        <Image
                          style={styles.ratingStar}
                          source={require("../../../assets/imagesASM/star.png")}
                        />
                        <Text style={styles.ratingText}>
                          {item.average_rating}
                        </Text>
                        <Text style={styles.textName1}>
                          ({item.ratings_count})
                        </Text>
                      </View>
                    </View>

                    <View>
                      <View style={styles.topIcons}>
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

                <View style={styles.content2}>
                  <Text style={[styles.textName2, { marginBottom: 10 }]}>
                    Description
                  </Text>
                  <Text style={styles.textName3}>{item.description}</Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
    // </SafeAreaView>
  );
};

export default FavoriteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0C0F14",
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  content1: {
    height: 450,
    justifyContent: "space-between",
    overflow: "hidden",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 20,
  },
  content2: {
    padding: 20,
  },
  item: {
    marginBottom: 20,
    backgroundColor: "#21262E",
    borderRadius: 20,
  },
  btnBack: {
    backgroundColor: "#21262E",
    width: 45,
    height: 45,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
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
    marginLeft: 10,
    height: 45,
    borderRadius: 13,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  viewName: {
    backgroundColor: "rgba(20, 20, 20, 0.5)",
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  textName: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  textName1: {
    color: "white",
    fontSize: 10,
    fontWeight: "200",
  },
  textName2: {
    color: "white",
    fontSize: 17,
  },
  textName3: {
    color: "white",
    fontWeight: "200",
    lineHeight: 22,
  },
  rating: {
    flexDirection: "row",
    paddingTop: 20,
    alignItems: "center",
  },
  ratingStar: {
    width: 22,
    height: 22,
  },
  ratingText: {
    fontSize: 20,
    fontWeight: "500",
    color: "white",
  },
  topIcons: {
    flexDirection: "row",
    marginBottom: 10,
  },
});
