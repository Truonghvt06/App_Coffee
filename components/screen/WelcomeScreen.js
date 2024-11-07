import React, { useEffect, useCallback } from "react";
import { Image, StyleSheet, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native"; // Assuming you are using React Navigation for navigation

const WelcomeScreen = () => {
  const navigation = useNavigation();

  // Function to navigate to Login screen
  const navigateToLogin = useCallback(() => {
    navigation.navigate("Login"); // Replace "Login" with the actual name of your Login screen
  }, [navigation]);

  // Effect to navigate after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigateToLogin();
    }, 3000); // 3000 milliseconds = 3 seconds

    return () => clearTimeout(timer); // Cleanup function to clear the timer if component unmounts
  }, [navigateToLogin]);

  return (
    // <SafeAreaView style={{ flex: 1 }}>
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../assets/imagesASM/Logo.png")}
      />
      <Text style={styles.text}>Redirecting to Login...</Text>
    </View>
    // </SafeAreaView>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0C0F14",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
  },
  text: {
    color: "white",
    marginTop: 20,
  },
});
