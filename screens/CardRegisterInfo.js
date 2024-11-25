import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";
import styles from "../assets/css/CardRegisterInfoStyles";
function CardRegisterInfo(props) {
  const navigation = useNavigation();
  const route = useRoute();

  const [cardPassword, setCardPassword] = useState("");
  const [cardCheckPass, setCardCheckPass] = useState("");
  const [passwordCheck, setPasswordCheck] = useState(false);
  const [address, setAddress] = useState("");
  const { card } = props.route.params;
  const localIp = "http://172.30.1.1";
  const nextPage = async () => {
    if (
      !passwordCheck &&
      cardPassword !== "" &&
      cardCheckPass !== "" &&
      address !== ""
    ) {
      const cardData = { card: card, password: cardPassword };
      await AsyncStorage.setItem("card", JSON.stringify(cardData));

      navigation.navigate("Account", { cardData });
    } else if (passwordCheck) {
      Alert.alert("알림", "비밀번호가 일치하지 않습니다", [{ text: "확인" }]);
    } else {
      Alert.alert("알림", "모든 정보를 입력해 주세요", [{ text: "확인" }]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>카드 신청</Text>
      <Text style={styles.subHeader}>카드발급 관련 입력정보</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>카드 비밀번호 설정</Text>
        <TextInput
          style={styles.input}
          placeholder="숫자 4자리를 입력해주세요"
          secureTextEntry
          value={cardPassword}
          onChangeText={(password) => {
            if (/^\d{0,4}$/.test(password)) {
              setCardPassword(password);
            }
          }}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>카드 비밀번호 설정(재확인)</Text>
        <TextInput
          style={styles.input}
          placeholder="숫자 4자리를 입력해주세요"
          secureTextEntry
          value={cardCheckPass}
          onChangeText={(password) => {
            if (/^\d{0,4}$/.test(password)) {
              setCardCheckPass(password);
              if (password !== cardPassword) {
                setPasswordCheck(true);
              } else {
                setPasswordCheck(false);
              }
            }
          }}
        />
        {passwordCheck && (
          <Text style={styles.errorText}>비밀번호가 일치하지 않습니다.</Text>
        )}
      </View>

      {/* 카드 배송지 주소 입력란 */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>카드 배송지 주소</Text>
        <TextInput
          style={styles.input}
          placeholder="주소를 입력하세요"
          value={address}
          onChangeText={setAddress}
        />
      </View>

      <TouchableOpacity style={styles.nextButton} onPress={nextPage}>
        <Text style={styles.buttonText}>다음</Text>
      </TouchableOpacity>
    </View>
  );
}

export default CardRegisterInfo;
