import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import Swal from "sweetalert2";

function Login() {
  //   const navigation = useNavigation();

  //   // 로그인 타입 상태
  //   const [loginType, setLoginType] = useState("parent");

  //   // 부모 로그인 시 사용할 아이디 상태
  //   const [parentId, setParentId] = useState("");

  //   // 아이 로그인 시 사용할 아이디 상태
  //   const [childId, setChildId] = useState("");

  //   // 비밀번호 상태
  //   const [password, setPassword] = useState("");

  //   // 라디오 버튼이 체크될 때 해당 입력 필드의 값을 공백으로 초기화
  //   const handleRadioChange = (type) => {
  //     if (type === "parent") {
  //       setParentId("");
  //     } else if (type === "child") {
  //       setChildId("");
  //     }
  //     setPassword("");
  //     setLoginType(type);
  //   };

  //   // 부모 로그인 처리
  //   const handleParentLogin = async () => {
  //     try {
  //       const loginData = { parentId, password };

  //       if (parentId.length === 0 || password === 0) {
  //         Swal.fire({
  //           title: "알림",
  //           text: "모든 항목을 입력해주세요.",
  //           icon: "warning",
  //           confirmButtonText: "확인",
  //           confirmButtonColor: "#007bff",
  //         });
  //         return;
  //       }

  //       const response = await axios.post("/parents/login", loginData);
  //       // 로그인 성공 후의 처리
  //       if (response.data) {
  //         localStorage.setItem("user", JSON.stringify(response.data));
  //         navigation.navigate("Main"); // 로그인 성공 후 메인 페이지로 이동
  //       } else {
  //         Swal.fire({
  //           title: "알림",
  //           text: "아이디 또는 비밀번호를 확인해주세요.",
  //           icon: "error",
  //           confirmButtonText: "확인",
  //           confirmButtonColor: "#007bff",
  //         });
  //       }
  //     } catch (error) {
  //       // 로그인 실패 후의 처리
  //       Alert.alert(
  //         "로그인 실패",
  //         "서버 오류가 발생했습니다. 다시 시도해주세요."
  //       );
  //     }
  //   };

  //   // 아이 로그인 처리
  //   const handleChildLogin = async () => {
  //     try {
  //       const loginData = { childId, password };

  //       if (childId.length === 0 || password === 0) {
  //         Swal.fire({
  //           title: "알림",
  //           text: "모든 항목을 입력해주세요.",
  //           icon: "warning",
  //           confirmButtonText: "확인",
  //           confirmButtonColor: "#007bff",
  //         });
  //         return;
  //       }

  //       const response = await axios.post("/children/login", loginData);
  //       // 로그인 성공 후의 처리
  //       if (response.data) {
  //         localStorage.setItem("user", JSON.stringify(response.data));
  //         navigation.navigate("Main"); // 로그인 성공 후 메인 페이지로 이동
  //       } else {
  //         Swal.fire({
  //           title: "알림",
  //           text: "아이디 또는 비밀번호를 확인해주세요.",
  //           icon: "error",
  //           confirmButtonText: "확인",
  //           confirmButtonColor: "#007bff",
  //         });
  //       }
  //     } catch (error) {
  //       // 로그인 실패 후의 처리
  //       Alert.alert(
  //         "로그인 실패",
  //         "서버 오류가 발생했습니다. 다시 시도해주세요."
  //       );
  //     }
  //   };

  //   // 로그인 버튼 클릭 시
  //   const handleButtonClick = () => {
  //     if (loginType === "parent") {
  //       handleParentLogin(); // 부모 로그인 처리
  //     } else if (loginType === "child") {
  //       handleChildLogin(); // 아이 로그인 처리
  //     }
  //   };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.header}>로그인</Text>
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
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subHeader: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  radioContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  radioWrapper: {
    marginHorizontal: 10,
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    marginTop: 20,
    width: "80%",
  },
});

export default Login;