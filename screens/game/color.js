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

export default function App({ navigation }) {
  var colorArray = [
    "#FF6633",
    "#FFB399",
    "#FF33FF",
    "#FFFF99",
    "#00B3E6",
    "#E6B333",
    "#3366E6",
    "#999966",
    "#99FF99",
    "#B34D4D",
    "#80B300",
    "#809900",
    "#E6B3B3",
    "#6680B3",
    "#66991A",
    "#FF99E6",
    "#CCFF1A",
    "#FF1A66",
    "#E6331A",
    "#33FFCC",
    "#66994D",
    "#B366CC",
    "#4D8000",
    "#B33300",
    "#CC80CC",
    "#66664D",
    "#991AFF",
    "#E666FF",
    "#4DB3FF",
    "#1AB399",
    "#E666B3",
    "#33991A",
    "#CC9999",
    "#B3B31A",
    "#00E680",
    "#4D8066",
    "#809980",
    "#E6FF80",
    "#1AFF33",
    "#999933",
    "#FF3380",
    "#CCCC00",
    "#66E64D",
    "#4D80CC",
    "#9900B3",
    "#E64D66",
    "#4DB380",
    "#FF4D4D",
    "#99E6E6",
    "#6666FF",
  ];
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  const [Penalty, setPenalty] = useState(0);
  const [color, setColor] = useState("white");
  const [count, setCount] = useState(0);
  const [GameText, setGameText] = useState("Press The box.");
  const [TextTime, setTextTime] = useState(0);
  const [timeStart, settimeStart] = useState(0);
  const [magic, setMagic] = useState("#E5E7E9");

  const startTheGame = async () => {
    var RandomNumber = 1000 + Math.random() * (5000 - 1000);
    const random = Math.floor(Math.random() * 50);
    setMagic("black");
    setGameText("Press the box When you see color.");
    await delay(RandomNumber);
    setColor(colorArray[random]);
    settimeStart(performance.now());
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
          // justifyContent: "center",
          top: "15%",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 30, fontWeight: "bold", color: magic }}>
          Avg Time: {((TextTime + Penalty) / count).toFixed(2)} ms{"\n"}
        </Text>
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
            const end = ((TextTime + Penalty) / 5).toFixed(2);
            if (timeStart === 0 && count > 0 && count < 6) {
              setGameText("Are you prefiring??? (Penalty +1s)");
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
              setGameText("END");
              return;
            }
          }}
        ></TouchableOpacity>
        <Text
          style={{
            alignSelf: "center",
            fontSize: 30,
            // fontWeight: "bold",
            color: "black",
            margin: 20,
          }}
        >
          {"\n"}
          {GameText}
        </Text>
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
    // marginHorizontal: 5,
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
