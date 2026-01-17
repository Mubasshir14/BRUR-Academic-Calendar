import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../theme/colors";
import { holidays } from "../data/holidays";

function getNextHoliday() {
  const today = new Date().toISOString().split("T")[0];

  const futureDates = Object.keys(holidays)
    .filter(date => date > today)
    .sort();

  if (futureDates.length === 0) return null;

  const nextDate = futureDates[0];

  return {
    date: nextDate,
    name: holidays[nextDate].name,
  };
}

export default function NextHolidayCard() {
  const nextHoliday = getNextHoliday();

  if (!nextHoliday) return null;

  return (
    <View style={styles.card}>
      <Text style={styles.title}>📌 Upcoming Holiday</Text>
      <Text style={styles.date}>📅 {nextHoliday.date}</Text>
      <Text style={styles.name}>🎉 {nextHoliday.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 20,
    marginHorizontal: 16,
    padding: 7,
    backgroundColor: "#E8F5E9",
    borderRadius: 18,
    elevation: 3,
  },

  title: {
    fontSize: 16,
    fontFamily: "Arima_700Bold",
    color: colors.primary,
    marginBottom: 6,
  },

  date: {
    fontSize: 14,
    fontFamily: "Arima_500Medium",
    color: colors.textDark,
  },

  name: {
    marginTop: 4,
    fontSize: 15,
    fontFamily: "Arima_600SemiBold",
    color: colors.holidayGreen,
  },
});
