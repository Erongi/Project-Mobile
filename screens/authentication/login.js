import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  MyText,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import firebase from "firebase";
import Modal from "react-native-modal";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);

  const checkLogin = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        // alert("Login Success!")
        navigation.navigate("index");
        toggleModal();
      })
      .catch((error) => {
        if (error.code === "auth/invalid-email") {
          console.log("That email address is invalid!");
          alert("That email address is invalid!");
        } else {
          alert("Your email or password is invalid.");
        }

        // console.error(error);
        toggleModal();
      });
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const switchToSignUp = () => {
    navigation.navigate("Register");
  };
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.container}>
        <Text style={styles.header}>React Reaction</Text>
        <Image
          source={require("../../assets/logo2.png")}
          style={styles.image}
        />
        <TextInput
          style={styles.textinput}
          placeholder="Email Address"
          onChangeText={(getEmail) => setEmail(getEmail)}
        />
        <TextInput
          style={styles.textinput}
          placeholder="Password"
          onChangeText={(getPassword) => setPassword(getPassword)}
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.primary} onPress={toggleModal}>
          <Text style={{ color: "white" }}>LOG IN</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signup} onPress={switchToSignUp}>
          <Text style={{ color: "black" }}>SIGN UP</Text>
        </TouchableOpacity>

        <Modal isVisible={isModalVisible}>
          <View style={styles.loginbt}>
            <Text style={{ fontSize: 20, color: "black", fontFamily: "kanit" }}>
              CONFIRM LOGIN
            </Text>
            <Text>
              Are you sure to login with this E-mail and this password?
            </Text>

            <View style={styles.row}>
              <TouchableOpacity
                style={styles.primary}
                onPress={() => checkLogin(email, password)}
              >
                <Text style={{ color: "white" }}>CONFIRM</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => toggleModal()}
              >
                <Text>CANCEL</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* <TouchableOpacity onPress={switchToSignUp} style={styles.gotoregist}>
        <Text style={styles.gotoregist}>Doesn't have any account ?</Text>
      </TouchableOpacity> */}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 40,
    alignSelf: "stretch",
  },
  gotoregist: {
    left: "23%",
    bottom: "20%",
    color: "red",
  },
  loginbt: {
    // flex: 1,
    backgroundColor: "white",
    // marginTop: "40%",
    // marginBottom: "40%",
    // marginLeft: "20%",
    // marginRight: "20%",
    width: "60%",
    height: "25%",
    borderRadius: 30,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "space-around",
    padding: "4%",
  },
  button: {
    // backgroundColor: "#0059ff",
    // fontSize: 20,
    // marginBottom: 100,
    // alignItems: "center",
    // justifyContent: "center",
    borderRadius: 10,
    fontFamily: "kanit",
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
  },
  primary: {
    borderRadius: 10,
    fontFamily: "kanit",
    alignItems: "center",
    backgroundColor: "#2288dd",
    padding: 10,
  },
  header: {
    color: "#0059ff",
    fontSize: 30,
    borderBottomColor: "#199187",
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  textinput: {
    padding: 5,
    alignSelf: "stretch",
    height: 40,
    marginBottom: 20,
    color: "#000",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "black",
    borderRadius: 10,
    // borderBottomColor: "#f8f8f8",
  },
  row: {
    // flex: 1,
    // height: "100%",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  image: {
    // flex: 1,
    height: "48%",
    width: "80%",
    alignSelf: "center",
    // resizeMode: "stretch",
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  signup: {
    marginTop: 5,
    borderRadius: 10,
    fontFamily: "kanit",
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
  },
});
