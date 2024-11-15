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
const IsfinMain = () => {
  const navigation = useNavigation();

  const [user, setUser] = useState(null); // user 상태 관리

  // 로그인 상태 확인 함수
  const checkLogin = async () => {
    const userData = await AsyncStorage.getItem("user");
    if (userData === null) {
      setUser(null);
    } else {
      setUser(JSON.parse(userData));
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
  const toCardMain = async () => {
    try {
      // AsyncStorage에서 사용자 정보 확인
      const user = JSON.parse(await AsyncStorage.getItem("user"));
      // 비로그인시
      if (user === null) {
        Alert.alert(
          "알림",
          "로그인을 해주세요!",
          [{ text: "확인", onPress: () => navigation.navigate("Login") }],
          { cancelable: false }
        );
      } else if (user.type === "0") {
        // 카드 신청은 부모만 접근 가능
        Alert.alert("알림", "부모님만 가능해요!", [{ text: "확인" }], {
          cancelable: false,
        });
      } else {
        // 부모가 맞다면
        try {
          const response = await axios.get(
            `http://172.30.1.85:8080/mission/parents/${user.parentId}`
          );
          if (response.data.length === 0) {
            Alert.alert(
              "알림",
              "카드 발급 / 카드 연동을 먼저 해주세요.",
              [{ text: "확인", onPress: () => {} }],
              { cancelable: false }
            );
            return;
          }
          const childList = response.data;
          const defaultResponse = await axios.get(
            `http://172.30.1.85:8080/mission/parents/todayChild/${childList[0].childId}`
          );
          navigation.navigate("MissionPage", {
            childList: childList,
            defaultResponse: defaultResponse.data,
          });
        } catch (error) {
          console.error(error);
        }
      }
    } catch (error) {
      console.error("Error checking login status:", error);
    }
  };
  // 퀴즈
  const checkQuiz = () => {
    // Navigate to quiz page
  };
  // 동영상
  const checkVideo = () => {
    // Navigate to video page
  };
  // 미션
  const handleSelect = async () => {
    // AsyncStorage에서 사용자 정보 확인
    const user = JSON.parse(await AsyncStorage.getItem("user"));
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
        `http://172.30.1.85:8080/mission/parents/todayChild/${user.childId}`
      );

      // navigation.navigate("MissionPage", {
      //   childList: [user],
      //   defaultResponse: defaultResponse.data,
      // });
    } else {
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require("../assets/main_image1.png")}
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
          source={require("../assets/main_image2.png")}
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
          source={require("../assets/main_image3.png")}
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
          source={require("../assets/main_image4.png")}
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

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 50,
    backgroundColor: "#f7f8fa", // 배경 색상
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  headerImage: {
    width: 110,
    height: 160,
    borderRadius: 10, // 이미지 둥글게
    marginTop: 30, // 이미지 위에 여백을 추가하여 아래로 내림
  },
  menuButton: {
    position: "absolute",
    right: 10,
    top: -50,
  },
  mainContent: {
    alignItems: "center",
    marginTop: 30,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5, // 그림자 효과 추가
    marginBottom: 30,
  },
  mainTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
  },
  subTitle: {
    fontSize: 18,
    color: "#777",
    marginVertical: 5,
  },
  mainImage: {
    width: "90%",
    height: 200,
    borderRadius: 10,
    resizeMode: "cover",
  },
  cardButton: {
    marginVertical: 20,
    padding: 15,
    backgroundColor: "#007BFF",
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  cardButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  missionSection: {
    alignItems: "center",
    marginTop: 30,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5, // 그림자 효과 추가
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  missionSubtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#555",
    marginVertical: 8,
  },
  missionDescription: {
    fontSize: 14,
    textAlign: "center",
    color: "#666",
    marginVertical: 10,
    // backgroundColor: "red",
  },
  missionImage: {
    width: 250,
    height: 150,
    resizeMode: "contain",
    marginVertical: 10,
    // backgroundColor: "red",
  },
  missionButton: {
    padding: 12,
    backgroundColor: "#007BFF",
    borderRadius: 5,
    width: "80%",
    alignItems: "center",
    marginTop: 10,
  },
  missionButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  educationSection: {
    alignItems: "center",
    marginTop: 30,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5, // 그림자 효과 추가
    marginBottom: 30,
  },
  educationSubtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#333",
    marginVertical: 8,
  },
  educationDescription: {
    fontSize: 14,
    textAlign: "center",
    color: "#666",
    marginVertical: 8,
  },
  educationImage: {
    width: 300,
    height: 200,
    resizeMode: "contain",
    marginBottom: 20,
  },
  educationButton: {
    marginVertical: 10,
    padding: 12,
    backgroundColor: "#007BFF",
    borderRadius: 5,
    width: "80%",
    alignItems: "center",
  },
  educationButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  footer: {
    alignItems: "center",
    marginTop: 20,
    padding: 16,
  },
  footerText: {
    fontSize: 18,
  },
  footerLink: {
    fontSize: 14,
  },
});

export default IsfinMain;
