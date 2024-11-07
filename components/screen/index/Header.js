import React from "react";
import { View, TouchableOpacity, Image, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Header = ({ title, user }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.navigate("Setting")}>
        <Image
          style={styles.imageHeader}
          source={require("../../../assets/imagesASM/Group 3.png")}
        />
      </TouchableOpacity>

      <Text style={styles.headerTitle}>{title}</Text>

      <TouchableOpacity
        onPress={() => navigation.navigate("Personal", { user })}
      >
        <Image style={styles.imageHeader1} source={{ uri: user.avata }} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#0C0F14",
    paddingVertical: 35,
    paddingHorizontal: 20,
  },
  imageHeader: {
    width: 45,
    height: 45,
  },
  imageHeader1: {
    width: 45,
    height: 45,
    borderRadius: 15,
  },
  headerTitle: {
    fontSize: 28,
    color: "white",
    fontWeight: "bold",
    marginTop: 10,
  },
});
