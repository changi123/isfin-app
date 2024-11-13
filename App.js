import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginCheck from "./screens/LoginCheck"; // LoginCheck 컴포넌트 import
import Login from "./screens/Login"; // Login 컴포넌트 import

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
        {/* 다른 스크린들 */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
