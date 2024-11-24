import { StyleSheet } from "react-native";
const styles = {
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    justifyContent: "center", // 수직 중앙 정렬
    alignItems: "center", // 수평 중앙 정렬
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#00085A",
  },
  subHeader: {
    fontSize: 16,
    marginBottom: 30,
    color: "#00085A",
  },
  inputBox: {
    width: "100%", // 화면 너비에 맞추기 위해
    maxWidth: 400, // 최대 너비 설정 (필요에 따라 조정)
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: "#00085A",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#00085A",
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#007bff",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: "center",
    width: "100%", // 버튼이 입력란과 같은 너비를 갖도록 설정
    maxWidth: 400, // 버튼 최대 너비 설정 (필요에 따라 조정)
    marginTop: 20, // 입력 필드와 버튼 사이 여백
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
};

export default styles;
