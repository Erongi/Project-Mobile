import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  Image,
} from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import firebase from "firebase";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { Icon } from "react-native-elements";

import index from "../screens/index";
import vision from "../screens/vision";
import sense from "../screens/sense";
import hear from "../screens/hear";
import calculation from "../screens/calculation";

import Color from "../screens/game/color";
import ColorT from "../screens/game/colorT";
import Greater from "../screens/game/greater";
import GreaterP from "../screens/game/greaterP";
import Sounds from "../screens/game/sound";
import Maths from "../screens/game/math";
import Vibration from "../screens/game/vibration";
import Login from "../screens/authentication/login";
import Register from "../screens/authentication/register";
import Scoreboard from "../screens/authentication/scoreboard";
import Green from "../screens/game/green";
import Dog from "../screens/game/dog";
import Dog4 from "../screens/game/dog4";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const ScoreNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Scoreboard"
        component={Scoreboard}
        options={({ navigation }) => ({
          title: " ",

          headerStyle: {
            backgroundColor: "Transparent",
          },
          headerTitleStyle: {
            fontFamily: "kanit",
            fontSize: 26,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.openDrawer()}
              style={{ marginLeft: 20 }}
            >
              <Icon name="list" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.replace("Scoreboard")}
              style={{ marginRight: 20 }}
            >
              <Icon name="refresh" />
            </TouchableOpacity>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

const logout = (props) => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      alert("Logout Success!");
      props.navigation.navigate("Login");
    })
    .catch((error) => {
      if (error.code === "auth/invalid-email") {
        console.log("That email address is invalid!");
        alert("That email address is invalid!");
      } else {
        alert("Your email or password is invalid.");
      }
      // console.error(error);
      toggleModal();
    });
};

const GameNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        option={{ headerShown: false }}
      />

      <Stack.Screen
        name="index"
        component={index}
        options={({ navigation }) => ({
          title: "React Reaction Time",

          headerStyle: {
            backgroundColor: "Transparent",
          },
          headerTitleStyle: {
            fontFamily: "kanit",
            fontSize: 26,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.openDrawer()}
              style={{ marginLeft: 20 }}
            >
              <Icon name="list" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="Vision"
        component={vision}
        options={({ navigation }) => ({
          title: "Vision",

          headerStyle: {
            backgroundColor: "Transparent",
          },
          headerTitleStyle: {
            alignSelf: "center",
          },
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Scoreboard")}
              style={{ marginRight: 20 }}
            >
              <Icon name="assessment" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="Sense"
        component={sense}
        options={({ navigation }) => ({
          title: "Touch / Feel",

          headerStyle: {
            backgroundColor: "Transparent",
          },
          headerTitleStyle: {
            alignSelf: "center",
          },
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Scoreboard")}
              style={{ marginRight: 20 }}
            >
              <Icon name="assessment" />
            </TouchableOpacity>
          ),
        })}
      />

      <Stack.Screen
        name="Hear"
        component={hear}
        options={({ navigation }) => ({
          title: "Hearing",

          headerStyle: {
            backgroundColor: "Transparent",
          },
          headerTitleStyle: {
            alignSelf: "center",
          },
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Scoreboard")}
              style={{ marginRight: 20 }}
            >
              <Icon name="assessment" />
            </TouchableOpacity>
          ),
        })}
      />

      <Stack.Screen
        name="Calculation"
        component={calculation}
        options={({ navigation }) => ({
          title: "Calculation",

          headerStyle: {
            backgroundColor: "Transparent",
          },
          headerTitleStyle: {
            alignSelf: "center",
          },
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Scoreboard")}
              style={{ marginRight: 20 }}
            >
              <Icon name="assessment" />
            </TouchableOpacity>
          ),
        })}
      />

      <Stack.Screen
        name="Color"
        component={Color}
        options={({ navigation }) => ({
          title: "Color",

          headerStyle: {
            backgroundColor: "Transparent",
          },
          headerTitleStyle: {
            alignSelf: "center",
          },
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 20 }}
              onPress={() => navigation.replace("Color")}
            >
              <Icon name="refresh" />
            </TouchableOpacity>
          ),
        })}
      />

      <Stack.Screen
        name="ColorT"
        component={ColorT}
        options={({ navigation }) => ({
          title: "TRUE COLOR",

          headerStyle: {
            backgroundColor: "Transparent",
          },
          headerTitleStyle: {
            alignSelf: "center",
          },
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 20 }}
              onPress={() => navigation.replace("ColorT")}
            >
              <Icon name="refresh" />
            </TouchableOpacity>
          ),
        })}
      />

      <Stack.Screen
        name="Green"
        component={Green}
        options={({ navigation }) => ({
          title: "Green",

          headerStyle: {
            backgroundColor: "Transparent",
          },
          headerTitleStyle: {
            alignSelf: "center",
          },
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 20 }}
              onPress={() => navigation.replace("Green")}
            >
              <Icon name="refresh" />
            </TouchableOpacity>
          ),
        })}
      />

      <Stack.Screen
        name="Dog"
        component={Dog}
        options={({ navigation }) => ({
          title: "Dog & Cat",

          headerStyle: {
            backgroundColor: "Transparent",
          },
          headerTitleStyle: {
            alignSelf: "center",
          },
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 20 }}
              onPress={() => navigation.replace("Dog")}
            >
              <Icon name="refresh" />
            </TouchableOpacity>
          ),
        })}
      />

      <Stack.Screen
        name="Dog4"
        component={Dog4}
        options={({ navigation }) => ({
          title: "Dog & Cat & Elephant & Bird",

          headerStyle: {
            backgroundColor: "Transparent",
          },
          headerTitleStyle: {
            alignSelf: "center",
          },
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 20 }}
              onPress={() => navigation.replace("Dog4")}
            >
              <Icon name="refresh" />
            </TouchableOpacity>
          ),
        })}
      />

      <Stack.Screen
        name="Greater"
        component={Greater}
        options={({ navigation }) => ({
          title: "Greater",

          headerStyle: {
            backgroundColor: "Transparent",
          },
          headerTitleStyle: {
            alignSelf: "center",
          },
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 20 }}
              onPress={() => navigation.replace("Greater")}
            >
              <Icon name="refresh" />
            </TouchableOpacity>
          ),
        })}
      />

      <Stack.Screen
        name="GreaterP"
        component={GreaterP}
        options={({ navigation }) => ({
          title: "Greater+",

          headerStyle: {
            backgroundColor: "Transparent",
          },
          headerTitleStyle: {
            alignSelf: "center",
          },
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 20 }}
              onPress={() => navigation.replace("GreaterP")}
            >
              <Icon name="refresh" />
            </TouchableOpacity>
          ),
        })}
      />

      <Stack.Screen
        name="Maths"
        component={Maths}
        options={({ navigation }) => ({
          title: "Math Sign",

          headerStyle: {
            backgroundColor: "Transparent",
          },
          headerTitleStyle: {
            alignSelf: "center",
          },
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 20 }}
              onPress={() => navigation.replace("Maths")}
            >
              <Icon name="refresh" />
            </TouchableOpacity>
          ),
        })}
      />

      <Stack.Screen
        name="Sounds"
        component={Sounds}
        options={({ navigation }) => ({
          title: "Sounds",

          headerStyle: {
            backgroundColor: "Transparent",
          },
          headerTitleStyle: {
            alignSelf: "center",
          },
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 20 }}
              onPress={() => navigation.replace("Sounds")}
            >
              <Icon name="refresh" />
            </TouchableOpacity>
          ),
        })}
      />

      <Stack.Screen
        name="Vibration"
        component={Vibration}
        options={({ navigation }) => ({
          title: "Vibration",

          headerStyle: {
            backgroundColor: "Transparent",
          },
          headerTitleStyle: {
            alignSelf: "center",
          },
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 20 }}
              onPress={() => navigation.replace("Vibration")}
            >
              <Icon name="refresh" />
            </TouchableOpacity>
          ),
        })}
      />

      <Stack.Screen
        name="Scoreboard"
        component={Scoreboard}
        options={({ navigation }) => ({
          title: "Scoreboard",

          headerStyle: {
            backgroundColor: "Transparent",
          },
          headerTitleStyle: {
            alignSelf: "center",
          },
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 20 }}
              onPress={() => navigation.replace("Scoreboard")}
            >
              <Icon name="refresh" />
            </TouchableOpacity>
          ),
        })}
      />

      <Stack.Screen
        name="Register"
        component={Register}
        options={({ navigation }) => ({
          title: "Register",

          headerStyle: {
            backgroundColor: "Transparent",
          },
        })}
      />
    </Stack.Navigator>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      edgeWidth={0}
      drawerContent={(props) => {
        return (
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem
              labelStyle={{ color: "red" }}
              label="Logout"
              onPress={() => logout(props)}
            />
          </DrawerContentScrollView>
        );
      }}
    >
      <Drawer.Screen name="Home" component={GameNavigator} />
      <Drawer.Screen name="Score Board" component={ScoreNavigator} />
    </Drawer.Navigator>
  );
};

export { DrawerNavigator };
