// import * as Notifications from "expo-notifications";

// export async function scheduleReminderNotification({
//   title,
//   description,
//   triggerDate, // 🔴 Date object (date + time)
// }) {
//   if (!(triggerDate instanceof Date)) {
//     throw new Error("triggerDate must be a Date object");
//   }

//   if (triggerDate <= new Date()) {
//     throw new Error("Trigger time must be in the future");
//   }

//   return await Notifications.scheduleNotificationAsync({
//     content: {
//       title,
//       body: description || "You have a reminder",
//       sound: "default",
//     },
//     trigger: {
//       date: triggerDate,
//       channelId: "reminder",
//     },
//   });
// }

// export async function cancelReminderNotification(notificationId) {
//   if (notificationId) {
//     await Notifications.cancelScheduledNotificationAsync(
//       notificationId
//     );
//   }
// }

import * as Notifications from "expo-notifications";

export async function scheduleReminderNotification({
  title,
  description,
  triggerDate,
}) {
  const now = new Date();

  // 🔴 HARD SAFETY CHECK (LAST GUARD)
  const BUFFER_MS = 60 * 1000; // 1 minute

  if (triggerDate.getTime() <= now.getTime() + BUFFER_MS) {
    throw new Error(
      "Selected time is too close or already passed. Please select a later time.",
    );
  }

  return await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body: description || "You have a reminder",
      sound: "default",
    },
    trigger: {
      type: "date", // 🔴 THIS IS THE KEY
      date: triggerDate, // future Date object
      channelId: "reminder",
    },
  });
}
