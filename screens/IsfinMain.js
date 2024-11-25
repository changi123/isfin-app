import React, { useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  Button,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation, useRoute } from "@react-navigation/native";
import styles from "../assets/css/IsfinMainStyles";
const IsfinMain = () => {
  const navigation = useNavigation();

  const [user, setUser] = useState(null); // user 상태 관리
  const localIp = "http://172.30.1.1";
  // 로그인 상태 확인 함수
  const checkLogin = async () => {
    const userData = await AsyncStorage.getItem("user");

    if (userData === null) {
      setUser(null);
      console.log("로그인안함");
    } else {
      setUser(JSON.parse(userData));
      console.log("로그인 정보 : " + userData);
    }
  };

  // 화면이 포커스를 받을 때마다 로그인 상태 확인
  useFocusEffect(
    React.useCallback(() => {
      checkLogin(); // 사용자 데이터 확인
    }, []) // 빈 배열로 한 번만 실행되게 함
  );

  // 로그아웃 함수
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("user"); // 사용자 정보 삭제
      Alert.alert(
        "로그아웃 성공",
        "로그아웃 되었습니다.",
        [{ text: "확인", onPress: () => navigation.navigate("LoginCheck") }],
        { cancelable: false }
      );
    } catch (error) {
      Alert.alert("오류", "로그아웃에 실패했습니다.");
    }
  };

  const handleNavigate = () => {
    // Navigation function
  };
  const toCardMain = () => {
    navigation.navigate("card");
  };
  // 퀴즈
  const checkQuiz = async () => {
    console.log("checkQuiz start");
    try {
      if (user.type === "0") {
        const response = await axios.get(
          localIp + `:8080/points/quizpoints/${user.childId}`
        );
        const points_quiz = response.data;
        // console.log("points_quiz : ", points_quiz);
        navigation.navigate("QuizMain", { state: { points_quiz } });
      } else {
        navigation.navigate("QuizMain");
      }
    } catch (error) {
      console.error("로그인 안됨", error);
    }
  };
  // 동영상
  const checkVideo = () => {
    // Navigate to video page
  };
  // 미션
  const handleSelect = async () => {
    // AsyncStorage에서 사용자 정보 확인
    const user = JSON.parse(await AsyncStorage.getItem("user"));
    console.log("handleSelect start");

    // 비로그인
    if (user === null) {
      Alert.alert(
        "알림",
        "로그인을 해주세요!",
        [{ text: "확인", onPress: () => navigation.navigate("Login") }],
        { cancelable: false }
      );
    }
    if (user.type === "0") {
      const defaultResponse = await axios.get(
        localIp + `:8080/mission/parents/todayChild/${user.childId}`
      );
      console.log(defaultResponse.data);
      navigation.navigate("MissionPage", {
        childList: [user],
        defaultResponse: defaultResponse.data,
      });
    } else {
      // 부모가 클릭
      try {
        const response = await axios.get(
          localIp + `:8080/mission/parents/${user.parentId}`
        );

        if (response.data.length === 0) {
          // 아이가 없는 경우
          Alert.alert(
            "알림",
            "카드 발급을 먼저 해주세요.",
            [
              {
                text: "확인",
                onPress: () => {
                  console.log("카드 발급 필요");
                },
              },
            ],
            { cancelable: false }
          );
        }
        // const childList = response.data;
        // console.log(response.data[0]);
        const defaultResponse = await axios.get(
          localIp +
            `:8080/mission/parents/todayChild/${response.data[0].childId}`
        );
        // console.log(defaultResponse);

        navigation.navigate("MissionPage", {
          childList: response.data,
          defaultResponse: defaultResponse.data,
        });
      } catch (error) {}
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require("../assets/image/main_image1.png")}
          style={styles.headerImage}
        />
        <TouchableOpacity onPress={handleNavigate} style={styles.menuButton}>
          {/* Menu icon can be added here */}
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View style={styles.mainContent}>
        <Text style={styles.mainTitle}>아이스핀</Text>
        <Text style={styles.subTitle}>우리 아이의 스타트 핀테크</Text>
        <Image
          source={require("../assets/image/main_image2.png")}
          style={styles.mainImage}
        />
        <TouchableOpacity onPress={toCardMain} style={styles.cardButton}>
          <Text style={styles.cardButtonText}>아이스핀 카드 신청하기</Text>
        </TouchableOpacity>
      </View>

      {/* 오늘의 미션 */}
      <View style={styles.missionSection}>
        <Text style={styles.sectionTitle}>오늘의 미션</Text>
        <Text style={styles.missionSubtitle}>부모님이 만들고 아이가 실천!</Text>
        <Text style={styles.missionDescription}>
          부모님이 원하는 미션을 만들고{"\n"}
          아이가 실천하며 보상이 주어져요!{"\n"}
        </Text>
        <Image
          source={require("../assets/image/main_image3.png")}
          style={styles.missionImage}
        />
        <TouchableOpacity onPress={handleSelect} style={styles.missionButton}>
          <Text style={styles.missionButtonText}>오늘의 미션 확인하기</Text>
        </TouchableOpacity>
      </View>

      {/* 경제 교육 Section */}
      <View style={styles.educationSection}>
        <Text style={styles.sectionTitle}>경제 교육</Text>
        <Text style={styles.educationSubtitle}>
          재밌는 퀴즈와 영상으로 배워봐요!
        </Text>
        <Text style={styles.educationDescription}>
          우리 아이의 경제 교육을 퀴즈와 유익한 동영상으로 시작해요.
        </Text>
        <Image
          source={require("../assets/image/main_image4.png")}
          style={styles.educationImage}
        />
        <TouchableOpacity onPress={checkQuiz} style={styles.educationButton}>
          <Text style={styles.educationButtonText}>퀴즈 풀기</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={checkVideo} style={styles.educationButton}>
          <Text style={styles.educationButtonText}>동영상 보기</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>아이스핀 카드</Text>
        <TouchableOpacity>
          <Text style={styles.footerLink}>고객센터 | 이용약관</Text>
        </TouchableOpacity>
      </View>
      {/* 로그아웃 버튼 */}
      {user && (
        <View style={styles.logoutButtonContainer}>
          <Button title="로그아웃" onPress={handleLogout} />
        </View>
      )}
    </ScrollView>
  );
};

export default IsfinMain;
