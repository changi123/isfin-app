import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20, // 좌우 여백 추가
    backgroundColor: "#f4f4f4", // 배경 색상
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#00085a", // 헤더 텍스트 색상
    marginBottom: 10, // 아래쪽 간격
  },
  subHeader: {
    fontSize: 16,
    color: "#555", // 서브 헤더 텍스트 색상
    marginBottom: 20, // 아래쪽 간격
  },
  radioContainer: {
    flexDirection: "row", // 라디오 버튼들을 가로로 배치
    justifyContent: "center", // 가로 중앙 정렬
    marginBottom: 20, // 라디오 버튼과 인풋 사이의 간격
  },
  radioWrapper: {
    marginHorizontal: 10, // 라디오 버튼들 사이의 간격
  },
  input: {
    width: "100%", // 입력 필드의 너비를 부모 요소에 맞게 설정
    height: 46,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#fff",
    fontSize: 16,
    paddingLeft: 20,
    marginBottom: 15, // 각 인풋 간의 간격 설정
  },
  buttonContainer: {
    width: "100%", // 버튼의 너비를 부모 요소에 맞게 설정
    marginTop: 20, // 버튼과 그 위 요소 간격
  },
});

export default styles;
