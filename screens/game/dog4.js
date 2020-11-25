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
  const [Page, setPage] = useState(0);
  const [Ans, setAns] = useState(0);
  const [RealAns, setRealAns] = useState(0);
  const [TimeStart, setTimeStart] = useState(0);
  const [Time, setTime] = useState(0);
  const [Score, setScore] = useState(0);
  const [Penalty, setPenalty] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);

  const dog = new Audio.Sound();
  dog.loadAsync(require("../../assets/sound/dog.mp3"));

  const cat = new Audio.Sound();
  cat.loadAsync(require("../../assets/sound/cat.mp3"));

  const ele = new Audio.Sound();
  ele.loadAsync(require("../../assets/sound/elephant.mp3"));

  const bird = new Audio.Sound();
  bird.loadAsync(require("../../assets/sound/bird.mp3"));

  function playSound(num) {
    console.log("hi");
    if (num === 0) {
      dog.playAsync();
    } else if (num === 1) {
      cat.playAsync();
    } else if (num === 2) {
      ele.playAsync();
    } else if (num === 3) {
      bird.playAsync();
    }
  }
  function stopSound() {
    dog.stopAsync();
    cat.stopAsync();
    ele.stopAsync();
    bird.stopAsync();
  }

  const user = firebase.auth().currentUser.email;

  useEffect(() => {
    // Update the document title using the browser API
    CheckAns();
  }, [Ans]);

  const RandomProposition = async () => {
    var RandomNumber = 2000;
    const randomT = Math.floor(Math.random() * 4);
    await delay(RandomNumber);
    playSound(randomT);
    setRealAns(randomT);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const addScore = async () => {
    await firebase
      .firestore()
      .collection("score")
      .add({
        email: user,
        point: (Time / 6).toFixed(2),
        gameName: "Dog4",
      });
    navigation.navigate("Hear");
  };

  const addScoreAndRetry = async () => {
    await firebase
      .firestore()
      .collection("score")
      .add({
        email: user,
        point: (Time / 6).toFixed(2),
        gameName: "Dog4",
      });
    navigation.replace("Dog4");
  };

  const CheckAns = () => {
    const NewScore = Score + 1;
    const NewPenalty = Penalty + 1;
    const time = Math.abs(performance.now() - TimeStart);

    if (Ans === RealAns) {
      setScore(NewScore);
      if (Score === 6) {
        setTime(time);
        setPage(2);
        toggleModal();
      }
      if (Score >= 1) {
        RandomProposition();
      }
    } else {
      setPenalty(NewPenalty);
    }
  };

  let content = (
    <TouchableOpacity
      style={{
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
        width: "90%",
        height: "45%",
        borderColor: "black",
        borderWidth: 4,
        borderRadius: 15,
      }}
      onPress={() => {
        setPage(1);
        setTimeStart(performance.now());
        RandomProposition();
      }}
    >
      <Text style={{ color: "black", fontSize: 35, fontWeight: "bold" }}>
        START
      </Text>
    </TouchableOpacity>
  );

  if (Page === 1) {
    content = (
      <View
        style={{
          flex: 1,
          alignItems: "center",
        }}
      >
        <View>
          <Text style={{ fontFamily: "kanit", fontSize: 40 }}>
            {"\n"}
            Score : {Score - 1}
            {"\n"}
          </Text>
        </View>
        <View>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.animalcon}
              onPress={() => {
                stopSound();
                setAns(0);
                CheckAns();
              }}
            >
              <Text
                style={{
                  fontFamily: "kanit",
                  fontWeight: "bold",
                  fontSize: 20,
                  color: "brown",
                }}
              >
                DOG
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.animalcon}
              onPress={() => {
                stopSound();
                setAns(1);
                CheckAns();
              }}
            >
              <Text
                style={{
                  fontFamily: "kanit",
                  fontWeight: "bold",
                  fontSize: 20,
                  color: "blue",
                }}
              >
                CAT
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.animalcon}
              onPress={() => {
                stopSound();
                setAns(2);
                CheckAns();
              }}
            >
              <Text
                style={{
                  fontFamily: "kanit",
                  fontWeight: "bold",
                  fontSize: 20,
                  color: "gray",
                }}
              >
                ELEPHANT
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.animalcon}
              onPress={() => {
                stopSound();
                setAns(3);
                CheckAns();
              }}
            >
              <Text
                style={{
                  fontFamily: "kanit",
                  fontWeight: "bold",
                  fontSize: 20,
                  color: "green",
                }}
              >
                BIRD
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.rule}>
          <Text style={{ fontFamily: "kanit", fontSize: 25 }}>
            {"\n"}Select the highest number on your screen
          </Text>
        </View>
      </View>
    );
  }

  if (Page === 2) {
    content = (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",
          }}
        >
          END{" "}
        </Text>
        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",
          }}
        >
          Avg Time : {(Time / 10).toFixed(2)} ms
        </Text>
        <Modal isVisible={isModalVisible}>
          <View style={styles.loginbt}>
            <Text style={{ fontSize: 20, color: "black", fontFamily: "kanit" }}>
              End Game
            </Text>
            <Text>Score: {(Time / 10).toFixed(2)} ms</Text>

            <View style={styles.rows}>
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
      </View>
    );
  }

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
        {content}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  AnsBox: {
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "#fd3a69",
    borderColor: "black",
    borderWidth: 4,
    height: 140,
    width: 140,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    marginTop: 10,
  },
  navbar: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "gray",
    width: "100%",
    height: "8%",
    position: "absolute",
    top: 0,
  },
  proposition: {
    borderColor: "black",
    borderWidth: 1,
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
  row: {
    flexDirection: "row",
  },
  math: {
    fontFamily: "kanit",
    fontSize: 80,
  },
  rule: {
    padding: 20,
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
  rows: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  animalcon: {
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 4,
    height: 140,
    width: 140,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    marginTop: 10,
  },
});
