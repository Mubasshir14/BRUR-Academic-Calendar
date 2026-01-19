import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  TextInput,
  Pressable,
  StyleSheet,
} from "react-native";
import colors from "../theme/colors";
import { saveReminder } from "../utils/reminderStorage";
import { scheduleReminderNotification } from "../utils/notificationHelper";

export default function AddReminderModal({
  visible,
  triggerDate,
  onClose,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (visible) {
      setTitle("");
      setDescription("");
    }
  }, [visible]);

  const handleSave = async () => {
    if (!title.trim()) {
      alert("Title is required");
      return;
    }

    if (!triggerDate) {
      alert("Date & time not selected");
      return;
    }

    try {
      const notificationId =
        await scheduleReminderNotification({
          title,
          description,
          triggerDate,
        });

      const reminder = {
        id: Date.now().toString(),
        title,
        description,
        triggerDate: triggerDate.toISOString(),
        notificationId,
      };

      await saveReminder(reminder);

      onClose();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.box}>
          <Text style={styles.heading}>⏰ Add Reminder</Text>

          <Text style={styles.dateText}>
            📅 {triggerDate?.toLocaleString()}
          </Text>

          <TextInput
            placeholder="Title *"
            placeholderTextColor="#9E9E9E"
            value={title}
            onChangeText={setTitle}
            style={styles.input}
          />

          <TextInput
            placeholder="Description (optional)"
            placeholderTextColor="#9E9E9E"
            value={description}
            onChangeText={setDescription}
            style={[styles.input, { height: 80 }]}
            multiline
          />

          <Pressable style={styles.btn} onPress={handleSave}>
            <Text style={styles.btnText}>Save Reminder</Text>
          </Pressable>

          <Pressable onPress={onClose}>
            <Text style={styles.cancel}>Cancel</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 18,
  },
  heading: {
    fontSize: 18,
    fontFamily: "Arima_700Bold",
    marginBottom: 6,
  },
  dateText: {
    fontSize: 13,
    color: colors.textLight,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
  },
  btn: {
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 6,
  },
  btnText: {
    color: "#fff",
    fontFamily: "Arima_600SemiBold",
  },
  cancel: {
    marginTop: 10,
    textAlign: "center",
    color: colors.textLight,
  },
});
