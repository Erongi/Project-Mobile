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
import Modal from "react-native-modal";
import firebase from "firebase";
export default function App({ navigation }) {
  const [Page, setPage] = useState(0);
  const [First, setFirst] = useState("white");
  const [Second, setSecond] = useState("white");
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
    const randomT = Math.floor(Math.random() * 2);
    randomT === 0 ? setFirst("#1AFF33") : setFirst("#FF1A66");
    randomT === 1 ? setSecond("#1AFF33") : setSecond("#FF1A66");
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
        gameName: "Green",
      });
    // toggleModal();
    navigation.navigate("Vision");
  };

  const addScoreAndRetry = async () => {
    await firebase
      .firestore()
      .collection("score")
      .add({
        email: user,
        point: (Time / 10).toFixed(2),
        gameName: "Green",
      });
    navigation.replace("Green");
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
            Score : {Score - 1}
            {"\n"}
          </Text>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            style={{
              borderRadius: 10,
              alignItems: "center",
              backgroundColor: First,
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
              backgroundColor: Second,
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
        <View style={styles.rule}>
          <Text style={{ fontFamily: "kanit", fontSize: 25 }}>
            {"\n"}Select the green button.
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
  loginbt: {
    // flex: 1,
    backgroundColor: "white",
    // marginTop: "40%",
    // marginBottom: "40%",
    // marginLeft: "20%",
    // marginRight: "20%",
    width: "60%",
    height: "25%",
    borderRadius: 30,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "space-around",
    padding: "4%",
  },
  button: {
    // backgroundColor: "#0059ff",
    // fontSize: 20,
    // marginBottom: 100,
    // alignItems: "center",
    // justifyContent: "center",
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
    // flex: 1,
    // height: "100%",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
