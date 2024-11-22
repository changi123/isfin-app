import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

function CardRegister(props) {
  const navigation = useNavigation();
  const { cardInfo } = props.route.params;

  const [childId, setChildId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [childName, setChildName] = useState("");
  const [idNotification, setIdNotification] = useState(false);
  const [emptyNotification, setEmptyNotification] = useState(false);
  const [cntClick, setcntClick] = useState(0);
  const [cardImage, setCardImage] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem("user").then((userData) => {
      if (userData === null) {
        Alert.alert(
          "알림",
          "로그인이 필요한 페이지입니다",
          [{ text: "확인", onPress: () => navigation.navigate("Login") }],
          { cancelable: false }
        );
      } else {
        const checkuser = JSON.parse(userData).type;
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

  // 카드 이미지 업데이트
  useEffect(() => {
    setCardImage(cardInfo.image);
  }, [cardInfo]);

  // cardImage 값이 변경된 후에 로그 출력
  useEffect(() => {
    if (cardImage) {
      //   console.log(cardImage);
    }
  }, [cardImage]);

  const phoneNumberInput = (e) => {
    if (e && e.target && e.target.value) {
      if (e.target.value.length <= 13) {
        setPhoneNumber(
          e.target.value
            .replace(/[^0-9]/g, "")
            .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
            .replace(/(\-{1,2})$/g, "")
        );
      }
    } else {
      setPhoneNumber("");
    }
  };

  function nextPage() {
    if (cntClick > 0 && !idNotification) {
      const card = {
        child: {
          childId: childId,
        },
        cardType: {
          cardTypeId: cardInfo.cardId,
        },
      };
      navigation.navigate("CardRegisterCheck", { card: card });
    } else {
      Alert.alert("알림", "아이디 확인을 해주세요", [{ text: "확인" }], {
        cancelable: false,
      });
    }
  }

  function checkId() {
    if (childId === "") {
      setEmptyNotification(true);
    } else {
      axios
        .get(`/cards/child/${childId}`)
        .then((res) => {
          if (res.data === "") {
            setIdNotification(true);
            setcntClick(cntClick + 1);
          } else {
            setIdNotification(false);
            setcntClick(cntClick + 1);
            setChildName(res.data.name);
            setPhoneNumber(res.data.phone);
            Alert.alert(
              "알림",
              "사용 가능한 아이디 입니다",
              [{ text: "확인" }],
              { cancelable: false }
            );
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>카드 신청</Text>
      <Text style={styles.cardName}>{cardInfo.cardName}</Text>
      <View style={styles.cardImageBox}>
        <Image source={cardImage} style={styles.cardImage} />
      </View>
      <View style={styles.registerBackground}>
        <View style={styles.registerBody}>
          <Text style={styles.registerTop}>신청인 정보</Text>
          <View style={styles.registerInputBox}>
            <Text style={styles.registerSubTitle}>자녀 아이디</Text>
            <View style={styles.registerIdCheckBox}>
              <TextInput
                style={styles.registerIdInput}
                placeholder="아이디 입력"
                value={childId}
                onChangeText={(text) => setChildId(text)}
              />
              <Button
                title="확인"
                onPress={checkId}
                style={styles.registerIdCheckButton}
              />
            </View>
          </View>

          <View style={styles.registerInputBox}>
            <Text style={styles.registerSubTitle}>자녀 이름</Text>
            <TextInput
              style={styles.registerInput}
              value={childName}
              editable={false}
            />
          </View>
          <View style={styles.registerInputBox}>
            <Text style={styles.registerSubTitle}>자녀 전화번호</Text>
            <TextInput
              style={styles.registerInput}
              value={phoneNumber}
              onChangeText={phoneNumberInput}
              editable={false}
            />
          </View>
          {emptyNotification && (
            <Text style={styles.registerEmptyId}>아이디를 입력해 주세요.</Text>
          )}
          {idNotification && (
            <Text style={styles.registerIdCheckWrong}>
              아이디 정보가 없거나 이미 등록된 아이디입니다.
            </Text>
          )}
        </View>
        <View style={styles.registerSubmitButtonBox}>
          <Button
            title="다음"
            onPress={nextPage}
            style={styles.registerSubmitButton}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#00085A",
    marginBottom: 20,
    textAlign: "center",
  },
  cardName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#00085A",
    textAlign: "center",
    marginBottom: 10,
  },
  cardImageBox: {
    alignItems: "center",
    marginBottom: 20,
  },
  cardImage: {
    width: 200,
    height: 120,
    resizeMode: "contain",
  },
  registerBackground: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  registerBody: {
    marginBottom: 20,
  },
  registerTop: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#00085A",
    marginBottom: 20,
    textAlign: "center",
  },
  registerInputBox: {
    marginBottom: 15,
  },
  registerSubTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#00085A",
    marginBottom: 5,
  },
  registerIdCheckBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  registerIdInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    flex: 1,
    marginRight: 10,
  },
  registerIdCheckButton: {
    backgroundColor: "#007bff",
    color: "#fff",
  },
  registerInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 5,
  },
  registerEmptyId: {
    color: "red",
    fontSize: 12,
  },
  registerIdCheckWrong: {
    color: "red",
    fontSize: 12,
  },
  registerSubmitButtonBox: {
    marginTop: 20,
  },
  registerSubmitButton: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: 10,
    borderRadius: 5,
  },
});

export default CardRegister;
