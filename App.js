import React, { useState } from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "./screens/authentication/home";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import firebase from "firebase";
import { LogBox } from "react-native";

LogBox.ignoreLogs(["Require cycle"]);

// var firebaseConfig = {
//   apiKey: "AIzaSyDRZtBf_mgUps_iR35eOzCR12dA4C8KGCs",
//   authDomain: "project-mobile-e91b2.firebaseapp.com",
//   databaseURL: "https://project-mobile-e91b2.firebaseio.com",
//   projectId: "project-mobile-e91b2",
//   storageBucket: "project-mobile-e91b2.appspot.com",
//   messagingSenderId: "125305349174",
//   appId: "1:125305349174:web:7cdac7694cc088f17fa497",
//   measurementId: "G-X5GFHTXMJ2",
// };

var firebaseConfig = {
  apiKey: "AIzaSyAN_QaruL59j_7MhK8rmJoZOMUpVbXraEI",
  authDomain: "victorypath-b33ae.firebaseapp.com",
  databaseURL: "https://victorypath-b33ae.firebaseio.com",
  projectId: "victorypath-b33ae",
  storageBucket: "victorypath-b33ae.appspot.com",
  messagingSenderId: "542011425086",
  appId: "1:542011425086:web:e4bcd6dc2376ef167cec6f",
  measurementId: "G-RXEY1T8PB5",
};

// var firebaseConfig = {
//   apiKey: "AIzaSyDIiBbHaKw46F9TbVRFqSMZcf-ezg-EK18",
//   authDomain: "test-mobile-f8963.firebaseapp.com",
//   databaseURL: "https://test-mobile-f8963.firebaseio.com/",
//   projectId: "test-mobile-f8963",
//   storageBucket: "test-mobile-f8963.appspot.com",
//   messagingSenderId: "841369151186",
//   appId: "1:841369151186:web:ebad232aeed50d536f2f0b",
//   measurementId: "G-3TJ50JPJDJ",
// };

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
    return <Home />;
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
