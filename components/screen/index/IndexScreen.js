import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import WelcomeScreen from "../WelcomeScreen";
import LoginScreen from "../account/LoginScreen";
import RegisterScreen from "../account/RegisterScreen";
import BottomTabScreen from "../bottom_tab/BottomTabScreen";
import CartScreen from "../main/CartScreen";
import DetailsScreen from "../main/DetailsScreen";
import FavoriteScreen from "../main/FavoriteScreen";
import HistoryScreen from "../main/HistoryScreen";
import HomeScreen from "../main/HomeScreen";
import PaymentScreen from "../main/PaymentScreen";
import PersonalScreen from "../main/PersonalScreen";
import SettingScreen from "../main/SettingScreen";
import { FavoriteProvider } from "../main/FavoriteContext";
import { CartProvider } from "../main/CartContext";

const Stack = createStackNavigator();

const IndexScreen = () => {
  return (
    <CartProvider>
      <FavoriteProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              options={{ headerShown: false }}
              name="Welcome"
              component={WelcomeScreen}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="Login"
              component={LoginScreen}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="Register"
              component={RegisterScreen}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="BottomTab"
              component={BottomTabScreen}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="Cart"
              component={CartScreen}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="Detail"
              component={DetailsScreen}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="Favorrite"
              component={FavoriteScreen}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="History"
              component={HistoryScreen}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="Home"
              component={HomeScreen}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="Payment"
              component={PaymentScreen}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="Personal"
              component={PersonalScreen}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="Setting"
              component={SettingScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </FavoriteProvider>
    </CartProvider>
  );
};

export default IndexScreen;

const styles = StyleSheet.create({});
