import React, { useState, useEffect } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { View, Button, Alert, StyleSheet, StatusBar } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginCheck from "./screens/LoginCheck";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Register2 from "./screens/Register2";
import IsfinMain from "./screens/IsfinMain";
import CardMain from "./screens/CardMain";
import CardRegister from "./screens/CardRegister";
import CardRegisterInfo from "./screens/CardRegisterInfo";
import Account from "./screens/Account";
import MissionPage from "./screens/MissionPage";
import MissionMake from "./screens/MissionMake";
import QuizMain from "./screens/QuizMain";
import QuizFirst from "./screens/QuizFirst";
import QuizSecond from "./screens/QuizSecond";
import QuizThird from "./screens/QuizThird";
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="default" />
        <Stack.Navigator>
          <Stack.Screen
            name="LoginCheck"
            component={LoginCheck}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register2"
            component={Register2}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="IsfinMain"
            component={IsfinMain}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="card"
            component={CardMain}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CardRegister"
            component={CardRegister}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CardRegisterInfo"
            component={CardRegisterInfo}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Account"
            component={Account}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MissionPage"
            component={MissionPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MissionMake"
            component={MissionMake}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="QuizMain"
            component={QuizMain}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="QuizFirst"
            component={QuizFirst}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="QuizSecond"
            component={QuizSecond}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="QuizThird"
            component={QuizThird}
            options={{ headerShown: false }}
          />
          {/* 다른 스크린들 */}
        </Stack.Navigator>
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  logoutButtonContainer: {
    padding: 10,
    backgroundColor: "#f8f8f8",
  },
});
