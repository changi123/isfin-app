import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    paddingVertical: 20,
    backgroundColor: "#007bff",
    alignItems: "center",
  },
  headerText: {
    fontSize: 26,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  mainSection: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    elevation: 5, // 그림자 효과 추가
  },
  subTitle: {
    fontSize: 18,
    color: "#00085A",
    fontWeight: "bold",
    textAlign: "center",
  },
  title: {
    fontSize: 22,
    color: "#00085A",
    textAlign: "center",
    marginVertical: 10,
  },
  lineBreak: {
    marginTop: 5,
  },
  mainImage: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
    marginTop: 20,
  },
  note: {
    fontSize: 12,
    color: "#888",
    textAlign: "center",
    marginTop: 10,
  },
  bodyTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 20,
    marginTop: 30,
    textAlign: "center",
    color: "#00085A",
  },
  cardList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    marginTop: 20,
    paddingHorizontal: 10,
  },
  cardBox: {
    width: "45%",
    marginBottom: 20,
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5, // 그림자 효과 추가
  },
  cardImage: {
    width: "100%",
    height: 120,
    resizeMode: "contain",
    borderRadius: 8,
    marginBottom: 10,
  },
  cardName: {
    fontSize: 16,
    color: "#00085A",
    textAlign: "center",
  },
  bottomSection: {
    marginTop: 30,
    alignItems: "center",
    paddingVertical: 20,
  },
  bottomText: {
    fontSize: 14,
    color: "#00085A",
    textAlign: "center",
  },
  bottomLink: {
    marginTop: 10,
  },
  bottomLinkText: {
    fontSize: 16,
    color: "#007bff",
    textDecorationLine: "underline",
    textAlign: "center",
  },
});

export default styles;
