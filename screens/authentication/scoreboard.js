import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ImageBackground,
  TextInput,
  ScrollView,
} from "react-native";
import firebase from "firebase";

export default function Scoreboard(hello) {
  const [scores, setScores] = useState([]);

  const user = firebase.auth().currentUser.email;
  // console.log(a);

  // const addScore = async () => {
  //   await firebase.firestore().collection("score").add({
  //     email: "adad",
  //     point: 5,
  //     gameName: "Color",
  //   });
  // };

  const showscore = async () => {
    const score = await firebase.firestore().collection("score").get();
    score.forEach((props) => {
      console.log(props.data());
      setScores((old) => {
        return [...old, props.data()];
      });
    });
  };

  useEffect(() => {
    showscore();
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* <Button
        title="eiei"
        onPress={() => {
          addScore();
        }}
      /> */}
        <Text style={styles.settext}>
          <Text style={{ color: "#d36764", fontSize: 30, fontFamily: "kanit" }}>
            React{" "}
          </Text>
          <Text style={{ color: "black", fontSize: 30, fontFamily: "kanit" }}>
            Reaction
          </Text>
        </Text>
        <View
          style={{
            borderColor: "black",
            borderWidth: 2,
            width: "80%",
            alignItems: "center",
            marginTop: 20,
            backgroundColor: "#D7BDE2",
          }}
        >
          <Text style={styles.headertext}>Score Board</Text>
        </View>
        {scores.map((data) => {
          if (data.email == user) {
            return (
              <View style={styles.containerData}>
                <View
                  style={{
                    borderColor: "black",
                    borderWidth: 2,
                    width: "50%",
                    backgroundColor: "white",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.scoretext}>{data.gameName}</Text>
                </View>
                <View
                  style={{
                    borderColor: "black",
                    borderWidth: 2,
                    width: "50%",
                    alignItems: "flex-end",
                    backgroundColor: "white",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.scoretext}>{data.point}</Text>
                </View>
              </View>
            );
          }
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#D0D3D4",
  },
  containerData: {
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  exitbt: {
    width: 25,
    height: 25,
    marginLeft: "10%",
    marginTop: "10%",
    marginRight: "90%",
    transform: [{ rotate: "180deg" }],
  },
  scoretext: {
    color: "black",
    padding: 10,
    fontFamily: "kanit",
    fontSize: 20,
  },
  settext: {
    marginTop: "2%",
  },
  headertext: {
    color: "black",
    fontWeight: "bold",
    padding: 10,
    fontFamily: "kanit",
    fontSize: 30,
  },
});
