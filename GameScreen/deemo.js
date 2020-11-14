import React, { useState } from "react";
import Constants from "expo-constants";
import {
  Button,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Vibration,
  ScrollView,
  SafeAreaView,
} from "react-native";

export default function App() {
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  // const [Random, setRandom] = useState(0);
  const [count, setCount] = useState(0);
  const [status, setStatus] = useState(0);
  const [Time, setTime] = useState(0);
  const [TextGame, setTextGame] = useState("START THE GAME");
  const [TextTime, setTextTime] = useState(0);

  // const TimeCount = () => {
  //   var count = 0;
  //   setInterval(() => {
  //     count = count + 1;
  //     setCount(count);
  //     if (count > 60000) {
  //       return;
  //     }
  //   }, 1);
  // };
  // const AutoStop = async () => {
  //   var timeLeft = Random - count * 15;
  //   console.log(timeLeft);
  //   console.log(count * 15);
  //   await delay(timeLeft);
  //   Vibration.cancel();
  // };
  const TimeStart = () => {
    setTime(0);
    let Num = 0;
    setInterval(() => {
      Num = Num + 1;
      setTime(Num);
      if (Num > 10000) {
        return;
      }
    }, 10);
  };

  const TimeStop = () => {
    console.log("TimeThisRound : " + Time / 100 + "S");
    var time = Time / 100;
    setTextTime((x) => x + time);
    console.log("Time : " + TextTime + "s");
  };

  const startTheGame = async () => {
    let Count = count;
    setCount(Count + 1);
    console.log("count" + Count);
    var RandomNumber = 1000 + Math.random() * (5000 - 1000);
    console.log(RandomNumber);
    // setRandom(RandomNumber);
    await delay(RandomNumber);

    TimeStart();
    Vibration.vibrate(5000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text>Helo</Text>
        <Text>Time : {TextTime}</Text>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.gameCon}
          onPress={() => {
            if (status == 1) {
              if (Time == 0) {
                setTextGame("Are you prefiring???");
                return;
              }
              Vibration.cancel();
              TimeStop();
              if (count < 3) {
                startTheGame();
              }
              if (count === 3) {
                setTextGame("TRY AGAIN?");
                setTextTime(TextTime / 100);
              }
            }
            if (status == 0) {
              setTextGame("Press here When you feel vibration");
              setStatus(1);
              startTheGame();
            }
          }}
        >
          <Text style={{ color: "white", fontSize: 35, fontWeight: "bold" }}>
            {TextGame}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "gray",
    alignItems: "center",
    justifyContent: "center",
    marginTop: Constants.statusBarHeight,
  },
  gameCon: {
    flex: 1,
    height: 350,
    width: 350,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
  scrollView: {
    backgroundColor: "pink",
    marginHorizontal: 10,
  },
});
