import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ImageBackground,
  TextInput,
} from "react-native";
import firebase from "firebase";

export default function Scoreboard(hello) {
  const [scores, setScores] = useState([]);

  // const a = firebase.auth().currentUser.email;
  // console.log(a);

  // const addScore = async () => {
  //   await firebase.firestore().collection("score").add({
  //     name: "adad",
  //     point: 5,
  //   });
  // };

  const showscore = async () => {
    const score = await firebase.firestore().collection("score").get();
    score.forEach((props) => {
      console.log(props.data());
      setScores((old) => {
        return [...old, props.data()];
      });
    });
  };

  useEffect(() => {
    showscore();
  }, []);

  return (
    <View style={styles.container}>
      {/* <Button
        title="eiei"
        onPress={() => {
          addScore();
        }}
      /> */}
      <Text style={(styles.settext, { top: 20 })}>
        <Text style={styles.text1}>React </Text>
        <Text style={styles.text2}>Reaction</Text>
      </Text>
      {scores.map((forn) => {
        return (
          <Text style={styles.scoretext} key={forn.name}>
            {forn.name}
            {forn.point}
          </Text>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
  },
  exitbt: {
    width: 25,
    height: 25,
    marginLeft: "10%",
    marginTop: "10%",
    marginRight: "90%",
    transform: [{ rotate: "180deg" }],
  },
  scoretext: {
    color: "red",
  },
  settext: {
    marginTop: "2%",
  },
  text1: {
    marginTop: "30%",
    fontSize: 40,
    color: "#ffce08",
  },
  text2: {
    marginTop: "30%",
    fontSize: 40,
    color: "white",
  },
});
