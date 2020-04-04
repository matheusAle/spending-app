import posed from "react-native-pose";

export default posed.View({
  visible: {
    borderRadius: 50,
    transition: { duration: 300 },
  },
  hidden: {
    borderRadius: 0,
    transition: { duration: 150 },
  },
  passive: {
    backgroundColor: ['borderRadius', {
      inputRange: [0, 15],
      outputRange: ['transparent', 'white']
    }]
  }
});
