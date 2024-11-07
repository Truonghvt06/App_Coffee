import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import React, { useState } from "react";
import API from "../api/Api";

const RegisterScreen = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [re_password, setRe_password] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showPass1, setShowPass1] = useState(false);
  const [showErrorPass, setShowErrorPass] = useState(false);
  const { navigation } = props;

  const isValidEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  const handleRegister = async () => {
    if (name === "" || email === "" || password === "" || re_password === "") {
      setShowErrorPass("Nhập đầy đủ thông tin");
    } else if (!isValidEmail(email)) {
      setShowErrorPass("Email không hợp lệ. Thử lại!");
    } else if (re_password !== password) {
      setShowErrorPass("Re-type password không đúng. Thử lại!");
    } else {
      setShowErrorPass(false);
      try {
        await addUser({ name, email, password });
        Alert.alert("Đăng ký thành công", "Bạn đã đăng ký thành công!", [
          {
            text: "OK",
            onPress: () => navigation.navigate("Login"),
          },
        ]);
      } catch (error) {
        console.error("Error adding user:", error);
      }
    }
  };

  const addUser = async (user) => {
    try {
      await API.post("/user", user);
    } catch (error) {
      console.error("API call failed:", error);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require("../../../assets/imagesASM/Logo.png")}
        />
        <Text style={styles.title}>Welcome to Lungo !!</Text>
        <Text style={styles.title1}>Register to Continue</Text>
        <TextInput
          style={styles.textInput}
          value={name}
          color="white"
          placeholder="Name"
          placeholderTextColor={"#828282"}
          onChangeText={setName}
        />
        <TextInput
          style={styles.textInput}
          value={email}
          color="white"
          placeholder="Email"
          placeholderTextColor={"#828282"}
          onChangeText={setEmail}
        />
        <View
          style={[
            styles.textInput,
            { flexDirection: "row", justifyContent: "space-between" },
          ]}
        >
          <TextInput
            value={password}
            placeholder="Password"
            color="white"
            placeholderTextColor={"#828282"}
            secureTextEntry={!showPass}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => {
              setShowPass(!showPass);
            }}
          >
            <Image
              source={
                showPass
                  ? require("../../../assets/imagesASM/show.png")
                  : require("../../../assets/imagesASM/hide.png")
              }
            />
          </TouchableOpacity>
        </View>
        <View
          style={[
            styles.textInput,
            { flexDirection: "row", justifyContent: "space-between" },
          ]}
        >
          <TextInput
            value={re_password}
            placeholder="Re-type password"
            color="white"
            placeholderTextColor={"#828282"}
            secureTextEntry={!showPass1}
            onChangeText={(text) => {
              setRe_password(text);
              setShowErrorPass(false);
            }}
          />
          <TouchableOpacity
            onPress={() => {
              setShowPass1(!showPass1);
            }}
          >
            <Image
              source={
                showPass1
                  ? require("../../../assets/imagesASM/hide.png")
                  : require("../../../assets/imagesASM/show.png")
              }
            />
          </TouchableOpacity>
        </View>
        <View style={{ width: "90%" }}>
          {showErrorPass ? (
            <Text style={styles.errorPass}>{showErrorPass}</Text>
          ) : null}
        </View>
        <TouchableOpacity
          onPress={handleRegister}
          style={[styles.button, { backgroundColor: "#D17842", marginTop: 40 }]}
        >
          <Text style={[styles.title, { fontWeight: "bold" }]}>Register</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <Text style={styles.title2}>You have an account? Click</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.title3}> Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0C0F14",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 160,
    height: 160,
  },
  title: {
    color: "white",
    fontSize: 20,
  },
  title1: {
    color: "#828282",
    fontSize: 16,
    marginTop: 20,
    marginBottom: 40,
  },
  title2: {
    color: "#828282",
  },
  title3: {
    color: "#D17842",
  },
  textInput: {
    width: "90%",
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#828282",
    padding: 15,
    marginVertical: 6,
  },
  button: {
    width: "90%",
    height: 55,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#828282",
    marginVertical: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  button1: {
    width: "90%",
    height: 55,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#828282",
    marginVertical: 6,
    alignItems: "baseline",
    justifyContent: "center",
  },
  viewButton: {
    paddingHorizontal: 20,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  errorPass: {
    color: "#FB7181",
    fontSize: 12,
  },
});
