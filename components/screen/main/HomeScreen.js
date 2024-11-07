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
import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../index/Header";
import { useCart } from "./CartContext";
import API from "../api/Api";

const HomeScreen = (props) => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const { addItemToCart } = useCart(); // Updated to use addItemToCart
  const { navigation } = props;

  // API
  // var API = axios.create({
  //   baseURL: "http://192.168.55.16:3000",
  //   timeout: 10000,
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: "Bearer YOUR_TOKEN",
  //   },
  // });

  const selectedUser = {
    id: "1",
    name: "Hoàng Văn Trường",
    email: "truong@gmail.com",
    password: "12345",
    address: "Phú Thọ",
    avata:
      "https://chiemtaimobile.vn/images/companies/1/%E1%BA%A2nh%20Blog/avatar-facebook-dep/Anh-avatar-hoat-hinh-de-thuong-xinh-xan.jpg?1704788263223",
  };

  // Fetch data
  const fetchData = () => {
    API.get("/product")
      .then((response) => {
        console.log(response.data);
        setData(response.data);
        setFilteredData(response.data); // Set initial filtered data
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Search
  useEffect(() => {
    if (search.trim() === "") {
      setFilteredData(data);
    } else {
      const filtered = data.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [search, data]);

  const handleAddToCart = (item, size) => {
    // Assuming default quantity as 1
    const quantity = 1;
    addItemToCart(item, quantity, size);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Header */}
        <Header title={"Coffee Lungo"} user={selectedUser} />
        {/* Title */}
        <View style={{ padding: 20 }}>
          <Text style={styles.title}>Find the best coffee for you</Text>
          {/* Search */}
          <View style={styles.viewSearch}>
            <Image
              source={require("../../../assets/imagesASM/search-normal.png")}
            />
            <TextInput
              style={{ marginLeft: 10 }}
              value={search}
              placeholder="Find Your Coffee..."
              placeholderTextColor={"#52555A"}
              color="white"
              onChangeText={(text) => {
                setSearch(text);
              }}
            />
          </View>
          {/* FlatList */}
          <FlatList
            data={filteredData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => {
                    navigation.navigate("Detail", { item: item });
                  }}
                >
                  <Image
                    style={styles.imageItem}
                    source={{ uri: item.imagelink_square }}
                  />
                  <Text style={[styles.itemText, { fontSize: 17 }]}>
                    {item.name}
                  </Text>
                  <Text style={[styles.itemText, { fontSize: 12 }]}>
                    {item.special_ingredient}
                  </Text>

                  {/* View add button */}
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={[
                        styles.itemText,
                        { fontSize: 19, fontWeight: "bold" },
                      ]}
                    >
                      {item.prices[0].currency} {item.prices[0].price}
                    </Text>

                    {/* Add Button */}
                    <TouchableOpacity
                      style={styles.btnAdd}
                      onPress={() => {
                        // Determine the size to add to the cart (defaulting to the first size here)
                        const defaultSize = item.prices[0].size;
                        handleAddToCart(item, defaultSize);
                      }}
                    >
                      <Image
                        style={{ width: 15, height: 15 }}
                        source={require("../../../assets/imagesASM/add.png")}
                      />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              );
            }}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: "space-between" }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0C0F14",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  imageHeader: {
    width: 40,
    height: 40,
  },
  imageHeader1: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  title: {
    color: "white",
    fontSize: 28,
    width: "50%",
    marginBottom: 40,
  },
  viewSearch: {
    backgroundColor: "#141921",
    flexDirection: "row",
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
  },
  item: {
    backgroundColor: "#141921",
    width: "46%",
    padding: 15,
    borderRadius: 20,
    marginVertical: 10,
    justifyContent: "center",
  },
  imageItem: {
    width: 135,
    height: 135,
    borderRadius: 20,
    alignSelf: "center",
  },
  itemText: {
    color: "white",
    marginTop: 10,
  },
  btnAdd: {
    width: 35,
    height: 35,
    backgroundColor: "#D17842",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
});
