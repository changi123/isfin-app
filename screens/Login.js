import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
// import Swal from "sweetalert2";

function Login() {
  const navigation = useNavigation();

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
        "http://172.30.1.94:8080/parents/login", // 백엔드 서버의 주소
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
        "http://172.30.1.94:8080/children/login", // 백엔드 서버의 주소
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20, // 좌우 여백 추가
    backgroundColor: "#f4f4f4", // 배경 색상
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#00085a", // 헤더 텍스트 색상
    marginBottom: 10, // 아래쪽 간격
  },
  subHeader: {
    fontSize: 16,
    color: "#555", // 서브 헤더 텍스트 색상
    marginBottom: 20, // 아래쪽 간격
  },
  radioContainer: {
    flexDirection: "row", // 라디오 버튼들을 가로로 배치
    justifyContent: "center", // 가로 중앙 정렬
    marginBottom: 20, // 라디오 버튼과 인풋 사이의 간격
  },
  radioWrapper: {
    marginHorizontal: 10, // 라디오 버튼들 사이의 간격
  },
  input: {
    width: "100%", // 입력 필드의 너비를 부모 요소에 맞게 설정
    height: 46,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#fff",
    fontSize: 16,
    paddingLeft: 20,
    marginBottom: 15, // 각 인풋 간의 간격 설정
  },
  buttonContainer: {
    width: "100%", // 버튼의 너비를 부모 요소에 맞게 설정
    marginTop: 20, // 버튼과 그 위 요소 간격
  },
});

export default Login;
