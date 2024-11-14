import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

function Register(props) {
  const navigation = useNavigation();

  const handleRegister = (type) => {
    return () => {
      navigation.navigate("Register2", { type }); // 로그인 화면으로 이동하면서 type 정보 전달
    };
  };

  return (
    <View style={styles.registerContainer}>
      {/* <Header3>회원가입</Header3> */}

      <View style={styles.registerParentImg}>
        <TouchableOpacity
          style={styles.registerParentImgButton}
          onPress={handleRegister("parent")}
        >
          <Text style={styles.buttonText}>부모</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.registerText1}>
        <Text style={styles.text}>부모이신가요?</Text>
      </View>

      <View style={styles.registerChildImg}>
        <TouchableOpacity
          style={styles.registerChildImgButton}
          onPress={handleRegister("child")}
        >
          <Text style={styles.buttonText}>아이</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.registerText2}>
        <Text style={styles.text}>아이신가요?</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  registerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#E9F6FF", // 부드러운 파란색 배경
  },
  // 부모 이미지
  registerParentImg: {
    justifyContent: "center",
    marginTop: 34,
  },
  registerParentImgButton: {
    width: 200,
    height: 200,
    backgroundColor: "#A7D8FF", // 밝은 파란색 버튼
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#5C8DFF", // 파란색 테두리
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  // 버튼 텍스트 스타일
  buttonText: {
    fontSize: 18,
    color: "#1C4B8D", // 다크 블루
    fontWeight: "bold",
  },
  // 부모이신가요?
  registerText1: {
    justifyContent: "center",
    paddingTop: 18,
    fontSize: 20,
    color: "#1C4B8D", // 다크 블루
    textAlign: "center",
  },
  // 아이 이미지
  registerChildImg: {
    justifyContent: "center",
    marginTop: 25,
  },
  registerChildImgButton: {
    width: 200,
    height: 200,
    backgroundColor: "#A7D8FF", // 밝은 파란색 버튼
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#5C8DFF", // 파란색 테두리
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  registerText2: {
    justifyContent: "center",
    paddingTop: 18,
    fontSize: 20,
    color: "#1C4B8D", // 다크 블루
    textAlign: "center",
  },
  text: {
    fontSize: 20,
    color: "#1C4B8D", // 다크 블루
    textAlign: "center",
  },
});

export default Register;
