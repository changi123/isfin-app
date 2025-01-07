import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  Modal,
  StyleSheet,
  BackHandler,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

function QuizSecond(props) {
  const localIp = "https://eleven-peaches-raise.loca.lt";
  const navigation = useNavigation();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState(
    require("../assets/image/quiz_image3.png")
  );
  const [imageSrc2, setImageSrc2] = useState(
    require("../assets/image/quiz_image4.png")
  );
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    console.log("closeModal start");

    setModalIsOpen(false);
  };

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
    console.log("checkAnswer start");
    const user = await AsyncStorage.getItem("user");
    const childId = JSON.parse(user).childId;
    if (
      imageSrc === require("../assets/image/quiz_image1.png") ||
      imageSrc2 === require("../assets/image/quiz_image4.png")
    ) {
      setIsCorrectAnswer(false);
      Alert.alert("😊정답입니다😊", "", [
        {
          text: "확인",
          onPress: () => {
            navigation.navigate("QuizThird");
          },
        },
      ]);
      try {
        await axios.post(localIp + "/quizhistory/insert", null, {
          params: { quizNumber: 2, submitresult: true, childId: childId },
        });
      } catch (error) {
        console.error(error);
      }
    } else {
      setIsCorrectAnswer(true);
      Alert.alert("😊정답입니다😊", "", [
        {
          text: "확인",
          onPress: () => {
            navigation.navigate("QuizThird");
          },
        },
      ]);
      try {
        await axios.post(localIp + "/quizhistory/insert", null, {
          params: { quizNumber: 2, submitresult: true, childId: childId },
        });
      } catch (error) {
        console.error(error);
      }
    }

    // openModal();
  };

  const [isBackButtonClicked, setIsBackButtonClicked] = useState(false);

  useEffect(() => {
    const handleBackButtonEvent = (e) => {
      e.preventDefault();
      setIsBackButtonClicked(true);
    };

    // 리액트 네이티브에서는 `window.history`를 직접 사용할 수 없으므로 back 버튼을 수동으로 처리합니다
    const backHandler = () => {
      setIsBackButtonClicked(true);
    };

    // 리액트 네이티브에서 뒤로 가기 버튼을 처리하는 코드
    BackHandler.addEventListener("hardwareBackPress", backHandler);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", backHandler);
    };
  }, [isBackButtonClicked]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>오늘의 퀴즈, 오퀴도퀴!</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.questionNumber}>Q2.</Text>
        <Text style={styles.questionText}>
          '기회비용'은 차선의 선택으로부터 예상되는 손실이다.
        </Text>
        <Image
          source={require("../assets/image/card2.png")}
          style={styles.quizImage}
        />
        {/* 이미지들 */}
        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={changeImage}>
            <Image source={imageSrc} style={styles.quizImage} />
          </TouchableOpacity>
          <TouchableOpacity onPress={changeImage2}>
            <Image source={imageSrc2} style={styles.quizImage} />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={checkAnswer}>
        <Text style={styles.buttonText}>정답 확인하기</Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal
        transparent={true}
        visible={modalIsOpen}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>
            {isCorrectAnswer ? "😊정답입니다😊" : "😢오답입니다😢"}
          </Text>
          <TouchableOpacity style={styles.nextButton} onPress={closeModal}>
            <Text style={styles.buttonText}>다음 문제</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Back Button Modal */}
      {/* <Modal
        transparent={true}
        visible={isBackButtonClicked}
        animationType="slide"
        onRequestClose={() => setIsBackButtonClicked(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>다시 풀 수 없어요🥹</Text>
          <TouchableOpacity
            style={styles.exitButton}
            onPress={() => setIsBackButtonClicked(false)}
          >
            <Text style={styles.buttonText}>퀴즈 계속풀기</Text>
          </TouchableOpacity>
        </View>
      </Modal> */}
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
    // backgroundColor: "#007BFF",
    // width: "100%",
    // paddingVertical: 25, // 높이 증가
    // alignItems: "center",
    backgroundColor: "#007BFF",
    width: "100%",
    paddingVertical: 30,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
  headerText: {
    // fontSize: 22, // 글자 크기 증가
    // fontWeight: "bold",
    // color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  content: {
    // alignItems: "center",
    // marginTop: 30, // 여백 증가
    alignItems: "center",
    marginTop: 40,
    paddingHorizontal: 15,
  },
  questionNumber: {
    // fontSize: 20, // 글자 크기 증가
    // fontWeight: "bold",
    // marginBottom: 15, // 여백 증가
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  questionText: {
    // fontSize: 18, // 글자 크기 증가
    // textAlign: "center",
    // marginBottom: 25, // 여백 증가
    // paddingHorizontal: 20, // 좌우 여백 추가
    fontSize: 18,
    textAlign: "center",
    marginBottom: 30,
    paddingHorizontal: 30,
    color: "#555",
  },
  imageContainer: {
    // flexDirection: "row",
    // justifyContent: "center",
    // marginBottom: 25, // 여백 증가
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30,
  },
  quizImage: {
    // width: 160, // 크기 증가
    // height: 160, // 크기 증가
    // margin: 12, // 여백 증가
    // borderRadius: 8, // 이미지 모서리 둥글게
    // // borderWidth: 2, // 경계선 추가
    // borderColor: "#ddd", // 경계선 색상
    width: 160, // 크기 증가
    height: 160, // 크기 증가
    margin: 15,
    borderRadius: 10,
    borderColor: "#ddd",
  },
  imageHint: {
    // width: 110, // 크기 증가
    // height: 110, // 크기 증가
    // marginTop: 20,
    // borderRadius: 8, // 이미지 모서리 둥글게
    // // borderWidth: 2, // 경계선 추가
    // borderColor: "#ddd", // 경계선 색상
    width: 100,
    height: 100,
    marginTop: 20,
  },
  button: {
    // backgroundColor: "#007BFF",
    // paddingVertical: 18, // 버튼 높이 감소
    // paddingHorizontal: 50, // 버튼 좌우 여백 증가
    // borderRadius: 10, // 버튼 모서리 둥글게
    // marginTop: 40, // 여백 증가
    // alignItems: "center",
    // elevation: 5, // 그림자 효과 추가
    backgroundColor: "#007BFF",
    paddingVertical: 20,
    paddingHorizontal: 60,
    borderRadius: 12,
    marginTop: 50,
    alignItems: "center",
    elevation: 5,
  },
  buttonText: {
    // color: "#fff",
    // fontSize: 20, // 글자 크기 증가
    // fontWeight: "bold",
    // color: "#fff",
    // fontSize: 18, // 글자 크기 조정
    // fontWeight: "bold",
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalText: {
    fontSize: 20, // 글자 크기 증가
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 30, // 여백 증가
  },
  nextButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 12, // 버튼 높이 증가
    paddingHorizontal: 50, // 버튼 좌우 여백 증가
    borderRadius: 8, // 버튼 모서리 둥글게
  },
  exitButton: {
    backgroundColor: "#FF6347",
    paddingVertical: 12, // 버튼 높이 증가
    paddingHorizontal: 50, // 버튼 좌우 여백 증가
    borderRadius: 8, // 버튼 모서리 둥글게
  },
});

export default QuizSecond;
