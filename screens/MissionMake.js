import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../assets/css/MissionMakeStyles";
function MissionMake() {
  const route = useRoute();
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [rewardMoney, setRewardMoney] = useState("");
  const [child, setChild] = useState(route.params.child);
  const childList = route.params.childList;
  const localIp = "http://192.168.219.70";
  const getCurrentDate = () => {
    const currentDate = new Date();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    return `${month}월 ${day}일`;
  };

  const [charCount, setCharCount] = useState(0);
  const maxCharCount = 20;
  const [charCount2, setCharCount2] = useState(0);
  const maxCharCount2 = 40;

  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = await AsyncStorage.getItem("user");
      setUser(JSON.parse(storedUser));
    };
    fetchUser();
  }, []);

  const handleInputTitleChange = (e) => {
    const inputValue = e;
    setTitle(inputValue);
    const newCharCount =
      inputValue.length > maxCharCount ? maxCharCount : inputValue.length;
    setCharCount(newCharCount);
  };

  const handleInputContentChange = (e) => {
    const inputValue = e;
    setContent(inputValue);
    const newCharCount2 =
      inputValue.length > maxCharCount2 ? maxCharCount2 : inputValue.length;
    setCharCount2(newCharCount2);
  };

  const [isRewardSet, setIsRewardSet] = useState(true);
  const handleNoReward = () => {
    setRewardMoney("0");
    setIsRewardSet(false);
  };

  const handleChildClick = (child) => {
    setChild(child);
  };

  const formatRewardMoney = (value) => {
    return value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleInputChange = (e) => {
    const formattedValue = formatRewardMoney(e);
    setRewardMoney(formattedValue);
  };

  const handleMission = async () => {
    console.log("handleMission start");
    if (title.length === 0) {
      return;
    }

    const data = {
      child: child,
      title: title,
      content: content,
      rewardMoney: rewardMoney.replace(/,/g, ""),
      parent: user,
    };

    try {
      const response = await axios.post(
        localIp + ":8080/mission/register",
        data
      );
      const defaultResponse = await axios.get(
        localIp + `:8080/mission/parents/todayChild/${childList[0].childId}`
      );

      navigation.navigate("MissionPage", {
        childList: childList,
        defaultResponse: defaultResponse.data,
      });
    } catch (error) {
      // handle error here
    }
  };

  // 오늘의 미션 등록 버튼
  const handleContentCheck = () => {
    console.log("handleContentCheck start");
    if (
      title.length === 0 ||
      content.length === 0 ||
      rewardMoney.length === 0
    ) {
      Alert.alert("알림", "값을 입력해주세요.");
      return;
    } else {
      Alert.alert(
        "알림",
        "오늘의 미션 등록 성공!\n미션 성공 시 연결된 계좌에서 용돈이 출금돼요.",
        [
          {
            text: "확인",
            onPress: () => handleMission(),
          },
        ]
      );
    }
  };

  if (!user) {
    return <Text>로딩 중...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>미션 I`m Possible!</Text>
      <Text style={styles.date}>{getCurrentDate()}</Text>
      <Text style={styles.childInfo}>도전하는 아이 : {child.name}</Text>
      <Text style={styles.subtitle}>어떤 미션을 해볼까요?</Text>

      {/* 제목 입력 */}
      <TextInput
        placeholder="미션 제목을 입력해 주세요."
        value={title}
        maxLength={20}
        onChangeText={handleInputTitleChange}
        style={styles.input}
      />
      <Text style={styles.charCount}>{`${charCount}/${maxCharCount}`}</Text>

      {/* 내용 입력 */}
      <TextInput
        placeholder="미션 내용을 입력해 주세요."
        value={content}
        maxLength={40}
        onChangeText={handleInputContentChange}
        multiline
        style={[styles.input, styles.textarea]}
      />
      <Text style={styles.charCount}>{`${charCount2}/${maxCharCount2}`}</Text>

      {/* 용돈 설정 */}
      <TouchableOpacity onPress={handleNoReward} style={styles.noRewardButton}>
        <Text style={styles.noRewardText}>
          {isRewardSet ? "설정 안함" : "설정됨"}
        </Text>
      </TouchableOpacity>

      <Text style={styles.subtitle}>용돈을 설정해 볼까요?</Text>

      <TextInput
        value={rewardMoney}
        onChangeText={handleInputChange}
        keyboardType="numeric"
        placeholder="용돈 금액"
        style={styles.input}
      />

      {/* 미션 등록 버튼 */}
      <Button title="오늘의 미션 등록하기" onPress={handleContentCheck} />
    </View>
  );
}

export default MissionMake;
