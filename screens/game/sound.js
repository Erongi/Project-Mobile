import React, { useEffect, useState } from "react";
import Constants from "expo-constants";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";

import Modal from "react-native-modal";
import firebase from "firebase";
import { Audio } from "expo-av";

export default function App({ navigation }) {
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  const [Start, setStart] = useState("Press here.");
  const [Penalty, setPenalty] = useState(0);
  const [count, setCount] = useState(0);
  const [GameText, setGameText] = useState("Press The Box.");
  const [TextTime, setTextTime] = useState(0);
  const [timeStart, settimeStart] = useState(0);
  const [magic, setMagic] = useState("#E5E7E9");
  const [index, setIndex] = useState(0);

  const [isModalVisible, setModalVisible] = useState(false);

  const soundObject = new Audio.Sound();
  soundObject.loadAsync(require("../../assets/scream.mp3"));

  const user = firebase.auth().currentUser.email;

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const addScore = async () => {
    if (count >= 5) {
      await firebase
        .firestore()
        .collection("score")
        .add({
          email: user,
          point: ((TextTime + Penalty) / count).toFixed(2),
          gameName: "Sound",
        });
    }
    navigation.navigate("Hear");
  };

  const addScoreAndRetry = async () => {
    if (count >= 5) {
      await firebase
        .firestore()
        .collection("score")
        .add({
          email: user,
          point: ((TextTime + Penalty) / count).toFixed(2),
          gameName: "Sound",
        });
    }
    navigation.replace("Sounds");
  };

  function playSound() {
    console.log("play");
    soundObject.playAsync();
  }
  function stopSound() {
    console.log("stop");
    soundObject.stopAsync();
  }

  const startTheGame = async () => {
    setStart("");
    setMagic("black");
    var RandomNumber = 1000 + Math.random() * (5000 - 1000);
    setGameText("Press here When you hear the sound.");
    await delay(RandomNumber);
    playSound();
    settimeStart(performance.now());
  };

  const stopTheGame = () => {
    stopSound();
    var time = Math.abs(performance.now() - timeStart);
    setTextTime((x) => x + time);
    console.log("time : ", time);
    settimeStart(0);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 30, fontWeight: "bold", color: magic }}>
          Avg Time: {((TextTime + Penalty) / count).toFixed(2)} ms{"\n"}
        </Text>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.GameContainer}
          onPress={() => {
            if (timeStart === 0 && count > 0 && count < 6) {
              setGameText("Are you prefiring???(Penalty +1s)");
              setPenalty((x) => x + 1000);
              return;
            }
            if (count === 0) {
              setCount((x) => x + 1);
              startTheGame();
              return;
            }
            if (count >= 1 && count <= 4) {
              setCount((x) => x + 1);
              stopTheGame();
              startTheGame();
              return;
            }
            if (count === 5) {
              setCount((x) => x + 1);
              stopTheGame();
              setGameText("");
              setStart("END");
              toggleModal();
              return;
            }
          }}
        >
          <Text
            style={{
              alignSelf: "center",
              fontSize: 30,
              color: "white",
              margin: 20,
            }}
          >
            {Start}
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            alignSelf: "center",
            fontSize: 30,
            color: "black",
            margin: 20,
          }}
        >
          {"\n"}
          {GameText}
        </Text>
        <Modal isVisible={isModalVisible}>
          <View style={styles.loginbt}>
            <Text style={{ fontSize: 20, color: "black", fontFamily: "kanit" }}>
              End Game
            </Text>
            <Text>Score: {((TextTime + Penalty) / count).toFixed(2)}</Text>

            <View style={styles.row}>
              <TouchableOpacity
                style={styles.primary}
                onPress={() => addScore()}
              >
                <Text style={{ color: "white" }}>CONFIRM</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => addScoreAndRetry()}
              >
                <Text>RETRY</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  navbar: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "gray",
    width: "100%",
    height: "8%",
    position: "absolute",
    top: 0,
  },
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollView: {
    backgroundColor: "#E5E7E9",
    marginHorizontal: 5,
    width: "90%",
  },
  bottombar: {
    flex: 1,
    bottom: 0,
    flexDirection: "row",
    position: "absolute",
    justifyContent: "flex-end",
  },
  GameContainer: {
    backgroundColor: "gray",
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    height: "45%",
    borderColor: "black",
    borderWidth: 4,
    borderRadius: 15,
  },
  loginbt: {
    backgroundColor: "white",
    width: "60%",
    height: "25%",
    borderRadius: 30,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "space-around",
    padding: "4%",
  },
  button: {
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
  row: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
