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

export default function App({ navigation }) {
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
  const [isModalVisible, setModalVisible] = useState(false);

  const user = firebase.auth().currentUser.email;

  useEffect(() => {
    // Update the document title using the browser API
    CheckAns();
  }, [Ans]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const addScore = async () => {
    await firebase
      .firestore()
      .collection("score")
      .add({
        email: user,
        point: (Time / 5).toFixed(2),
        gameName: "Greater+",
      });
    navigation.navigate("Calculation");
  };

  const addScoreAndRetry = async () => {
    await firebase
      .firestore()
      .collection("score")
      .add({
        email: user,
        point: (Time / 5).toFixed(2),
        gameName: "Greater+",
      });
    navigation.replace("GreaterP");
  };

  const RandomProposition = async () => {
    const random1 = Math.floor(Math.random() * 4);
    const random2 = Math.floor(Math.random() * 4);
    const First01 = Math.floor(Math.random() * 99) + 1;
    const First02 = Math.floor(Math.random() * 99) + 1;
    const Second01 = Math.floor(Math.random() * 99) + 1;
    const Second02 = Math.floor(Math.random() * 99) + 1;
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
      if (Score === 5) {
        setTime(time);
        setPage(2);
        toggleModal();
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
    const Result1 = eval(First1 + Signarray1 + Second1);
    const Result2 = eval(First2 + Signarray2 + Second2);

    content = (
      <View
        style={{
          flex: 1,
          alignItems: "center",
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
              setAns(Result1);
            }}
          >
            <Text style={styles.math}>
              {First1} {Signarray1} {Second1}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.AnsBox}
            onPress={() => {
              setAns(Result2);
            }}
          >
            <Text style={styles.math}>
              {First2} {Signarray2} {Second2}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.rule}>
          <Text style={{ fontFamily: "kanit", fontSize: 25 }}>
            {"\n"}Select the highest value of proposition on your screen.
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
        <Modal isVisible={isModalVisible}>
          <View style={styles.loginbt}>
            <Text style={{ fontSize: 20, color: "black", fontFamily: "kanit" }}>
              End Game
            </Text>
            <Text>Score: {(Time / 5).toFixed(2)} ms</Text>

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
    fontSize: 30,
    fontWeight: "bold",
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
});
