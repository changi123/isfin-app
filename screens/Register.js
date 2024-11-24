import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "../assets/css/RegisterStyles";

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

export default Register;
