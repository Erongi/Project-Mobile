import React, { useState } from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "./screens/authentication/login";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import firebase from "firebase";
import { YellowBox } from "react-native";

YellowBox.ignoreWarnings(["Setting a timer"]);

var firebaseConfig = {
  apiKey: "AIzaSyDRZtBf_mgUps_iR35eOzCR12dA4C8KGCs",
  authDomain: "project-mobile-e91b2.firebaseapp.com",
  databaseURL: "https://project-mobile-e91b2.firebaseio.com",
  projectId: "project-mobile-e91b2",
  storageBucket: "project-mobile-e91b2.appspot.com",
  messagingSenderId: "125305349174",
  appId: "1:125305349174:web:7cdac7694cc088f17fa497",
  measurementId: "G-X5GFHTXMJ2",
};

const Stack = createStackNavigator();
const getFonts = () =>
  Font.loadAsync({
    kanit: require("./assets/font/kanit.ttf"),
  });

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  if (fontsLoaded) {
    return <Login />;
  } else {
    return (
      <AppLoading startAsync={getFonts} onFinish={() => setFontsLoaded(true)} />
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
  },
});
