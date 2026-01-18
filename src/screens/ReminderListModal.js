
// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   Modal,
//   Pressable,
//   StyleSheet,
//   ScrollView,
// } from "react-native";
// import colors from "../theme/colors";
// import {
//   getReminders,
//   deleteReminder,
// } from "../utils/reminderStorage";
// import {
//   cancelReminderNotification,
// } from "../utils/notificationHelper";

// export default function ReminderListModal({
//   visible,
//   onClose,
// }) {
//   const [reminders, setReminders] = useState([]);

//   const loadReminders = async () => {
//     const data = await getReminders();
//     setReminders(data);
//   };

//   useEffect(() => {
//     if (visible) loadReminders();
//   }, [visible]);

//   const handleDelete = async reminder => {
//     try {
//       if (reminder.notificationId) {
//         await cancelReminderNotification(
//           reminder.notificationId
//         );
//       }
//       await deleteReminder(reminder.id);
//       loadReminders();
//     } catch (e) {
//       console.log("❌ Delete failed", e);
//     }
//   };

//   return (
//     <Modal visible={visible} transparent animationType="slide">
//       <View style={styles.overlay}>
//         <View style={styles.box}>
//           <Text style={styles.title}>
//             ⏰ My Reminders
//           </Text>

//           <ScrollView showsVerticalScrollIndicator={false}>
//             {reminders.length === 0 && (
//               <Text style={styles.empty}>
//                 No reminders added
//               </Text>
//             )}

//             {reminders.map(item => {
//               const dateObj = item.triggerDate
//                 ? new Date(item.triggerDate)
//                 : null;

//               const dateText = dateObj
//                 ? dateObj.toLocaleDateString()
//                 : "—";

//               const timeText = dateObj
//                 ? dateObj.toLocaleTimeString([], {
//                     hour: "2-digit",
//                     minute: "2-digit",
//                   })
//                 : "";

//               return (
//                 <View key={item.id} style={styles.card}>
//                   <Text style={styles.date}>
//                     📅 {dateText} ⏰ {timeText}
//                   </Text>

//                   <Text style={styles.name}>
//                     {item.title}
//                   </Text>

//                   {!!item.description && (
//                     <Text style={styles.desc}>
//                       {item.description}
//                     </Text>
//                   )}

//                   <Pressable
//                     style={styles.deleteBtn}
//                     onPress={() => handleDelete(item)}
//                   >
//                     <Text style={styles.deleteText}>
//                       🗑 Delete
//                     </Text>
//                   </Pressable>
//                 </View>
//               );
//             })}
//           </ScrollView>

//           <Pressable
//             style={styles.closeBtn}
//             onPress={onClose}
//           >
//             <Text style={styles.closeText}>Close</Text>
//           </Pressable>
//         </View>
//       </View>
//     </Modal>
//   );
// }

// const styles = StyleSheet.create({
//   overlay: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.4)",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   box: {
//     width: "92%",
//     maxHeight: "80%",
//     backgroundColor: "#fff",
//     borderRadius: 20,
//     padding: 16,
//   },
//   title: {
//     fontSize: 18,
//     fontFamily: "Arima_700Bold",
//     marginBottom: 10,
//     textAlign: "center",
//   },
//   empty: {
//     textAlign: "center",
//     color: colors.textLight,
//     marginTop: 20,
//   },
//   card: {
//     backgroundColor: "#F4F6F8",
//     borderRadius: 14,
//     padding: 12,
//     marginBottom: 10,
//   },
//   date: {
//     fontSize: 12,
//     color: colors.textLight,
//   },
//   name: {
//     fontSize: 15,
//     fontFamily: "Arima_600SemiBold",
//     marginTop: 2,
//   },
//   desc: {
//     fontSize: 13,
//     marginTop: 2,
//   },
//   deleteBtn: {
//     marginTop: 6,
//     alignSelf: "flex-end",
//   },
//   deleteText: {
//     color: "#D32F2F",
//     fontSize: 13,
//   },
//   closeBtn: {
//     marginTop: 10,
//     backgroundColor: colors.primary,
//     padding: 12,
//     borderRadius: 14,
//     alignItems: "center",
//   },
//   closeText: {
//     color: "#fff",
//     fontFamily: "Arima_600SemiBold",
//   },
// });
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Modal,
  Pressable,
  StyleSheet,
  ScrollView,
} from "react-native";
import colors from "../theme/colors";
import {
  getReminders,
  deleteReminder,
} from "../utils/reminderStorage";

export default function ReminderListModal({
  visible,
  onClose,
}) {
  const [reminders, setReminders] = useState([]);

  const loadReminders = async () => {
    const data = await getReminders();
    setReminders(data);
  };

  useEffect(() => {
    if (visible) {
      loadReminders();
    }
  }, [visible]);

  const handleDelete = async reminder => {
    try {
      await deleteReminder(reminder.id);

      // 🔄 refresh list after delete
      const fresh = await getReminders();
      setReminders(fresh);
    } catch (e) {
      console.log("❌ Delete failed", e);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.box}>
          <Text style={styles.title}>⏰ My Reminders</Text>

          <ScrollView showsVerticalScrollIndicator={false}>
            {reminders.length === 0 && (
              <Text style={styles.empty}>
                No reminders added
              </Text>
            )}

            {reminders.map(item => {
              const dateObj = item.triggerDate
                ? new Date(item.triggerDate)
                : null;

              const dateText = dateObj
                ? dateObj.toLocaleDateString()
                : "—";

              const timeText = dateObj
                ? dateObj.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "";

              return (
                <View key={item.id} style={styles.card}>
                  <Text style={styles.date}>
                    📅 {dateText} ⏰ {timeText}
                  </Text>

                  <Text style={styles.name}>
                    {item.title}
                  </Text>

                  {!!item.description && (
                    <Text style={styles.desc}>
                      {item.description}
                    </Text>
                  )}

                  <Pressable
                    style={styles.deleteBtn}
                    onPress={() => handleDelete(item)}
                  >
                    <Text style={styles.deleteText}>
                      🗑 Delete
                    </Text>
                  </Pressable>
                </View>
              );
            })}
          </ScrollView>

          <Pressable
            style={styles.closeBtn}
            onPress={onClose}
          >
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
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: "92%",
    maxHeight: "80%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontFamily: "Arima_700Bold",
    marginBottom: 10,
    textAlign: "center",
  },
  empty: {
    textAlign: "center",
    color: colors.textLight,
    marginTop: 20,
  },
  card: {
    backgroundColor: "#F4F6F8",
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
  },
  date: {
    fontSize: 12,
    color: colors.textLight,
  },
  name: {
    fontSize: 15,
    fontFamily: "Arima_600SemiBold",
    marginTop: 2,
  },
  desc: {
    fontSize: 13,
    marginTop: 2,
  },
  deleteBtn: {
    marginTop: 6,
    alignSelf: "flex-end",
  },
  deleteText: {
    color: "#D32F2F",
    fontSize: 13,
  },
  closeBtn: {
    marginTop: 10,
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 14,
    alignItems: "center",
  },
  closeText: {
    color: "#fff",
    fontFamily: "Arima_600SemiBold",
  },
});
