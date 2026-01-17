import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  ScrollView,
  Pressable,
} from "react-native";
import colors from "../theme/colors";
import { holidays } from "../data/holidays";

export default function HolidayListModal({ visible, onClose }) {
  const sortedDates = Object.keys(holidays).sort();

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modalBox}>
          <Text style={styles.title}>📅 All Holidays – 2026</Text>

          <ScrollView showsVerticalScrollIndicator={false}>
            {sortedDates.map(date => (
              <View key={date} style={styles.item}>
                <Text style={styles.date}>📆 {date}</Text>
                <Text style={styles.name}>🎉 {holidays[date].name}</Text>
              </View>
            ))}
          </ScrollView>

          <Pressable style={styles.closeBtn} onPress={onClose}>
            <Text style={styles.closeText}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalBox: {
    width: "90%",
    maxHeight: "80%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 18,
  },

  title: {
    fontSize: 18,
    fontFamily: "Arima_700Bold",
    marginBottom: 12,
    color: colors.primary,
    textAlign: "center",
  },

  item: {
    backgroundColor: "#F4F6F8",
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
  },

  date: {
    fontSize: 13,
    fontFamily: "Arima_500Medium",
    color: colors.textDark,
  },

  name: {
    marginTop: 2,
    fontSize: 14,
    fontFamily: "Arima_600SemiBold",
    color: colors.holidayGreen,
  },

  closeBtn: {
    marginTop: 10,
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: "center",
  },

  closeText: {
    color: "#fff",
    fontFamily: "Arima_600SemiBold",
  },
});
