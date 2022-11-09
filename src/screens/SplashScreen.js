// Email Authentication using Firebase Authentication in React Native App


// Import React and Component
import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ActivityIndicator,
  Text,
  View,
  StyleSheet,
  Image,
  ImageBackground
} from "react-native";

import auth from "@react-native-firebase/auth";

const SplashScreen = ({ navigation }) => {
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      // Check if currentUser is set or not
      // If not then send for Authentication
      // else send to Home Screen
      navigation.replace(
        auth().currentUser ? "Home" : "Login"
      );
    }, 5000);
  }, []);

  return (
    <SafeAreaView
      // style={{ flex: 1, backgroundColor: "#307ecc" }}
      style={{ flex: 1, backgroundColor: "white" }}

    >
     
      <View style={styles.container}>
        <Image
          source={require("../assets/logo.png")}
          style={{
            width: "90%",
            resizeMode: "contain",
            margin: 30,
          }}
        />
        <ActivityIndicator
          animating={animating}
          color="black"
          size="large"
          style={styles.activityIndicator}
        />
      </View>
     
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    opacity:1,

  },
  activityIndicator: {
    alignItems: "center",
    height: 80,
  },
});
