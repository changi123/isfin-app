import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#00085A",
    marginBottom: 20,
    textAlign: "center",
  },
  cardName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#00085A",
    textAlign: "center",
    marginBottom: 10,
  },
  cardImageBox: {
    alignItems: "center",
    marginBottom: 20,
  },
  cardImage: {
    width: 200,
    height: 120,
    resizeMode: "contain",
  },
  registerBackground: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  registerBody: {
    marginBottom: 20,
  },
  registerTop: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#00085A",
    marginBottom: 20,
    textAlign: "center",
  },
  registerInputBox: {
    marginBottom: 15,
  },
  registerSubTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#00085A",
    marginBottom: 5,
  },
  registerIdCheckBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  registerIdInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    flex: 1,
    marginRight: 10,
  },
  registerIdCheckButton: {
    backgroundColor: "#007bff",
    color: "#fff",
  },
  registerInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 5,
  },
  registerEmptyId: {
    color: "red",
    fontSize: 12,
  },
  registerIdCheckWrong: {
    color: "red",
    fontSize: 12,
  },
  registerSubmitButtonBox: {
    marginTop: 20,
  },
  registerSubmitButton: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: 10,
    borderRadius: 5,
  },
});

export default styles;
