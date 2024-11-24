import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
function Account(props) {
  const [accountNumber, setAccountNumber] = useState("");
  const [autopayDate, setAutopayDate] = useState("");
  const [autopayAmount, setAutopayAmount] = useState("");
  const [selectedBank, setSelectedBank] = useState(""); // 은행 선택 상태
  const navigation = useNavigation();
  const user = AsyncStorage.getItem("user");
  const { cardData } = props.route.params;

  const localIp = "http://192.168.219.70";

  useEffect(() => {
    AsyncStorage.getItem("user").then((user) => {
      if (user === null) {
        Alert.alert(
          "알림",
          "로그인이 필요한 페이지입니다",
          [{ text: "확인", onPress: () => navigation.navigate("Login") }],
          { cancelable: false }
        );
      } else {
        checkuser = JSON.parse(user).type;
        if (checkuser === "0") {
          Alert.alert(
            "알림",
            "부모만 접근 가능한 페이지입니다",
            [{ text: "확인", onPress: () => navigation.navigate("Card") }],
            { cancelable: false }
          );
        }
      }
    });
  }, []);

  const accountInput = (e) => {
    if (e) {
      if (e.length <= 14) {
        setAccountNumber(
          e
            .replace(/[^0-9]/g, "")
            .replace(/^(\d{0,3})(\d{0,3})(\d{0,6})$/g, "$1-$2-$3")
            .replace(/(\-{1,2})$/g, "")
        );
      }
    } else {
      setAccountNumber("");
    }
  };

  const autopayAmountInput = (amount) => {
    const comma = (amount) => {
      amount = String(amount);
      return amount.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,");
    };
    const uncomma = (amount) => {
      amount = String(amount);
      return amount.replace(/[^\d]+/g, "");
    };
    setAutopayAmount(comma(uncomma(amount)));
  };

  const autopayDateFormat = (date) => {
    if (/^(0[1-9]|[12][0-9]|3[01]|0|[1-9])$/.test(date)) {
      setAutopayDate(date);
    } else {
      setAutopayDate("");
    }
  };

  const insertCard = async () => {
    console.log("insertCard start");
    const user = JSON.parse(await AsyncStorage.getItem("user"));

    if (
      accountNumber === "" ||
      autopayDate === "" ||
      autopayAmount === "" ||
      selectedBank === ""
    ) {
      Alert.alert("알림", "모든 정보를 입력해 주세요", [{ text: "확인" }], {
        cancelable: false,
      });
    } else {
      const card = {
        child: { childId: cardData.card.child.childId },
        cardType: { cardTypeId: cardData.card.cardType.cardTypeId },
        password: cardData.password,
        account: accountNumber,
        autopayDate: autopayDate,
        autopayAmount: parseInt(autopayAmount.replace(/,/g, "")),
        bank: selectedBank,
      };
      const parentId = user.parentId;
      // console.log(card);

      try {
        const response = await axios.post(
          localIp + `:8080/cards?parentId=${parentId}`,
          card
        );
        // console.log(response.data);
        if (response.data === 1) {
          Alert.alert(
            "알림",
            "카드 발급에 성공하였습니다",
            [{ text: "확인", onPress: () => navigation.navigate("IsfinMain") }],
            { cancelable: false }
          );
        } else {
          Alert.alert(
            "알림",
            "카드 발급에 실패하였습니다",
            [{ text: "확인" }],
            {
              cancelable: false,
            }
          );
        }
      } catch (error) {
        console.log(error + "asdasd");
        Alert.alert("알림", "서버 오류가 발생했습니다", [{ text: "확인" }], {
          cancelable: false,
        });
      }
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 20,
        }}
      >
        계좌정보 입력
      </Text>
      <Text style={{ fontSize: 16, textAlign: "center", marginBottom: 10 }}>
        연동할 계좌 정보를 입력해주세요
      </Text>

      <Text>은행 선택</Text>
      <View style={{ marginBottom: 20 }}>
        <TextInput
          value={selectedBank}
          onChangeText={setSelectedBank}
          placeholder="은행을 선택하세요"
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            padding: 10,
            borderRadius: 5,
            marginBottom: 20,
          }}
        />
      </View>

      <Text>계좌번호</Text>
      <TextInput
        value={accountNumber}
        onChangeText={accountInput}
        placeholder="계좌번호"
        keyboardType="numeric"
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 10,
          borderRadius: 5,
          marginBottom: 20,
        }}
      />

      <Text>자동이체일</Text>
      <TextInput
        value={autopayDate}
        onChangeText={autopayDateFormat}
        placeholder="자동이체일"
        keyboardType="numeric"
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 10,
          borderRadius: 5,
          marginBottom: 20,
        }}
      />

      <Text>자동이체금액</Text>
      <TextInput
        value={autopayAmount}
        onChangeText={autopayAmountInput}
        placeholder="자동이체금액"
        keyboardType="numeric"
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 10,
          borderRadius: 5,
          marginBottom: 20,
        }}
      />

      <Text
        style={{
          fontSize: 14,
          color: "#888",
          textAlign: "center",
          marginBottom: 20,
        }}
      >
        자동이체금액은 천 단위로 구분됩니다.
      </Text>

      <TouchableOpacity
        onPress={insertCard}
        style={{
          backgroundColor: "#007bff",
          padding: 15,
          borderRadius: 10,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff", fontSize: 16 }}>등록</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Account;
