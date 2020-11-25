import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { DATA } from "../data/data";

// import auth from "@react-native-firebase/auth";

const TypeItem = ({ id, title, onSelect, img, description }) => (
  <TouchableOpacity
    style={styles.gridItem}
    activeOpacity={0.8}
    onPress={() => onSelect()}
  >
    <View style={styles.containy}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Image style={styles.image} source={img} />
      </View>
      <View style={{ width: "70%" }}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

function index({ navigation }) {
  const renderItem = ({ item }) => (
    <TypeItem
      description={item.description}
      img={item.img}
      id={item.id}
      title={item.title}
      onSelect={() => {
        navigation.navigate(item.path);
      }}
    />
  );

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/background.jpg")}
        style={styles.bgimage}
      >
        <FlatList data={DATA} renderItem={renderItem} />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  containy: {
    flexDirection: "row",
    flex: 1,
    height: "100%",
    borderRadius: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
    padding: 15,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "white",
  },
  image: {
    resizeMode: "stretch",
    height: "50%",
    width: "75%",
  },
  bgimage: {
    flex: 1,
    resizeMode: "stretch",
  },
  gridItem: {
    flex: 1,
    margin: 10,
    marginLeft: 30,
    marginRight: 30,
    height: 150,
  },
  title: {
    fontFamily: "kanit",
    fontSize: 25,
  },
  description: {
    fontFamily: "kanit",
    fontSize: 15,
  },
});

export default index;
