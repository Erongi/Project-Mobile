import React, { useEffect, useState } from "react";
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
  const [First, setFirst] = useState(0);
  const [Second, setSecond] = useState(0);
  const [Signarray, setSignarray] = useState("");
  const [Ans, setAns] = useState(0);
  const [RealAns, setRealAns] = useState(0);
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
        gameName: "Math Sign",
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
        gameName: "Math Sign",
      });
    navigation.replace("Maths");
  };

  const RandomProposition = async () => {
    const random = Math.floor(Math.random() * 4);
    setFirst(Math.floor(Math.random() * 50) + 1);
    setSecond(Math.floor(Math.random() * 50) + 1);
    setSignarray(mathsignarray[random]);
    setRealAns(random);
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
        toggleModal();
      }
      RandomProposition();
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
    const Result = eval(First + Signarray + Second);
    content = (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <View>
          <Text style={{ fontFamily: "kanit", fontSize: 35 }}>
            {"\n"}
            Score:{Score}
            {"\n"}
          </Text>
        </View>
        <View style={styles.proposition}>
          <Text
            style={{ fontFamily: "kanit", fontSize: 35, fontWeight: "bold" }}
          >
            {First} 🔲 {Second} = {Result.toFixed(2)} {"\n"}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
          }}
        >
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.AnsBox}
              onPress={() => {
                setAns(0);
              }}
            >
              <Text style={styles.mathsign}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.AnsBox}
              onPress={() => {
                setAns(1);
              }}
            >
              <Text style={styles.mathsign}>-</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.AnsBox}
              onPress={() => {
                setAns(2);
              }}
            >
              <Text style={styles.mathsign}>x</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.AnsBox}
              onPress={() => {
                setAns(3);
              }}
            >
              <Text style={styles.mathsign}>÷</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  if (Page === 2) {
    const Result = eval(First + Signarray + Second);
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
    backgroundColor: "#DDDDDD",
    borderColor: "black",
    borderWidth: 1,
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
    justifyContent: "space-around",
  },
  mathsign: {
    fontFamily: "kanit",
    fontSize: 80,
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
