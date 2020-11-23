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
  CheckBox,
} from "react-native";

export default function App() {
  const [Page, setPage] = useState(0);
  const colorarray = ["red", "green", "blue"];
  const [First, setFirst] = useState(0);
  const [Second, setSecond] = useState(0);
  const [Signarray, setSignarray] = useState("");
  const [Ans, setAns] = useState(0);
  const [RealAns, setRealAns] = useState(0);
  const [TimeStart, setTimeStart] = useState(0);
  const [Time, setTime] = useState(0);
  const [Score, setScore] = useState(0);
  const [Penalty, setPenalty] = useState(0);

  const RandomProposition = () => {
    const randomf = Math.floor(Math.random() * 100) + 1;
    const randoms = Math.floor(Math.random() * 100) + 1;
    randomf === randoms ? setSecond(randoms + 1) : setSecond(randoms);
    setFirst(randomf);
    randomf > randoms ? setRealAns(randomf) : setRealAns(randoms);

    // setSignarray(mathsignarray[random]);
    // setRealAns(random);
  };

  const CheckAns = () => {
    const NewScore = Score + 1;
    const NewPenalty = Penalty + 1;
    const time = Math.abs(performance.now() - TimeStart);
    if (Ans === RealAns) {
      setScore(NewScore);
      if (Score === 9) {
        setTime(time);
        setPage(2);
      }
      RandomProposition();
    } else {
      setPenalty(NewPenalty);
    }
  };

  let content = (
    <TouchableOpacity
      //   activeOpacity={1}
      style={{
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
        width: "90%",
        height: "45%",
        borderColor: "black",
        borderWidth: 4,
      }}
      onPress={() => {
        setPage(1);
        setTimeStart(performance.now());
        RandomProposition();
        // startTheGame();
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
          // justifyContent: "center",
          // marginTop: Constants.statusBarHeight,
          alignItems: "center",
          // justifyContent: "space-around",
        }}
      >
        <View>
          <Text style={{ fontFamily: "kanit", fontSize: 50 }}>
            {"\n"}
            Score : {Score}
            {"\n"}
          </Text>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.AnsBox}
            onPress={() => {
              setAns(First);
              CheckAns();
            }}
          >
            <Text style={styles.math}>{First}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.AnsBox}
            onPress={() => {
              setAns(Second);
              CheckAns();
            }}
          >
            <Text style={styles.math}>{Second}</Text>
          </TouchableOpacity>
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
    fontFamily: "kanit",
    alignItems: "center",
    backgroundColor: "#fd3a69",
    // padding: 10,
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
    // top: 150,
    // flex: 1,
    borderColor: "black",
    borderWidth: 1,
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
  row: {
    // flex: 1,
    // bottom: 50,
    flexDirection: "row",
    // position: "absolute",
  },
  math: {
    fontFamily: "kanit",
    fontSize: 80,
  },
  rule: {
    padding: 20,
  },
});
