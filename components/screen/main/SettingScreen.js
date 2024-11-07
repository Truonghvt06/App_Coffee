import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const SettingScreen = (props) => {
  const { navigation } = props;
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogout = () => {
    navigation.navigate("Login");
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", marginBottom: 20 }}>
        {/* Back */}
        <TouchableOpacity
          style={styles.btnBack}
          onPress={() => navigation.goBack()}
        >
          <Image source={require("../../../assets/imagesASM/back.png")} />
        </TouchableOpacity>

        {/* Title */}
        <Text style={styles.textName}>Setting</Text>
      </View>

      {/* Content 1 */}
      <TouchableOpacity style={styles.viewContent}>
        <Image
          style={{ marginTop: 4 }}
          source={require("../../../assets/imagesASM/history.png")}
        />
        <Text style={[styles.textName1, { flex: 1, marginLeft: 25 }]}>
          History
        </Text>
        <Image source={require("../../../assets/imagesASM/next.png")} />
      </TouchableOpacity>

      {/* Content 2 */}
      <TouchableOpacity
        style={styles.viewContent}
        onPress={() => navigation.navigate("Personal")}
      >
        <Image source={require("../../../assets/imagesASM/account.png")} />
        <Text style={[styles.textName1, { flex: 1, marginLeft: 25 }]}>
          Personal Details
        </Text>
        <Image source={require("../../../assets/imagesASM/next.png")} />
      </TouchableOpacity>

      {/* Content 3 */}
      <TouchableOpacity style={styles.viewContent}>
        <Image source={require("../../../assets/imagesASM/location.png")} />
        <Text style={[styles.textName1, { flex: 1, marginLeft: 25 }]}>
          Address
        </Text>
        <Image source={require("../../../assets/imagesASM/next.png")} />
      </TouchableOpacity>

      {/* Content 4 */}
      <TouchableOpacity style={styles.viewContent}>
        <Image source={require("../../../assets/imagesASM/payment.png")} />
        <Text style={[styles.textName1, { flex: 1, marginLeft: 25 }]}>
          Payment Method
        </Text>
        <Image source={require("../../../assets/imagesASM/next.png")} />
      </TouchableOpacity>

      {/* Content 5 */}
      <TouchableOpacity style={styles.viewContent}>
        <Image source={require("../../../assets/imagesASM/about.png")} />
        <Text style={[styles.textName1, { flex: 1, marginLeft: 25 }]}>
          About
        </Text>
        <Image source={require("../../../assets/imagesASM/next.png")} />
      </TouchableOpacity>

      {/* Content 6 */}
      <TouchableOpacity style={styles.viewContent}>
        <Image source={require("../../../assets/imagesASM/help.png")} />
        <Text style={[styles.textName1, { flex: 1, marginLeft: 25 }]}>
          Help
        </Text>
        <Image source={require("../../../assets/imagesASM/next.png")} />
      </TouchableOpacity>

      {/* Content 7 */}
      <TouchableOpacity
        style={styles.viewContent}
        onPress={() => setModalVisible(true)}
      >
        <Image source={require("../../../assets/imagesASM/log-out.png")} />
        <Text style={[styles.textName1, { flex: 1, marginLeft: 25 }]}>
          Log out
        </Text>
        <Image source={require("../../../assets/imagesASM/next.png")} />
      </TouchableOpacity>

      {/* Logout Modal */}
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Are you sure you want to log out?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleLogout}
              >
                <Text style={styles.modalButtonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: "#D17842" }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0C0F14",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  btnBack: {
    backgroundColor: "#21262E",
    marginTop: 10,
    width: 45,
    height: 45,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  viewContent: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: 10,
    borderWidth: 2,
  },
  textName: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    flex: 1,
    textAlignVertical: "center",
    textAlign: "center",
    marginTop: 7,
  },
  textName1: {
    color: "white",
    fontWeight: "500",
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba( 250, 250, 240, 0.5 )",
  },
  modalContent: {
    width: "85%",
    height: "17%",
    backgroundColor: "#21262E",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
  },
  modalText: {
    color: "white",
    fontSize: 20,
    marginBottom: 40,
  },
  modalButtons: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
  },
  modalButton: {
    backgroundColor: "#D17842",
    borderRadius: 15,
    paddingVertical: 13,
    marginBottom: 0,
    alignItems: "center",
    width: "40%",
  },
  modalButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
