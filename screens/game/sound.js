import React, { useEffect, useState } from "react";
import Constants from "expo-constants";
import firebase from "firebase";
import Modal from "react-native-modal";
import {
  Button,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
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
  const [isModalVisible, setModalVisible] = useState(false);
  // const [index, setIndex] = useState(0);
  const user = firebase.auth().currentUser.email;

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const addScore = async (score) => {
    if (count >= 5) {
      await firebase.firestore().collection("score").add({
        email: user,
        point: score,
        gameName: "Sound",
      });
    }
    // toggleModal();
    navigation.navigate("Vision");
  };
  const addScoreAndRetry = async (score) => {
    if (count >= 5) {
      await firebase.firestore().collection("score").add({
        email: user,
        point: score,
        gameName: "Sound",
      });
    }
    // toggleModal();
    navigation.replace("Sounds");
  };

  useEffect(() => {
    this.sound = new Audio.Sound();
    const status = {
      shouldPlay: false,
    };
    this.sound.loadAsync(require("../../assets/scream.mp3"), status, false);
  });

  function playSound() {
    console.log("play");
    this.sound.playAsync();
  }
  function stopSound() {
    console.log("stop");
    this.sound.stopAsync();
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
  var final = ((TextTime + Penalty) / count).toFixed(2);
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
          Avg Time: {final} ms{"\n"}
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
              color: "red",
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
            <Text>Score: {final}</Text>

            <View style={styles.row}>
              <TouchableOpacity
                style={styles.primary}
                onPress={() => addScore(final)}
              >
                <Text style={{ color: "white" }}>CONFIRM</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => addScoreAndRetry(final)}
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
    // marginTop: Constants.statusBarHeight,
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
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    height: "45%",
    borderColor: "black",
    borderWidth: 4,
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
  row: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  primary: {
    borderRadius: 10,
    fontFamily: "kanit",
    alignItems: "center",
    backgroundColor: "#2288dd",
    padding: 10,
  },
  button: {
    borderRadius: 10,
    fontFamily: "kanit",
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
  },
});
