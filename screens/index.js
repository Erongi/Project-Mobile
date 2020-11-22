import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { DATA } from "../data/data";

const TypeItem = ({ id, title, onSelect, img, description }) => (
  <TouchableOpacity
    style={styles.gridItem}
    activeOpacity={0.8}
    onPress={() => onSelect()}
  >
    <View style={styles.containy}>
      <Image style={styles.image} source={img} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
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
    flex: 1,
    borderRadius: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  image: {
    flex: 1,
    resizeMode: "stretch",
    width: "50%",
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
    height: 300,
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
