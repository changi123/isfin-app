import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  BackHandler,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const QuizFirst = () => {
  const [imageSrc, setImageSrc] = useState(
    require("../assets/image/quiz_image3.png")
  );
  const [imageSrc2, setImageSrc2] = useState(
    require("../assets/image/quiz_image4.png")
  );
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);
  const [isBackButtonClicked, setIsBackButtonClicked] = useState(false);
  const localIp = "https://eleven-peaches-raise.loca.lt";
  const navigation = useNavigation();

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

    if (imageSrc === require("../assets/image/quiz_image1.png")) {
      setIsCorrectAnswer(true);
      Alert.alert("😊정답입니다😊", "", [
        {
          text: "확인",
          onPress: () => {
            navigation.navigate("QuizSecond");
          },
        },
      ]);
      try {
        await axios.post(localIp + "/quizhistory/insert", null, {
          params: { quizNumber: 1, submitresult: true, childId: childId },
        });
      } catch (error) {
        console.error(error);
      }
    } else {
      setIsCorrectAnswer(false);
      Alert.alert("😢오답입니다😢", "", [
        {
          text: "확인",
          onPress: () => {
            navigation.navigate("QuizSecond");
          },
        },
      ]);
      try {
        await axios.post(localIp + "/quizhistory/insert", null, {
          params: { quizNumber: 1, submitresult: false, childId: childId },
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    const handleBackButton = () => {
      setIsBackButtonClicked(true);
      Alert.alert(
        "경고",
        "다시 풀 수 없어요🥹",
        [
          {
            text: "퀴즈 계속풀기",
            onPress: () => setIsBackButtonClicked(false),
          },
        ],
        { cancelable: true }
      );
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackButton
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>오늘의 퀴즈, 오퀴도퀴!</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.questionNumber}>Q1.</Text>
        <Text style={styles.questionText}>세상의 '자원'은 무한하지 않다.</Text>
        <Image
          source={require("../assets/image/card1.png")}
          style={styles.quizImage}
        />
        {/* 수평으로 정렬된 이미지들 */}
        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={changeImage}>
            <Image source={imageSrc} style={styles.quizImage} />
          </TouchableOpacity>
          <TouchableOpacity onPress={changeImage2}>
            <Image source={imageSrc2} style={styles.quizImage} />
          </TouchableOpacity>
        </View>
      </View>

      {/* 더 큰 버튼 */}
      <TouchableOpacity style={styles.button} onPress={checkAnswer}>
        <Text style={styles.buttonText}>정답 확인하기</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    alignItems: "center",
  },
  header: {
    // backgroundColor: "#007BFF",
    // width: "100%",
    // padding: 20,
    // alignItems: "center",
    backgroundColor: "#007BFF",
    width: "100%",
    paddingVertical: 30,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
  headerText: {
    // fontSize: 20,
    // fontWeight: "bold",
    // color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  content: {
    // alignItems: "center",
    // marginTop: 20,
    alignItems: "center",
    marginTop: 40,
    paddingHorizontal: 15,
  },
  questionNumber: {
    // fontSize: 18,
    // fontWeight: "bold",
    // marginBottom: 10,
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  questionText: {
    // fontSize: 16,
    // textAlign: "center",
    // marginBottom: 20,
    fontSize: 18,
    textAlign: "center",
    marginBottom: 30,
    paddingHorizontal: 30,
    color: "#555",
  },
  // 이미지들을 수평으로 정렬하는 컨테이너
  imageContainer: {
    // flexDirection: "row",
    // justifyContent: "center",
    // marginBottom: 20,
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30,
  },
  quizImage: {
    // width: 150,
    // height: 150,
    // margin: 10,
    width: 160, // 크기 증가
    height: 160, // 크기 증가
    margin: 15,
    borderRadius: 10,
    borderColor: "#ddd",
  },
  imageHint: {
    width: 100,
    height: 100,
    marginTop: 20,
  },
  // 버튼을 더 크게 만든 스타일
  button: {
    // backgroundColor: "#007BFF",
    // paddingVertical: 20, // 높이를 키움
    // paddingHorizontal: 40, // 좌우 여백을 키움
    // borderRadius: 5,
    // marginTop: 30,
    // alignItems: "center",
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
    // fontSize: 18, // 글자 크기 조정
    // fontWeight: "bold",
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
});

export default QuizFirst;
