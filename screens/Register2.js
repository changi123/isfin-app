import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import axios from "axios";
import { useNavigation, useRoute } from "@react-navigation/native";
import styles from "../assets/css/Register2Styles";
function Register2() {
  const route = useRoute();
  const navigation = useNavigation();
  const [parentId, setParentId] = useState("");
  const [childId, setChildId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const localIp = "http://192.168.219.70";

  const handleConfirm = async () => {
    const data = {
      [route.params.type === "parent" ? "parentId" : "childId"]:
        route.params.type === "parent" ? parentId : childId,
      password: password,
      name: name,
      birthday: birthday,
      email: email,
      phone: phone,
      type: route.params.type === "parent" ? 1 : 0,
    };
    if (route.params.type === "parent") {
      if (
        parentId.length === 0 ||
        password.length === 0 ||
        name.length === 0 ||
        birthday.length === 0 ||
        email.length === 0 ||
        phone.length === 0
      ) {
        Alert.alert("알림", "모든 항목을 입력해주세요.");
        return;
      }

      try {
        const response = await axios.post(
          localIp + ":8080/parents/createParents", // 백엔드 서버의 주소
          data
        );

        if (response.data) {
          Alert.alert("알림", "로그인 해주세요!", [
            {
              text: "확인",
              onPress: () => navigation.navigate("Login"), // Login 화면으로 이동
            },
          ]);
        } else {
          Alert.alert("알림", "이미 가입된 아이디 입니다.");
        }
      } catch (error) {
        Alert.alert("알림", "회원가입 실패, 다시 시도해주세요.");
      }
    } else if (route.params.type === "child") {
      if (
        childId.length === 0 ||
        password.length === 0 ||
        name.length === 0 ||
        birthday.length === 0 ||
        email.length === 0 ||
        phone.length === 0
      ) {
        Alert.alert("알림", "모든 항목을 입력해주세요.");
        return;
      }
      try {
        const response = await axios.post(
          localIp + ":8080/children/createChild", // 백엔드 서버의 주소
          data
        );

        if (response.data) {
          Alert.alert("알림", "로그인 해주세요!", [
            {
              text: "확인",
              onPress: () => navigation.navigate("Login"), // Login 화면으로 이동
            },
          ]);
        } else {
          Alert.alert("알림", "이미 가입된 아이디 입니다.");
        }
      } catch (error) {
        Alert.alert("알림", "회원가입 실패, 다시 시도해주세요.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>회원정보 입력</Text>
      <Text style={styles.subHeader}>회원 정보를 입력해주세요</Text>

      <View style={styles.inputBox}>
        <Text style={styles.label}>아이디</Text>
        <TextInput
          style={styles.input}
          placeholder="영문, 숫자 조합 4~12자"
          value={route.params.type === "child" ? childId : parentId}
          onChangeText={
            route.params.type === "child" ? setChildId : setParentId
          }
          minLength={4}
          maxLength={12}
        />
      </View>

      <View style={styles.inputBox}>
        <Text style={styles.label}>비밀번호</Text>
        <TextInput
          style={styles.input}
          placeholder="영문, 숫자, 특수문자 조합 8~20자"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          minLength={8}
          maxLength={20}
        />
      </View>

      <View style={styles.inputBox}>
        <Text style={styles.label}>이름</Text>
        <TextInput
          style={styles.input}
          placeholder="이름"
          value={name}
          onChangeText={setName}
          maxLength={3}
        />
      </View>

      <View style={styles.inputBox}>
        <Text style={styles.label}>생년월일</Text>
        <TextInput
          style={styles.input}
          placeholder="YYYY-MM-DD"
          value={birthday}
          onChangeText={setBirthday}
        />
      </View>

      <View style={styles.inputBox}>
        <Text style={styles.label}>이메일</Text>
        <TextInput
          style={styles.input}
          placeholder="email"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputBox}>
        <Text style={styles.label}>휴대폰번호</Text>
        <TextInput
          style={styles.input}
          placeholder="xxx-xxxx-xxxx"
          value={phone}
          onChangeText={setPhone}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleConfirm}>
        <Text style={styles.buttonText}>확인</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Register2;
