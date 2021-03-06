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
  Picker,
} from "react-native";
import firebase from "firebase";

export default function Scoreboard(hello) {
  const [scores, setScores] = useState([]);
  const [selectedValue, setSelectedValue] = useState("All");
  const user = firebase.auth().currentUser.email;
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
        <Text style={styles.settext}>
          <Text style={{ color: "#d36764", fontSize: 30, fontFamily: "kanit" }}>
            React{" "}
          </Text>
          <Text style={{ color: "black", fontSize: 30, fontFamily: "kanit" }}>
            Reaction
          </Text>
        </Text>
        <Picker
          selectedValue={selectedValue}
          style={{ height: 50, width: 150 }}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        >
          <Picker.Item label="Select All" value="All" />
          <Picker.Item label="Color" value="Color" />
          <Picker.Item label="Green" value="Green" />
          <Picker.Item label="True Color" value="colorT" />
          <Picker.Item label="Vibration" value="Vibration" />
          <Picker.Item label="Sound" value="Sound" />
          <Picker.Item label="DOG&CAT" value="Dog" />
          <Picker.Item label="ZOO" value="Dog4" />
          <Picker.Item label="Math" value="Math" />
          <Picker.Item label="Greater" value="Greater" />
          <Picker.Item label="Greater+" value="Greater+" />
 
        </Picker>
        <View
          style={{
            borderColor: "black",
            borderWidth: 1,
            width: "80%",
            alignItems: "center",
            marginTop: 20,
            marginBottom: 20,
            backgroundColor: "#D7BDE2",
            borderRadius: 15,
          }}
        >
          <Text style={styles.headertext}>Score Board</Text>
        </View>
        {scores.map((data) => {
          if (data.email == user) {
            if (data.gameName == selectedValue) {
              return (
                <View style={styles.containerData}>
                  <View
                    style={{
                      borderColor: "black",
                      borderWidth: 1,
                      width: "50%",
                      backgroundColor: "white",
                      alignItems: "center",
                    }}
                  >
                    <Text style={styles.gametext}>{data.gameName}</Text>
                  </View>
                  <View
                    style={{
                      borderColor: "black",
                      borderWidth: 1,
                      width: "50%",
                      alignItems: "flex-end",
                      backgroundColor: "white",
                      alignItems: "center",
                    }}
                  >
                    <Text style={styles.scoretext}>{data.point} ms</Text>
                  </View>
                </View>
              );
            }
            if (selectedValue == "All") {
              return (
                <View style={styles.containerData}>
                  <View
                    style={{
                      borderColor: "black",
                      borderWidth: 1,
                      width: "50%",
                      backgroundColor: "white",
                      alignItems: "center",
                    }}
                  >
                    <Text style={styles.gametext}>{data.gameName}</Text>
                  </View>
                  <View
                    style={{
                      borderColor: "black",
                      borderWidth: 1,
                      width: "50%",
                      alignItems: "flex-end",
                      backgroundColor: "white",
                      alignItems: "center",
                    }}
                  >
                    <Text style={styles.scoretext}>{data.point} ms</Text>
                  </View>
                </View>
              );
            }
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
  gametext: {
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
