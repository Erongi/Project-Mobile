import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  Image,
} from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { Icon } from "react-native-elements";

import index from "../screens/index";
import vision from "../screens/vision";
import sense from "../screens/sense";
import hear from "../screens/hear";
import calculation from "../screens/calculation";

import Color from "../screens/game/color";
import Greater from "../screens/game/greater";
import GreaterP from "../screens/game/greaterP";
import Sounds from "../screens/game/sound";
import Maths from "../screens/game/math";
import Vibration from "../screens/game/vibration";
import Login from "../screens/authentication/login";
import Register from "../screens/authentication/register";
import Scoreboard from "../screens/authentication/scoreboard";

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
        })}
      />
    </Stack.Navigator>
  );
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
        options={{
          title: "Vision",

          headerStyle: {
            backgroundColor: "Transparent",
          },
          headerTitleStyle: {
            alignSelf: "center",
          },
        }}
      />
      <Stack.Screen
        name="Sense"
        component={sense}
        options={{
          title: "Touch / Feel",

          headerStyle: {
            backgroundColor: "Transparent",
          },
          headerTitleStyle: {
            alignSelf: "center",
          },
        }}
      />

      <Stack.Screen
        name="Hear"
        component={hear}
        options={{
          title: "Hearing",

          headerStyle: {
            backgroundColor: "Transparent",
          },
          headerTitleStyle: {
            alignSelf: "center",
          },
        }}
      />

      <Stack.Screen
        name="Calculation"
        component={calculation}
        options={{
          title: "Calculation",

          headerStyle: {
            backgroundColor: "Transparent",
          },
          headerTitleStyle: {
            alignSelf: "center",
          },
        }}
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
            <TouchableOpacity onPress={() => navigation.replace("Greater")}>
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
            <TouchableOpacity onPress={() => navigation.replace("GreaterP")}>
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
            <TouchableOpacity onPress={() => navigation.replace("Maths")}>
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
            <TouchableOpacity onPress={() => navigation.replace("Sounds")}>
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
            <TouchableOpacity onPress={() => navigation.replace("Vibration")}>
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
            <TouchableOpacity onPress={() => navigation.replace("Scoreboard")}>
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
          headerTitleStyle: {
            // alignSelf: "center",
          },
        })}
      />
    </Stack.Navigator>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator edgeWidth={0}>
      {/* <Drawer.Screen name="test" component={Test} /> */}
      <Drawer.Screen name="Home" component={GameNavigator} />
      <Drawer.Screen name="testa" component={Login} />
      <Drawer.Screen name="Register" component={Register} />
      <Drawer.Screen name="Score Board" component={ScoreNavigator} />
    </Drawer.Navigator>
  );
};

export { DrawerNavigator };
