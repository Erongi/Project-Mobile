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
  var colorArray = ["RED", "GREEN", "BLUE", "YELLOW"];
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  const [Color, setColor] = useState("");
  const [Page, setPage] = useState(0);
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

  const RandomProposition = () => {
    const randomT = Math.floor(Math.random() * 4);
    setColor(colorArray[randomT]);
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
        point: (Time / 10).toFixed(2),
        gameName: "colorT",
      });
    navigation.navigate("Vision");
  };

  const addScoreAndRetry = async () => {
    await firebase
      .firestore()
      .collection("score")
      .add({
        email: user,
        point: (Time / 10).toFixed(2),
        gameName: "colorT",
      });
    navigation.replace("ColorT");
  };

  const CheckAns = () => {
    const NewScore = Score + 1;
    const NewPenalty = Penalty + 1;
    const time = Math.abs(performance.now() - TimeStart);

    if (Ans === RealAns) {
      setScore(NewScore);
      if (Score === 10) {
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
    content = (
      <View
        style={{
          flex: 1,
          alignItems: "center",
        }}
      >
        <View>
          <Text style={{ fontFamily: "kanit", fontSize: 30 }}>
            {"\n"}
            Score : {Score - 1}
            {"\n"}
            SELECT : {Color}
          </Text>
        </View>
        <View>
          <View style={styles.row}>
            <TouchableOpacity
              style={{
                borderRadius: 10,
                alignItems: "center",
                backgroundColor: "#FF1A66",
                borderColor: "black",
                borderWidth: 4,
                height: 140,
                width: 140,
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 10,
                marginTop: 10,
              }}
              onPress={() => {
                setAns(0);
                CheckAns();
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              style={{
                borderRadius: 10,
                alignItems: "center",
                backgroundColor: "#00E680",
                borderColor: "black",
                borderWidth: 4,
                height: 140,
                width: 140,
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 10,
                marginTop: 10,
              }}
              onPress={() => {
                setAns(1);
                CheckAns();
              }}
            ></TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity
              style={{
                borderRadius: 10,
                alignItems: "center",
                backgroundColor: "#4D80CC",
                borderColor: "black",
                borderWidth: 4,
                height: 140,
                width: 140,
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 10,
                marginTop: 10,
              }}
              onPress={() => {
                setAns(2);
                CheckAns();
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              style={{
                borderRadius: 10,
                alignItems: "center",
                backgroundColor: "#FFFF99",
                borderColor: "black",
                borderWidth: 4,
                height: 140,
                width: 140,
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 10,
                marginTop: 10,
              }}
              onPress={() => {
                setAns(3);
                CheckAns();
              }}
            ></TouchableOpacity>
          </View>
        </View>
        <View style={styles.rule}>
          <Text style={{ fontFamily: "kanit", fontSize: 25 }}>
            {"\n"}Select the button same color
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
