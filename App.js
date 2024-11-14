import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginCheck from "./screens/LoginCheck";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Register2 from "./screens/Register2";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
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
        {/* 다른 스크린들 */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
