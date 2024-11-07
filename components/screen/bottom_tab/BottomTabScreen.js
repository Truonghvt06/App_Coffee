import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../main/HomeScreen";
import CartScreen from "../main/CartScreen";
import FavoriteScreen from "../main/FavoriteScreen";
import HistoryScreen from "../main/HistoryScreen";
import { Image, StyleSheet, View } from "react-native";

const Tab = createBottomTabNavigator();

const BottomTabScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        // tabBarShowLabel: false, // tắt title
        tabBarActiveTintColor: "#D17842", //Màu title
        tabBarStyle: {
          backgroundColor: "#0C0F14",
          height: 85,
          paddingVertical: 10,
        },
      }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              <Image
                style={styles.icon}
                source={require("../../../assets/bottom_tab/home.png")}
                tintColor={focused ? "#D17842" : "#4E5053"}
              />
            </View>
          ),
        }}
        name="Home"
        component={HomeScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              <Image
                style={styles.icon}
                source={require("../../../assets/bottom_tab/bag.png")}
                tintColor={focused ? "#D17842" : "#4E5053"}
              />
            </View>
          ),
        }}
        name="Cart"
        component={CartScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              <Image
                style={styles.icon}
                source={require("../../../assets/bottom_tab/heart.png")}
                tintColor={focused ? "#D17842" : "#4E5053"}
              />
            </View>
          ),
        }}
        name="Favorite"
        component={FavoriteScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              <Image
                style={styles.icon}
                source={require("../../../assets/bottom_tab/notification.png")}
                tintColor={focused ? "#D17842" : "#4E5053"}
              />
            </View>
          ),
        }}
        name="History"
        component={HistoryScreen}
      />
    </Tab.Navigator>
  );
};

export default BottomTabScreen;

const styles = StyleSheet.create({
  iconContainer: {
    paddingVertical: 20,
    borderRadius: 5,
  },
  icon: {
    width: 30,
    height: 30,
  },
});
