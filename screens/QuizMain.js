import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Linking,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";

const QuizMain = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [pointsQuiz, setPointsQuiz] = useState([]);

  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await AsyncStorage.getItem("user");
      if (userData) {
        setUser(JSON.parse(userData));
      }
    };
    fetchUserData();

    // 가져온 퀴즈 포인트 데이터
    if (route.params?.points_quiz) {
      setPointsQuiz(route.params.points_quiz);
    }
  }, [route.params]);

  const handleLinkClick = () => {
    Alert.alert(
      "블로그 열기",
      "외부 브라우저로 블로그를 열겠습니까?",
      [
        { text: "취소", style: "cancel" },
        {
          text: "열기",
          onPress: () =>
            Linking.openURL("https://kids.moef.go.kr/play/playMn01.do"),
        },
      ],
      { cancelable: true }
    );
  };

  const openModal = () => {
    setModalIsOpen(true);
    if (user?.type === "1") {
      Alert.alert("알림", "부모는 퀴즈를 풀 수 없어요🥹", [
        { text: "닫기", onPress: closeModal },
      ]);
    } else {
      Alert.alert("알림", "오늘의 퀴즈를 다 풀었어요🥹", [
        { text: "닫기", onPress: closeModal },
      ]);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>오늘의 퀴즈, 오퀴도퀴!</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.text1}>※ 주의사항 ※</Text>
        <Text style={styles.text2}>O와 X 모두 고르지 않으면 오답이에요🥹</Text>
        <Text style={styles.text2}>한 번 시작하면 다시 풀 수 없어요😢</Text>
        <Text style={styles.text3}>블로그 안에 답이 있어요🤓</Text>
        <Image
          source={require("../assets/image/main_image1.png")}
          style={styles.quizImage}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLinkClick}>
        <Text style={styles.buttonText}>
          여기 답이 있어요😄 : 블로그 확인하기
        </Text>
      </TouchableOpacity>

      <View>
        {pointsQuiz.length === 0 && user?.type === "0" ? (
          <TouchableOpacity
            style={[styles.button, styles.startButton]}
            onPress={() => navigation.navigate("QuizFirst")}
          >
            <Text style={styles.buttonText}>퀴즈 풀러가기</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.button, styles.startButton]}
            onPress={openModal}
          >
            <Text style={styles.buttonText}>퀴즈 풀러가기</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    marginBottom: 20,
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  content: {
    alignItems: "center",
    marginBottom: 20,
  },
  text1: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ff3333",
    marginBottom: 10,
  },
  text2: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
  text3: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#555",
    marginBottom: 10,
  },
  quizImage: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginVertical: 20,
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  startButton: {
    backgroundColor: "#007BFF",
  },
});

export default QuizMain;
