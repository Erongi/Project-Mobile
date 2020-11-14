import React, { useEffect, useState } from "react";
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
  const [Penalty, setPenalty] = useState(0);
  const [color, setColor] = useState("white");
  const [count, setCount] = useState(0);
  const [GameText, setGameText] = useState("Press Me");
  const [TextTime, setTextTime] = useState(0);
  const [timeStart, settimeStart] = useState(0);
  const [secondNumber, setSecondNumber] = useState(0);
  const [firstNumber, setFirstNumber] = useState(0);
  const [Ans, setAns] = useState(0);
  const mathsign = ["+", "-", "*", "/"];

  const startTheGame = async () => {
    var RandomTime = 1000 + Math.random() * (5000 - 1000);
    setGameText("Select your Ans");
    await delay(RandomTime);
    var randomMathsign = Math.floor(Math.random() * 4);
    var firstNumber = Math.floor(Math.random() * 20);
    var secondNumber = Math.floor(Math.random() * 20);
    setFirstNumber(firstNumber);
    setSecondNumber(secondNumber);
    settimeStart(performance.now());
    var ans = eval(firstNumber + mathsign[randomMathsign] + secondNumber);
    setAns(ans);
  };

  const stopTheGame = () => {
    setColor("white");
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
        <TouchableOpacity
          activeOpacity={1}
          style={{
            backgroundColor: color,
            alignItems: "center",
            justifyContent: "center",
            width: "90%",
            height: "45%",
            borderColor: "black",
            borderWidth: 4,
          }}
          onPress={() => {
            if (timeStart === 0 && count > 0 && count < 6) {
              setGameText("Miss");
              setPenalty((x) => x + 1);
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
              setGameText("END");
              return;
            }
          }}
        >
          <Text style={{ color: "black", fontSize: 35, fontWeight: "bold" }}>
            {GameText}
          </Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 30, fontWeight: "bold" }}>
          Avg Time : {((TextTime + Penalty) / 5).toFixed(2)} ms⬚
        </Text>
        <Text style={{ fontSize: 30, fontWeight: "bold" }}>
          {firstNumber} ⬚ {secondNumber} = {Ans}
        </Text>
      </ScrollView>
      <View style={styles.navbar}>
        <Text style={{ fontWeight: "bold", fontSize: 25, color: "pink" }}>
          MATH
        </Text>
      </View>
      <View style={styles.bottombar}>
        <Button title="+" />
        <Button title="-" />
        <Button title="x" />
        <Button title="÷" />
      </View>
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
    marginTop: Constants.statusBarHeight,
  },
  scrollView: {
    backgroundColor: "white",
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
});
