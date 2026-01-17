// import AsyncStorage from "@react-native-async-storage/async-storage";

// const KEY = "BRUR_REMINDERS";

// export async function saveReminder(reminder) {
//   const existing = await getReminders();
//   const updated = [...existing, reminder];
//   await AsyncStorage.setItem(KEY, JSON.stringify(updated));
// }

// export async function getReminders() {
//   const data = await AsyncStorage.getItem(KEY);
//   return data ? JSON.parse(data) : [];
// }

import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "BRUR_REMINDERS";

export async function getReminders() {
  const data = await AsyncStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
}

export async function saveReminder(reminder) {
  const existing = await getReminders();
  const updated = [...existing, reminder];
  await AsyncStorage.setItem(KEY, JSON.stringify(updated));
}

export async function deleteReminder(id) {
  const existing = await getReminders();
  const updated = existing.filter(r => r.id !== id);
  await AsyncStorage.setItem(KEY, JSON.stringify(updated));
}
