import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import styles from "../assets/css/LoginStyles";
function Login() {
  const navigation = useNavigation();
  const localIp = "https://free-maps-build.loca.lt";
  //   // 로그인 타입 상태
  const [loginType, setLoginType] = useState("parent");

  //   // 부모 로그인 시 사용할 아이디 상태
  const [parentId, setParentId] = useState("");

  //   // 아이 로그인 시 사용할 아이디 상태
  const [childId, setChildId] = useState("");

  //   // 비밀번호 상태
  const [password, setPassword] = useState("");

  //   // 라디오 버튼이 체크될 때 해당 입력 필드의 값을 공백으로 초기화
  const handleRadioChange = (type) => {
    if (type === "parent") {
      setParentId("");
    } else if (type === "child") {
      setChildId("");
    }
    setPassword("");
    setLoginType(type);
  };

  // 부모 로그인 처리
  const handleParentLogin = async () => {
    try {
      const loginData = { parentId, password };

      if (parentId.length === 0 || password.length === 0) {
        Alert.alert(
          "알림",
          "모든 항목을 입력해주세요.",
          [{ text: "확인", onPress: () => console.log("확인 클릭") }],
          { cancelable: false }
        );
        return;
      }

      const response = await axios.post(
        localIp + "/parents/login", // 백엔드 서버의 주소

        loginData
      );

      // 로그인 성공 후의 처리
      if (response.data) {
        // AsyncStorage에 사용자 정보 저장
        await AsyncStorage.setItem("user", JSON.stringify(response.data));
        navigation.navigate("IsfinMain");
      } else {
        Alert.alert(
          "알림",
          "아이디 또는 비밀번호를 확인해주세요.",
          [{ text: "확인", onPress: () => console.log("확인 클릭") }],
          { cancelable: false }
        );
      }
    } catch (error) {
      // 로그인 실패 후의 처리
      Alert.alert(
        "로그인 실패1",
        "서버 오류가 발생했습니다. 다시 시도해주세요."[
          { text: "확인", onPress: () => console.log("확인 클릭") }
        ]
      );
    }
  };

  // 아이 로그인 처리
  const handleChildLogin = async () => {
    try {
      const loginData = { childId, password };

      if (childId.length === 0 || password === 0) {
        Alert.alert(
          "알림",
          "모든 항목을 입력해주세요.",
          [{ text: "확인", onPress: () => console.log("확인 클릭") }],
          { cancelable: false }
        );
        return;
      }

      const response = await axios.post(
        localIp + "/children/login", // 백엔드 서버의 주소
        loginData
      );

      // 로그인 성공 후의 처리
      if (response.data) {
        // AsyncStorage에 사용자 정보 저장
        await AsyncStorage.setItem("user", JSON.stringify(response.data));
        navigation.navigate("IsfinMain");
      } else {
        Alert.alert(
          "알림",
          "아이디 또는 비밀번호를 확인해주세요.",
          [{ text: "확인", onPress: () => console.log("확인 클릭") }],
          { cancelable: false }
        );
      }
    } catch (error) {
      // 로그인 실패 후의 처리
      Alert.alert(
        "로그인 실패",
        "서버 오류가 발생했습니다. 다시 시도해주세요.",
        [{ text: "확인", onPress: () => console.log("확인 클릭") }]
      );
    }
  };

  //   // 로그인 버튼 클릭 시
  const handleButtonClick = () => {
    if (loginType === "parent") {
      handleParentLogin(); // 부모 로그인 처리
    } else if (loginType === "child") {
      handleChildLogin(); // 아이 로그인 처리
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>로그인</Text>
      <Text style={styles.subHeader}>아이디와 비밀번호를 입력하세요</Text>

      <View style={styles.radioContainer}>
        <View style={styles.radioWrapper}>
          <Button
            title="부모 로그인"
            onPress={() => handleRadioChange("parent")}
            color={loginType === "parent" ? "#007bff" : "#ccc"}
          />
        </View>
        <View style={styles.radioWrapper}>
          <Button
            title="아이 로그인"
            onPress={() => handleRadioChange("child")}
            color={loginType === "child" ? "#007bff" : "#ccc"}
          />
        </View>
      </View>

      <TextInput
        placeholder="아이디"
        style={styles.input}
        value={loginType === "parent" ? parentId : childId}
        onChangeText={(text) =>
          loginType === "parent" ? setParentId(text) : setChildId(text)
        }
      />
      <TextInput
        placeholder="비밀번호"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <View style={styles.buttonContainer}>
        <Button title="로그인" onPress={handleButtonClick} />
      </View>
    </View>
  );
}

export default Login;
