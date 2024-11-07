import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import API from "../api/Api";

const LoginScreen = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showErrorPass, setShowErrorPass] = useState("");
  const { navigation } = props;

  const isValidEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  const handleLogin = async () => {
    if (password === "" || email === "") {
      setShowErrorPass("Nhập đầy đủ thông tin!");
    } else if (!isValidEmail(email)) {
      setShowErrorPass("Email không hợp lệ. Thử lại!");
    } else {
      try {
        const user = await loginUser(email, password);
        if (user) {
          setShowErrorPass("");
          navigation.navigate("BottomTab");
        } else {
          setShowErrorPass("Email hoặc mật khẩu không chính xác. Thử lại!");
        }
      } catch (error) {
        console.error(error);
        setShowErrorPass("Đã xảy ra lỗi. Thử lại!");
      }
    }
  };

  const loginUser = async (email, password) => {
    try {
      const response = await API.get(`/user`);
      const users = response.data;
      const user = users.find(
        (user) => user.email === email && user.password === password
      );
      return user;
    } catch (err) {
      console.log(err);
      throw err;
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
        <Text style={styles.title1}>Login to Continue</Text>
        <TextInput
          style={styles.textInput}
          value={email}
          color="white"
          placeholder="Email Address"
          placeholderTextColor={"#828282"}
          onChangeText={(text) => {
            setEmail(text);
            setShowErrorPass(""); // Clear errors on input change
          }}
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
            onChangeText={(text) => {
              setPassword(text);
              setShowErrorPass(""); // Clear errors on input change
            }}
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

        {/* Lỗi pass */}
        <View style={{ width: "90%" }}>
          {showErrorPass ? (
            <Text style={styles.errorPass}>{showErrorPass}</Text>
          ) : null}
        </View>

        {/* Button Đăng nhập */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#D17842", marginTop: 40 }]}
          onPress={handleLogin}
        >
          <Text style={[styles.title, { fontWeight: "bold" }]}>Sign In</Text>
        </TouchableOpacity>

        {/* Button Đăng nhập = google */}
        <TouchableOpacity
          style={[
            styles.button1,
            { backgroundColor: "white", marginTop: 6, marginBottom: 20 },
          ]}
        >
          <View style={styles.viewButton}>
            <View style={{ flex: 1 }}>
              <Image
                style={{ width: 20, height: 20 }}
                source={require("../../../assets/imagesASM/icon_google.png")}
              />
            </View>
            <Text
              style={{
                color: "black",
                fontSize: 18,
                flex: 3,
                fontWeight: "bold",
              }}
            >
              Sign In With Google
            </Text>
          </View>
        </TouchableOpacity>

        <View style={{ flexDirection: "row", marginTop: 20 }}>
          <Text style={styles.title2}>Don’t have account? Click</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.title3}> Register</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <Text style={styles.title2}>Forget Password? Click</Text>
          <TouchableOpacity>
            <Text style={styles.title3}> Reset</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

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
