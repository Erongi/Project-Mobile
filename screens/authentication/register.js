import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import firebase from "firebase";

export default function Register({ navigation }) {
  var [email, setEmail] = useState("");
  var [password, setPassword] = useState("");

  const signUp = (email, password) => {
    console.log(email, password);
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        navigation.navigate("Login");
        alert("User account created & signed in!");
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          console.log("That email address is already in use!");
          alert("This email address is already in use!");
        }

        if (error.code === "auth/invalid-email") {
          console.log("That email address is invalid!");
          alert("This email address is already in use!");
        }
      });
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.container}>
        <Text style={styles.header}>Sing Up</Text>
        <Image
          source={require("../../assets/logo1.png")}
          style={styles.image}
        />
        <TextInput
          style={styles.textinput}
          onChangeText={(value) => setEmail(value)}
          placeholder="Email Address"
        ></TextInput>
        <TextInput
          style={styles.textinput}
          onChangeText={(value) => setPassword(value)}
          placeholder="Password"
          secureTextEntry={true}
        ></TextInput>

        <TouchableOpacity
          style={styles.primary}
          onPress={() => signUp(email, password)}
        >
          <Text
            style={{ color: "white" }}
            onPress={() => signUp(email, password)}
          >
            SIGN UP
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 40,
    alignSelf: "stretch",
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
    marginBottom: 30,
    color: "#000",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "black",
    borderRadius: 10,
  },
  image: {
    height: "48%",
    width: "80%",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
});
