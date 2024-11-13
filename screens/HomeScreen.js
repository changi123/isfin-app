import React from "react";
import { StyleSheet, Text, View, Button, Image, StatusBar } from "react-native";

const HomeScreen = ({ navigation }) => {
  return (
    // <View style={styles.container}>
    //   <Text style={styles.title}>아이스핀</Text>
    //   <Text style={styles.subtitle}>우리 아이의 스타트 핀테크</Text>

    //   {/* 로그인 버튼 */}
    //   <Button
    //     title="로그인"
    //     onPress={() => navigation.navigate("Login")}
    //     color="#4CAF50" // 버튼 색상
    //   />

    //   {/* 회원가입 버튼 */}
    //   <Button
    //     title="회원가입"
    //     onPress={() => navigation.navigate("Register")}
    //     color="#2196F3" // 버튼 색상
    //   />

    //   {/* 이미지 */}
    //   <View style={styles.imageBox}>
    //     <Image
    //       style={styles.image}
    //       source={require("./assets/images/logincheck_image.png")} // 이미지 경로
    //     />
    //   </View>

    //   <StatusBar style="auto" />
    // </View>
    <View></View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    color: "#777",
    marginBottom: 30,
  },
  imageBox: {
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
});

export default HomeScreen;
