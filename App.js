// import React from "react";
// import { View, ActivityIndicator } from "react-native";
// import CalendarScreen from "./src/screens/CalendarScreen";
// import { useFonts } from "expo-font";
// import {
//   Arima_400Regular,
//   Arima_500Medium,
//   Arima_600SemiBold,
//   Arima_700Bold
// } from "@expo-google-fonts/arima";

// export default function App() {
//   const [fontsLoaded] = useFonts({
//     Arima_400Regular,
//     Arima_500Medium,
//     Arima_600SemiBold,
//     Arima_700Bold
//   });

//   if (!fontsLoaded) {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <ActivityIndicator size="large" />
//       </View>
//     );
//   }

//   return <CalendarScreen />;
// }

// import React, { useState } from "react";
// import { View, ActivityIndicator } from "react-native";
// import CalendarScreen from "./src/screens/CalendarScreen";
// import { useFonts } from "expo-font";
// import {
//   Arima_400Regular,
//   Arima_500Medium,
//   Arima_600SemiBold,
//   Arima_700Bold,
// } from "@expo-google-fonts/arima";
// import WelcomeAnimation from "./src/screens/WelcomeAnimation";

// export default function App() {
//   const [fontsLoaded] = useFonts({
//     Arima_400Regular,
//     Arima_500Medium,
//     Arima_600SemiBold,
//     Arima_700Bold,
//   });

//   const [showWelcome, setShowWelcome] = useState(true);

//   if (!fontsLoaded) {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <ActivityIndicator size="large" />
//       </View>
//     );
//   }

//   if (showWelcome) {
//     return <WelcomeAnimation onFinish={() => setShowWelcome(false)} />;
//   }

//   return <CalendarScreen />;
// }

import React, { useState, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import CalendarScreen from "./src/screens/CalendarScreen";
import WelcomeAnimation from "./src/screens/WelcomeAnimation";
import { useFonts } from "expo-font";
import {
  Arima_400Regular,
  Arima_500Medium,
  Arima_600SemiBold,
  Arima_700Bold,
} from "@expo-google-fonts/arima";

import * as Notifications from "expo-notifications";

/* 🔔 Notification global handler */
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [fontsLoaded] = useFonts({
    Arima_400Regular,
    Arima_500Medium,
    Arima_600SemiBold,
    Arima_700Bold,
  });

  const [showWelcome, setShowWelcome] = useState(true);

  /* 🔔 Request notification permission on app start */
  useEffect(() => {
    (async () => {
      // 🔔 Permission
      const { status } = await Notifications.requestPermissionsAsync();

      if (status !== "granted") {
        alert("Notification permission denied");
        return;
      }

      // 🔊 Android notification channel (MANDATORY)
      await Notifications.setNotificationChannelAsync("reminder", {
        name: "Reminders",
        importance: Notifications.AndroidImportance.HIGH,
        sound: "default",
      });
    })();
  }, []);

  if (!fontsLoaded) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (showWelcome) {
    return <WelcomeAnimation onFinish={() => setShowWelcome(false)} />;
  }

  return <CalendarScreen />;
}
