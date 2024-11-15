import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  navigate,
} from "react-native";

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4d7dff",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 50,
    color: "white",
    fontFamily: "HGGGOTHICSSI_PRO_60G", // 폰트 적용
    textAlign: "center",
    marginTop: 300,
  },
  subtitle: {
    fontSize: 16,
    color: "white",
    fontFamily: "HGGGOTHICSSI_PRO_40G", // 폰트 적용
    textAlign: "center",
    width: 250,
    paddingHorizontal: 30,
    marginTop: 3,
    marginBottom: 50,
  },
  button1: {
    backgroundColor: "#ffffff",
    width: 150,
    height: 50,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    boxShadow: "2px 2px 0px rgba(0, 0, 0, 0.25)", // React Native에서는 boxShadow 효과가 제한적입니다. 이걸 대신할 스타일을 적용할 수 있습니다.
  },
  button2: {
    backgroundColor: "#ffffff",
    width: 150,
    height: 50,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    boxShadow: "2px 2px 0px rgba(0, 0, 0, 0.25)", // 같은 스타일 적용
  },
  buttonText: {
    color: "#00085a",
    fontSize: 20,
  },
  imageBox: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 335,
    height: 335,
    resizeMode: "contain",
  },
});

export default LoginCheck;
