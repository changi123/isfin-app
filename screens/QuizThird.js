import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

function QuizThird() {
  const localIp = "https://eleven-peaches-raise.loca.lt";
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);
  const [isBackButtonClicked, setIsBackButtonClicked] = useState(false);
  const [imageSrc, setImageSrc] = useState(
    require("../assets/image/quiz_image3.png")
  );
  const [imageSrc2, setImageSrc2] = useState(
    require("../assets/image/quiz_image4.png")
  );
  const changeImage = () => {
    if (imageSrc === require("../assets/image/quiz_image1.png")) {
      setImageSrc(require("../assets/image/quiz_image3.png"));
    } else if (imageSrc === require("../assets/image/quiz_image3.png")) {
      setImageSrc(require("../assets/image/quiz_image1.png"));
      setImageSrc2(require("../assets/image/quiz_image4.png"));
    }
  };

  const changeImage2 = () => {
    if (imageSrc2 === require("../assets/image/quiz_image2.png")) {
      setImageSrc2(require("../assets/image/quiz_image4.png"));
    } else if (imageSrc2 === require("../assets/image/quiz_image4.png")) {
      setImageSrc2(require("../assets/image/quiz_image2.png"));
      setImageSrc(require("../assets/image/quiz_image3.png"));
    }
  };
  const checkAnswer = async () => {
    // 정답 체크 로직
    console.log("checkAnswer start");

    try {
      if (imageSrc === require("../assets/image/quiz_image1.png")) {
        console.log("checkAnswer start1");
        setIsCorrectAnswer(true);
        await axios.post(localIp + "/quizhistory/insert", null, {
          params: { quizNumber: 3, submitresult: true, childId: childId },
        });
      } else {
        console.log("checkAnswer start2");
        setIsCorrectAnswer(false);
        await axios.post(localIp + "/quizhistory/insert", null, {
          params: { quizNumber: 3, submitresult: true, childId: childId },
        });
      }

      //   const url = "/points/quiz";
      //   const response = await axios.post(url);
      //   if (response.data === 1) {
      //     const childId = user.childId;
      //     const password = user.password;
      //     const loginData = { childId, password };
      //     const response = await axios.post("/children/login", loginData);
      //     localStorage.setItem("user", JSON.stringify(response.data));
      //   } else {
      //   }
    } catch (error) {}

    console.log(isCorrectAnswer);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    console.log("closeModal");
    setModalIsOpen(false);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>오늘의 퀴즈, 오퀴도퀴!</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.questionNumber}>Q3.</Text>
        <Text style={styles.questionText}>
          하나의 선택을 하게 되면{" "}
          <Text style={styles.highlightText}>다른 하나를 포기해야 한다.</Text>
        </Text>
        <Image
          source={require("../assets/image/card3.png")}
          style={styles.quizImage}
        />
        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={changeImage}>
            <Image style={styles.quizImage} source={imageSrc} />
          </TouchableOpacity>
          <TouchableOpacity onPress={changeImage2}>
            <Image style={styles.quizImage} source={imageSrc2} />
          </TouchableOpacity>
        </View>
      </View>

      {/* 버튼 */}
      <TouchableOpacity style={styles.button} onPress={checkAnswer}>
        <Text style={styles.buttonText}>정답 확인하기</Text>
      </TouchableOpacity>

      {/* 정답 확인 모달 */}
      {modalIsOpen && (
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>
            {isCorrectAnswer ? "😊정답입니다😊" : "😢오답입니다😢"}
          </Text>
          <TouchableOpacity style={styles.nextButton} onPress={closeModal}>
            <Text style={styles.buttonText}>해설 보기</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Back Button 모달 */}
      {/* {isBackButtonClicked && (
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>다시 풀 수 없어요🥹</Text>
          <TouchableOpacity
            style={styles.exitButton}
            onPress={() => setIsBackButtonClicked(false)}
          >
            <Text style={styles.buttonText}>퀴즈 계속 풀기</Text>
          </TouchableOpacity>
        </View>
      )} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    alignItems: "center",
  },
  header: {
    backgroundColor: "#007BFF",
    width: "100%",
    paddingVertical: 30,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  content: {
    alignItems: "center",
    marginTop: 40,
    paddingHorizontal: 15,
  },
  questionNumber: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  questionText: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 30,
    paddingHorizontal: 30,
    color: "#555",
  },
  highlightText: {
    fontWeight: "bold",
    color: "#FF6347",
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30,
  },
  quizImage: {
    width: 160, // 크기 증가
    height: 160, // 크기 증가
    margin: 15,
    borderRadius: 10,
    borderColor: "#ddd",
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 20,
    paddingHorizontal: 60,
    borderRadius: 12,
    marginTop: 50,
    alignItems: "center",
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
  modalContainer: {
    position: "absolute", // 모달을 절대 위치로 설정
    top: 0, // 상단에 고정
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    zIndex: 100, // 다른 컴포넌트 위로 띄우기
  },
  modalText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 40,
  },
  nextButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 14,
    paddingHorizontal: 60,
    borderRadius: 10,
  },
  exitButton: {
    backgroundColor: "#FF6347",
    paddingVertical: 14,
    paddingHorizontal: 60,
    borderRadius: 10,
  },
});

export default QuizThird;
