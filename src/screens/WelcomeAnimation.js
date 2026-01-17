import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Image,
} from "react-native";
import colors from "../theme/colors";

export default function WelcomeAnimation({ onFinish }) {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start();

    // ⏳ 2.5 second por auto hide
    const timer = setTimeout(() => {
      onFinish();
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.card,
          {
            opacity,
            transform: [{ scale }],
          },
        ]}
      >
        <Text style={styles.title}>🎓 Welcome</Text>

        {/* ✅ BRUR Logo */}
        <Image
          source={{
            uri: "https://i.ibb.co.com/X9Pny3n/BRUR-Logo-svg.png",
          }}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.subtitle}>
          BRUR Academic Calendar
        </Text>

        <Text style={styles.message}>
          Stay updated with holidays & events
        </Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    width: "85%",
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: "center",
    elevation: 6,
  },

  title: {
    fontSize: 26,
    fontFamily: "Arima_700Bold",
    color: colors.primary,
    marginBottom: 8,
  },

  logo: {
    width: 90,
    height: 90,
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 18,
    fontFamily: "Arima_600SemiBold",
    color: colors.textDark,
  },

  message: {
    marginTop: 8,
    fontSize: 14,
    fontFamily: "Arima_400Regular",
    color: colors.textLight,
    textAlign: "center",
  },
});
