import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

function CardMain() {
  const navigation = useNavigation();
  const [cardList, setCardList] = useState([]);
  const [checkUser, setCheckUser] = useState(null);
  const imageMap = {
    "card1.png": require("../assets/card1.png"),
    "card2.png": require("../assets/card2.png"),
    "card3.png": require("../assets/card3.png"),
  };

  useEffect(() => {
    // AsyncStorage에서 사용자 정보 확인
    AsyncStorage.getItem("user").then((userData) => {
      if (userData) {
        const user = JSON.parse(userData);
        setCheckUser(user.type);
      }
    });

    // 카드 목록 요청
    axios
      .get("http://172.30.1.94:8080/card-list")
      .then((res) => {
        setCardList(res.data);
        // console.log(res.data);
      })
      .catch((error) => {
        console.error("Error fetching card list: ", error);
      });
  }, []);

  function toJoinPage() {
    if (checkUser === "1") {
      //   navigation.navigate("CardJoin");
    } else {
      Alert.alert(
        "알림",
        "부모만 접근가능한 페이지 입니다",
        [
          {
            text: "확인",
            onPress: () => {},
            style: "default",
          },
        ],
        { cancelable: false }
      );
    }
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>카드 목록</Text>
      </View>

      {/* Main Section */}
      <View style={styles.mainSection}>
        <Text style={styles.subTitle}>아이스핀 카드로 결제해 볼까요?</Text>
        <Text style={styles.title}>
          이제는 금융도 나만의 카드로{" "}
          <Text style={styles.lineBreak}>시작하면서 배워봐요~</Text>
        </Text>
        <Image
          source={require("../assets/main_image2.png")}
          style={styles.mainImage}
        />
        <Text style={styles.note}>
          * 실물카드는 신청 후 10일 이내에 발송됩니다.
        </Text>
      </View>

      {/* Card List Section */}
      <Text style={styles.bodyTitle}>아이스핀 카드</Text>
      <View style={styles.cardList}>
        {cardList.map((card, index) => {
          const names = card.name.split(" ");

          // card.image에서 파일 이름을 가져와서 매핑된 이미지를 찾기
          const imageSource = imageMap[card.image.split("/").pop()] || {
            uri: card.image,
          };

          return (
            <TouchableOpacity
              key={index}
              style={styles.cardBox}
              onPress={() =>
                navigation.navigate("CardDetail", {
                  cardTypeId: card.cardTypeId,
                })
              }
            >
              <Image source={imageSource} style={styles.cardImage} />
              <Text style={styles.cardName}>
                {names[0]}
                {"\n"}
                {names[1]}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <Text style={styles.bottomText}>우리 아이는 쓰는 카드가 있어요.</Text>
        <TouchableOpacity style={styles.bottomLink} onPress={toJoinPage}>
          <Text style={styles.bottomLinkText}>연동하러 가기</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    paddingVertical: 20,
    backgroundColor: "#007bff",
    alignItems: "center",
  },
  headerText: {
    fontSize: 26,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  mainSection: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    elevation: 5, // 그림자 효과 추가
  },
  subTitle: {
    fontSize: 18,
    color: "#00085A",
    fontWeight: "bold",
    textAlign: "center",
  },
  title: {
    fontSize: 22,
    color: "#00085A",
    textAlign: "center",
    marginVertical: 10,
  },
  lineBreak: {
    marginTop: 5,
  },
  mainImage: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
    marginTop: 20,
  },
  note: {
    fontSize: 12,
    color: "#888",
    textAlign: "center",
    marginTop: 10,
  },
  bodyTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 20,
    marginTop: 30,
    textAlign: "center",
    color: "#00085A",
  },
  cardList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    marginTop: 20,
    paddingHorizontal: 10,
  },
  cardBox: {
    width: "45%",
    marginBottom: 20,
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5, // 그림자 효과 추가
  },
  cardImage: {
    width: "100%",
    height: 120,
    resizeMode: "contain",
    borderRadius: 8,
    marginBottom: 10,
  },
  cardName: {
    fontSize: 16,
    color: "#00085A",
    textAlign: "center",
  },
  bottomSection: {
    marginTop: 30,
    alignItems: "center",
    paddingVertical: 20,
  },
  bottomText: {
    fontSize: 14,
    color: "#00085A",
    textAlign: "center",
  },
  bottomLink: {
    marginTop: 10,
  },
  bottomLinkText: {
    fontSize: 16,
    color: "#007bff",
    textDecorationLine: "underline",
    textAlign: "center",
  },
});

export default CardMain;
