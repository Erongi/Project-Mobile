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
  const mathsignarray = ["+", "-", "*", "/"];
  const [First1, setFirst1] = useState(0);
  const [Second1, setSecond1] = useState(0);
  const [Signarray1, setSignarray1] = useState("");

  const [First2, setFirst2] = useState(0);
  const [Second2, setSecond2] = useState(0);
  const [Signarray2, setSignarray2] = useState("");

  const [RealAns, setRealAns] = useState(0);

  const [Ans, setAns] = useState(0);

  const [TimeStart, setTimeStart] = useState(0);
  const [Time, setTime] = useState(0);
  const [Score, setScore] = useState(0);
  const [Penalty, setPenalty] = useState(0);

  const RandomProposition = async () => {
    const random1 = Math.floor(Math.random() * 4);
    const random2 = Math.floor(Math.random() * 4);
    const First01 = Math.floor(Math.random() * 100) + 1;
    const First02 = Math.floor(Math.random() * 100) + 1;
    const Second01 = Math.floor(Math.random() * 100) + 1;
    const Second02 = Math.floor(Math.random() * 100) + 1;
    const Ans01 = eval(First01 + mathsignarray[random1] + Second01);
    const Ans02 = eval(First02 + mathsignarray[random2] + Second02);
    Ans01 > Ans02 ? setRealAns(Ans01) : setRealAns(Ans02);
    setFirst1(First01);
    setSecond1(Second01);
    setFirst2(First02);
    setSecond2(Second02);
    setSignarray1(mathsignarray[random1]);
    setSignarray2(mathsignarray[random2]);
  };

  const CheckAns = () => {
    const NewScore = Score + 1;
    const NewPenalty = Penalty + 1;
    const time = Math.abs(performance.now() - TimeStart);
    if (Ans === RealAns) {
      setScore(NewScore);
      if (Score === 4) {
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
    const Result1 = eval(First1 + Signarray1 + Second1);
    const Result2 = eval(First2 + Signarray2 + Second2);

    content = (
      <View>
        <View>
          {/* <Text>Time:{Time}</Text> */}
          <Text>Score:{Score}</Text>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.AnsBox}
            onPress={() => {
              setAns(Result1);
              CheckAns();
            }}
          >
            <Text>
              {First1} {Signarray1} {Second1}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.AnsBox}
            onPress={() => {
              setAns(Result2);
              CheckAns();
            }}
          >
            <Text>
              {First2} {Signarray2} {Second2}
            </Text>
          </TouchableOpacity>
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
          END
        </Text>
        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",
          }}
        >
          Avg Time : {(Time / 5).toFixed(2)} ms
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
    backgroundColor: "yellow",
    borderColor: "black",
    borderWidth: 1,
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
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
    // marginTop: Constants.statusBarHeight,
  },
  scrollView: {
    backgroundColor: "white",
    marginHorizontal: 5,
    width: "90%",
  },
  row: {
    // flex: 1,
    // bottom: 50,
    flexDirection: "row",
    // position: "absolute",
  },
});
