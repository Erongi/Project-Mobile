import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  AppRegistry,
  StyleSheet,
  Image,
  ImageBackground,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Swiper from "react-native-swiper/src";

const renderPagination = (index, total, context) => {
  return (
    <View style={styles.paginationStyle}>
      <Text style={{ color: "grey" }}>
        <Text style={styles.paginationText}>{index + 1}</Text>/{total}
      </Text>
    </View>
  );
};

function calculation({ navigation }) {
  return (
    <ImageBackground
      source={require("../assets/background.jpg")}
      style={styles.bgimage}
    >
      <View style={{ flex: 1, alignItems: "center" }}>
        <View style={{ width: "90%", height: "90%", marginTop: "10%" }}>
          <Swiper
            style={styles.wrapper}
            showsButtons={true}
          >
            <View style={styles.slide1}>
              <TouchableOpacity
                style={styles.container}
                onPress={() => navigation.navigate("Maths")}
              >
                <Image
                  source={require("../assets/game/math.png")}
                  style={styles.image}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.slide2}>
              <TouchableOpacity
                style={styles.container}
                onPress={() => navigation.navigate("Greater")}
              >
                <Image
                  source={require("../assets/game/greater.png")}
                  style={styles.image}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.slide3}>
              <TouchableOpacity
                style={styles.container}
                onPress={() => navigation.navigate("GreaterP")}
              >
                <Image
                  source={require("../assets/game/greaterP.png")}
                  style={styles.image}
                />
              </TouchableOpacity>
            </View>
          </Swiper>
        </View>
      </View>
    </ImageBackground>
  );
}
AppRegistry.registerComponent("myproject", () => SwiperComponent);

const styles = StyleSheet.create({
  container: {
    width: 400,
    height: 500,
    justifyContent: "center",
    alignItems: "center",
  },
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  slide3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "90%",
    height: "100%",
    resizeMode: "stretch",
  },
  paginationStyle: {
    left: "90%",
  },
  bgimage: {
    flex: 1,
    resizeMode: "stretch",
  },
});
export default calculation;
