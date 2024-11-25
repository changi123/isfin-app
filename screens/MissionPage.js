import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Image,
  Alert,
  StyleSheet,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import styles from "../assets/css/MissionPageStyles";
function MissionPage({ navigation, route }) {
  const [user, setUser] = useState(null);
  const [check, setCheck] = useState("0");
  const [childList, setChildList] = useState(route.params.childList || []);
  const [defaultResponse, setDefaultResponse] = useState(
    route.params.defaultResponse || {}
  );
  const [child, setChild] = useState(childList[0]);
  const localIp = "http://172.30.1.1";
  const imageMapper = {
    "../assets/image/1rank.png": require("../assets/image/1rank.png"),
    "../assets/image/2rank.png": require("../assets/image/2rank.png"),
    "../assets/image/3rank.png": require("../assets/image/3rank.png"),
  };

  //   console.log(child.rank.image);
  const [select, setSelect] = useState(child?.childId || "");

  useEffect(() => {
    const loadUser = async () => {
      const userData = await AsyncStorage.getItem("user");
      if (userData) setUser(JSON.parse(userData));
    };
    loadUser();
  }, []);

  // 미션 만들기 버튼 클릭
  const handleButtonClick = async () => {
    console.log("handleButtonClick start");
    try {
      const response = await axios.get(
        localIp + `:8080/mission/parents/${user.parentId}`
      );

      const childList = response.data;
      navigation.navigate("MissionMake", { child, childList });
    } catch (error) {
      Alert.alert("Error", "Failed to fetch data.");
    }
  };

  // 아이 클릭
  const handleChildClick = async (child) => {
    console.log("handleChildClick start");
    setChild(child);
    setCheck("0");
    setSelect(child.childId);
    try {
      const response = await axios.get(
        localIp + `:8080/mission/parents/todayChild/${child.childId}`
      );
      setDefaultResponse(response.data);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch mission data.");
    }
  };

  // 이전 미션 내역
  const handleHistory = async () => {
    console.log("handleHistory start");
    try {
      const endpoint =
        user.type === "1"
          ? localIp + ":8080/mission/parents/history"
          : localIp + ":8080/mission/child/history";
      const response = await axios.get(endpoint);
      navigation.navigate("MissionHistory", { historyList: response.data });
    } catch (error) {
      Alert.alert("Error", "Failed to fetch mission history.");
    }
  };

  // 미션 완료 버튼 클릭
  const handleMissionUpdate = async (defaultResponse) => {
    console.log("handleMissionUpdate start");
    setCheck("1");
    const data = {
      missionId: defaultResponse.missionId,
      child: child,
      title: defaultResponse.title,
      content: defaultResponse.content,
      result: true,
      rewardMoney: defaultResponse.rewardMoney,
      parent: user,
    };
    try {
      await axios.put(localIp + ":8080/mission/parent/update", data);
      Alert.alert("리워드 적립완료");
    } catch (error) {
      Alert.alert("Error", "Failed to update mission.");
    }
  };

  const getCurrentDate = () => {
    const currentDate = new Date();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    return `${month}월 ${day}일`;
  };

  const formatDateFromTimestamp = (timestamp) => {
    const dateObject = new Date(timestamp);
    const month = dateObject.getMonth() + 1;
    const day = dateObject.getDate();
    return `${month}월 ${day}일`;
  };

  const formatDateFromTimestamp2 = (timestamp) => {
    const dateObject = new Date(timestamp);
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1;
    const day = dateObject.getDate();
    return `${year}.${month}.${day}`;
  };

  const formatRewardMoney = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>미션 I`m Possible!</Text>
      <View style={styles.buttonGroup}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>오늘의 미션</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.button} onPress={handleHistory}>
          <Text style={styles.buttonText}>이전 미션 내역</Text>
        </TouchableOpacity> */}
      </View>
      {user?.type === "0" ? (
        <View style={styles.childButton}>
          <Image
            source={require("../assets/image/main_image1.png")}
            style={styles.image}
          />
        </View>
      ) : (
        <View style={styles.childButtonGroup}>
          {childList.map((child, index) => (
            <TouchableOpacity
              key={child.childId}
              style={
                select === child.childId
                  ? styles.selectedButton
                  : styles.unselectedButton
              }
              onPress={() => handleChildClick(child)}
            >
              <Image
                source={imageMapper[child.rank.image]}
                style={styles.childImage}
              />
              <Text style={styles.childName}>{child.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
      <View style={styles.content}>
        {user?.type === "1" ? (
          <>
            {formatDateFromTimestamp(defaultResponse.date) ===
              getCurrentDate() && defaultResponse.result !== true ? (
              <>
                <View style={styles.textContainer}>
                  <Text style={styles.title}>{defaultResponse.title}</Text>
                  <Text style={styles.date}>
                    {formatDateFromTimestamp2(defaultResponse.date)}
                  </Text>
                </View>
                <Text style={styles.detail}>{defaultResponse.content}</Text>
                <Text style={styles.reward}>
                  {formatRewardMoney(defaultResponse.rewardMoney)}원
                </Text>
                <Text style={styles.result}>
                  {defaultResponse.result === 1 ? "도전완료" : "도전중"}
                </Text>
                {check === "0" ? (
                  <Button
                    title="오늘의 미션 성공 처리하기"
                    onPress={() => handleMissionUpdate(defaultResponse)}
                  />
                ) : (
                  <Button
                    title="오늘의 미션 성공!"
                    disabled
                    onPress={() => handleMissionUpdate(defaultResponse)}
                  />
                )}
              </>
            ) : (
              <>
                <Text style={styles.noMissionText}>
                  진행중인 미션이 없어요.
                </Text>
                <Button title="+ 만들기" onPress={handleButtonClick} />
              </>
            )}
          </>
        ) : (
          <>
            {formatDateFromTimestamp(defaultResponse.date) ===
              getCurrentDate() && defaultResponse.result !== true ? (
              <>
                <View style={styles.textContainer}>
                  <Text style={styles.title}>{defaultResponse.title}</Text>
                  <Text style={styles.date}>
                    {formatDateFromTimestamp2(defaultResponse.date)}
                  </Text>
                </View>
                <Text style={styles.detail}>{defaultResponse.content}</Text>
                <Text style={styles.reward}>
                  {formatRewardMoney(defaultResponse.rewardMoney)}원
                </Text>
                <Text style={styles.result}>
                  {defaultResponse.result === 1 ? "도전완료" : "도전중"}
                </Text>
              </>
            ) : (
              <Text style={styles.noMissionText}>진행중인 미션이 없어요.</Text>
            )}
          </>
        )}
      </View>
    </ScrollView>
  );
}

export default MissionPage;
