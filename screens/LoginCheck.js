import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  navigate,
} from "react-native";
import styles from "../assets/css/LoginCheckStyles";
const LoginCheck = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>아이스핀</Text>
      <Text style={styles.subtitle}>우리 아이의 스타트 핀테크</Text>

      {/* 로그인 버튼 */}
      <TouchableOpacity
        style={styles.button1}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.buttonText}>로그인</Text>
      </TouchableOpacity>

      {/* 회원가입 버튼 */}
      <TouchableOpacity
        style={styles.button2}
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={styles.buttonText}>회원가입</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button1}
        onPress={() => navigation.navigate("IsfinMain")}
      >
        <Text style={styles.buttonText}>서비스 둘러보기</Text>
      </TouchableOpacity>

      {/* 이미지 */}
      <View style={styles.imageBox}>
        <Image style={styles.image} />
      </View>
    </View>
  );
};

export default LoginCheck;
