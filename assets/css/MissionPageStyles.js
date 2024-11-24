import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24, // 여백을 좀 더 넉넉하게
    backgroundColor: "#f0f8ff", // 연한 파란색 배경
  },
  header: {
    fontSize: 32, // 헤더 텍스트 크기 증가
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24, // 여백 증가
    color: "#1E90FF", // 강한 파란색 텍스트
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 30, // 버튼 그룹 아래 여백 증가
  },
  button: {
    backgroundColor: "#1E90FF", // 버튼 색상 강한 파란색
    paddingVertical: 14, // 버튼 세로 패딩 늘리기
    paddingHorizontal: 20, // 버튼 가로 패딩 늘리기
    borderRadius: 10, // 버튼 모서리 둥글게
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    width: "45%", // 버튼 크기 증가
  },
  buttonText: {
    color: "#fff",
    fontSize: 18, // 텍스트 크기 증가
    fontWeight: "bold",
    textAlign: "center",
  },
  childButtonGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 32, // 버튼 그룹 아래 여백 증가
  },
  selectedButton: {
    borderColor: "#1E90FF",
    borderWidth: 2,
    padding: 12, // 버튼 패딩 늘리기
    borderRadius: 10,
    backgroundColor: "#e6f7ff", // 연한 파란색 배경
    width: "48%", // 버튼 크기 증가
    marginBottom: 14, // 여백 증가
  },
  unselectedButton: {
    padding: 12, // 버튼 패딩 늘리기
    borderRadius: 10,
    backgroundColor: "#fff",
    borderColor: "#ddd",
    borderWidth: 2,
    width: "48%", // 버튼 크기 증가
    marginBottom: 14, // 여백 증가
  },
  childImage: {
    width: 70, // 이미지 크기 증가
    height: 70,
    borderRadius: 35, // 이미지 둥글게
    marginBottom: 12, // 여백 증가
    alignSelf: "center", // 이미지 가운데 정렬
  },
  childName: {
    textAlign: "center",
    fontSize: 16, // 이름 텍스트 크기 증가
    fontWeight: "bold",
    color: "#333",
  },
  content: {
    marginTop: 30, // 콘텐츠와 상단 간격 증가
  },
  textContainer: {
    marginBottom: 24, // 텍스트 간격 증가
  },
  date: {
    fontSize: 18, // 날짜 크기 증가
    fontWeight: "bold",
    color: "#555",
    marginBottom: 10, // 여백 증가
  },
  title: {
    fontSize: 30, // 타이틀 크기 증가
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10, // 여백 증가
  },
  detail: {
    fontSize: 16, // 상세 내용 크기 증가
    color: "#333",
    marginBottom: 10, // 여백 증가
  },
  reward: {
    fontSize: 20, // 보상 텍스트 크기 증가
    fontWeight: "bold",
    color: "#32CD32", // 초록색
    marginBottom: 12, // 여백 증가
  },
  result: {
    fontSize: 16, // 결과 텍스트 크기 증가
    fontWeight: "bold",
    color: "#ff6347", // 빨간색
    marginBottom: 12, // 여백 증가
  },
  noMissionText: {
    fontSize: 18, // 텍스트 크기 증가
    color: "#555",
    textAlign: "center",
    marginBottom: 24, // 여백 증가
  },
  childButton: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20, // 여백 증가
  },
  image: {
    width: 180, // 이미지 크기 증가
    height: 180,
    resizeMode: "contain",
    alignSelf: "center", // 이미지 가운데 정렬
    marginBottom: 32, // 여백 증가
  },
});

export default styles;
