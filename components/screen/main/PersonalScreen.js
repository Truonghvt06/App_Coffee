import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

const PersonalScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { user } = route.params;

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [re_password, setRe_password] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showPass1, setShowPass1] = useState(false);
  const [showErrorPass, setShowErrorPass] = useState(false);

  const handleSave = () => {
    if (password === "" && re_password === "") {
      setShowErrorPass("Nhập đầy đủ thông tin!");
    } else if (re_password === password) {
      setShowErrorPass(false);
      navigation.navigate("Home");
    } else {
      setShowErrorPass("Password và Re-type password không trùng khớp!");
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", marginBottom: 20, marginTop: 10 }}>
        <TouchableOpacity
          style={styles.btnBack}
          onPress={() => navigation.goBack()}
        >
          <Image source={require("../../../assets/imagesASM/back.png")} />
        </TouchableOpacity>
        <Text style={styles.textName}>Personal Details</Text>
      </View>

      <TouchableOpacity style={styles.avatar}>
        <Image
          style={{ borderRadius: 15, flex: 1 }}
          source={{ uri: user.avata }}
        />
      </TouchableOpacity>

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
          onChangeText={(text) => {
            setPassword(text), setShowErrorPass(false);
          }}
        />
        <TouchableOpacity onPress={() => setShowPass(!showPass)}>
          <Image
            source={
              showPass
                ? require("../../../assets/imagesASM/hide.png")
                : require("../../../assets/imagesASM/show.png")
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
        <TouchableOpacity onPress={() => setShowPass1(!showPass1)}>
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
        onPress={handleSave}
        style={[
          styles.buttonSave,
          { backgroundColor: "#D17842", marginTop: 40 },
        ]}
      >
        <Text style={[styles.textName1, { fontWeight: "bold" }]}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PersonalScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0C0F14",
    padding: 20,
  },
  btnBack: {
    backgroundColor: "#21262E",
    marginLeft: -8,
    width: 45,
    height: 45,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    alignSelf: "center",
    width: 120,
    height: 120,
    marginTop: 30,
    marginBottom: 50,
  },
  textName: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    flex: 1,
    textAlignVertical: "center",
    textAlign: "center",
    alignSelf: "center",
    marginRight: 40,
  },
  textInput: {
    width: "100%",
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#828282",
    padding: 15,
    marginVertical: 6,
  },
  errorPass: {
    color: "#FB7181",
    fontSize: 12,
  },
  buttonSave: {
    width: "100%",
    height: 55,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#828282",
    marginVertical: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  textName1: {
    color: "white",
    fontWeight: "500",
    fontSize: 16,
  },
});
