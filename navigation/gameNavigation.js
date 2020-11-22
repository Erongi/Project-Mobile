import React from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";

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

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const GameNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="index"
        component={index}
        options={({ navigation }) => ({
          title: "React Reaction Time",

          headerStyle: {
            backgroundColor: "Transparent",
          },
          headerTitleStyle: {
            // alignSelf: "center",
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
            <TouchableOpacity onPress={() => navigation.navigate("index")}>
              <Icon name="list" />
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
            <TouchableOpacity onPress={() => navigation.navigate("index")}>
              <Icon name="list" />
            </TouchableOpacity>
          ),
        })}
      />

      <Stack.Screen
        name="GreaterP"
        component={GreaterP}
        options={({ navigation }) => ({
          title: "GreaterP",

          headerStyle: {
            backgroundColor: "Transparent",
          },
          headerTitleStyle: {
            alignSelf: "center",
          },
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate("index")}>
              <Icon name="list" />
            </TouchableOpacity>
          ),
        })}
      />

      <Stack.Screen
        name="Maths"
        component={Maths}
        options={({ navigation }) => ({
          title: "Maths",

          headerStyle: {
            backgroundColor: "Transparent",
          },
          headerTitleStyle: {
            alignSelf: "center",
          },
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate("index")}>
              <Icon name="list" />
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
            <TouchableOpacity onPress={() => navigation.navigate("index")}>
              <Icon name="list" />
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
            <TouchableOpacity onPress={() => navigation.navigate("index")}>
              <Icon name="list" />
            </TouchableOpacity>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="test" component={GameNavigator} />
    </Drawer.Navigator>
  );
};

export { DrawerNavigator };
