// import React, { useState } from "react";
// import { View, Text, StyleSheet, Modal, Pressable, Image } from "react-native";
// import { Calendar } from "react-native-calendars";
// import colors from "../theme/colors";
// import { holidays } from "../data/holidays";
// import NextHolidayCard from "./NextHolidayCard";
// import HolidayListModal from "./HolidayListModal";

// export default function CalendarScreen() {
//   const [selectedHoliday, setSelectedHoliday] = useState(null);
//   const [showHolidayList, setShowHolidayList] = useState(false);

//   const today = new Date().toISOString().split("T")[0];

//   const renderDay = ({ date }) => {
//     const dateString = date.dateString;
//     const dayOfWeek = new Date(dateString).getDay();

//     let bgColor = "transparent";
//     let textColor = colors.textDark;

//     if (dateString === today) {
//       bgColor = colors.todayBlueBg;
//       textColor = colors.todayBlueText;
//     } else if (holidays[dateString]) {
//       bgColor = colors.holidayGreen;
//       textColor = "#FFFFFF";
//     } else if (dayOfWeek === 5 || dayOfWeek === 6) {
//       textColor = colors.weekendRed;
//     }

//     return (
//       <Pressable
//         style={[
//           styles.dayContainer,
//           bgColor !== "transparent" && { backgroundColor: bgColor },
//         ]}
//         onPress={() => {
//           if (holidays[dateString]) {
//             setSelectedHoliday({
//               date: dateString,
//               name: holidays[dateString].name,
//             });
//           }
//         }}
//       >
//         <Text style={[styles.dayText, { color: textColor }]}>{date.day}</Text>
//       </Pressable>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <View style={styles.headerCard}>
//         <Image
//           source={require("../assets/brur-logo.png")}
//           style={styles.logo}
//           resizeMode="contain"
//         />
//         <Text style={styles.title}>BRUR Academic Calendar</Text>
//         <Text style={styles.subtitle}>Begum Rokeya University, Rangpur</Text>
//       </View>

//       {/* Calendar */}
//       <View style={styles.card}>
//         <Calendar
//           dayComponent={renderDay}
//           enableSwipeMonths
//           theme={{
//             arrowColor: colors.primary,
//             monthTextColor: colors.textDark,
//             textMonthFontWeight: "700",
//             textDayHeaderFontWeight: "600",
//             textSectionTitleColor: colors.textLight,
//           }}
//         />
//       </View>

//       {/* Legend */}
//       <View style={styles.legend}>
//         <Legend color={colors.todayBlueBg} label="Today" />
//         <Legend color={colors.holidayGreen} label="Official Holiday" />
//         <Legend color={colors.weekendRed} label="Friday & Saturday" />
//       </View>
//       {/* View All Holidays Button */}
//       <Pressable
//         style={styles.allHolidayBtn}
//         onPress={() => setShowHolidayList(true)}
//       >
//         <Text style={styles.allHolidayText}>📜 View All Holidays</Text>
//       </Pressable>

//       <HolidayListModal
//         visible={showHolidayList}
//         onClose={() => setShowHolidayList(false)}
//       />

//       {/* ✅ Next Holiday */}
//       <NextHolidayCard />

//       {/* Modal */}
//       <Modal visible={!!selectedHoliday} transparent animationType="fade">
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalBox}>
//             <Text style={styles.modalTitle}>Holiday Details</Text>
//             <Text style={styles.modalText}>📅 {selectedHoliday?.date}</Text>
//             <Text style={styles.modalText}>🎉 {selectedHoliday?.name}</Text>

//             <Pressable
//               style={styles.closeBtn}
//               onPress={() => setSelectedHoliday(null)}
//             >
//               <Text style={styles.closeText}>Close</Text>
//             </Pressable>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// }

// function Legend({ color, label }) {
//   return (
//     <View style={styles.legendItem}>
//       <View style={[styles.legendDot, { backgroundColor: color }]} />
//       <Text style={styles.legendText}>{label}</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 50,
//     backgroundColor: colors.background,
//   },

//   headerCard: {
//     marginHorizontal: 16,
//     marginBottom: 14,
//     paddingVertical: 14,
//     backgroundColor: colors.card,
//     borderRadius: 18,
//     alignItems: "center",
//     elevation: 3,
//   },

//   logo: {
//     width: 70,
//     height: 70,
//     marginBottom: 6,
//   },

//   title: {
//     fontSize: 22,
//     fontFamily: "Arima_700Bold",
//     color: colors.textDark,
//   },

//   subtitle: {
//     fontSize: 13,
//     fontFamily: "Arima_400Regular",
//     color: colors.textLight,
//   },

//   card: {
//     marginHorizontal: 16,
//     borderRadius: 20,
//     backgroundColor: colors.card,
//     padding: 14,
//     elevation: 3,
//   },

//   dayContainer: {
//     width: 38,
//     height: 38,
//     borderRadius: 12,
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   dayText: {
//     fontSize: 14,
//     fontFamily: "Arima_600SemiBold",
//   },

//   legend: {
//     marginTop: 18,
//     flexDirection: "row",
//     justifyContent: "center",
//     gap: 18,
//   },

//   legendItem: {
//     flexDirection: "row",
//     alignItems: "center",
//   },

//   legendDot: {
//     width: 14,
//     height: 14,
//     borderRadius: 7,
//     marginRight: 8,
//   },

//   legendText: {
//     fontSize: 14,
//     fontFamily: "Arima_500Medium",
//     color: colors.textDark,
//   },

//   modalOverlay: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.4)",
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   modalBox: {
//     width: "82%",
//     backgroundColor: "#fff",
//     borderRadius: 20,
//     padding: 22,
//   },

//   modalTitle: {
//     fontSize: 18,
//     fontFamily: "Arima_700Bold",
//     marginBottom: 10,
//   },

//   modalText: {
//     fontSize: 15,
//     fontFamily: "Arima_400Regular",
//     marginBottom: 6,
//   },

//   closeBtn: {
//     marginTop: 18,
//     backgroundColor: colors.primary,
//     paddingVertical: 12,
//     borderRadius: 14,
//     alignItems: "center",
//   },

//   closeText: {
//     color: "#fff",
//     fontFamily: "Arima_600SemiBold",
//   },
//   allHolidayBtn: {
//   marginTop: 16,
//   marginHorizontal: 16,
//   backgroundColor: "#FFF3E0",
//   paddingVertical: 14,
//   borderRadius: 18,
//   alignItems: "center",
//   elevation: 3,
// },

// allHolidayText: {
//   fontSize: 15,
//   fontFamily: "Arima_600SemiBold",
//   color: "#EF6C00",
// },

// });

import React, { useState } from "react";
import { View, Text, StyleSheet, Modal, Pressable, Image } from "react-native";
import { Calendar } from "react-native-calendars";
import DateTimePicker from "@react-native-community/datetimepicker";

import colors from "../theme/colors";
import { holidays } from "../data/holidays";

import NextHolidayCard from "./NextHolidayCard";
import HolidayListModal from "./HolidayListModal";
import AddReminderModal from "../screens/AddReminderModal";
import ReminderListModal from "./ReminderListModal";

export default function CalendarScreen() {
  const [selectedHoliday, setSelectedHoliday] = useState(null);
  const [showHolidayList, setShowHolidayList] = useState(false);
  const [showReminderList, setShowReminderList] = useState(false);

  // 🔔 Reminder states
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [tempDate, setTempDate] = useState(null);
  const [triggerDate, setTriggerDate] = useState(null);
  const [showReminderModal, setShowReminderModal] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const renderDay = ({ date }) => {
    const dateString = date.dateString;
    const dayOfWeek = new Date(dateString).getDay();

    let bgColor = "transparent";
    let textColor = colors.textDark;

    if (dateString === today) {
      bgColor = colors.todayBlueBg;
      textColor = colors.todayBlueText;
    } else if (holidays[dateString]) {
      bgColor = colors.holidayGreen;
      textColor = "#FFFFFF";
    } else if (dayOfWeek === 5 || dayOfWeek === 6) {
      textColor = colors.weekendRed;
    }

    return (
      <Pressable
        style={[
          styles.dayContainer,
          bgColor !== "transparent" && { backgroundColor: bgColor },
        ]}
        onPress={() => {
          if (holidays[dateString]) {
            setSelectedHoliday({
              date: dateString,
              name: holidays[dateString].name,
            });
          }
        }}
      >
        <Text style={[styles.dayText, { color: textColor }]}>{date.day}</Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerCard}>
        <Image
          source={require("../assets/brur-logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>BRUR Academic Calendar</Text>
        <Text style={styles.subtitle}>Begum Rokeya University, Rangpur</Text>
      </View>

      {/* Calendar */}
      <View style={styles.card}>
        <Calendar
          dayComponent={renderDay}
          enableSwipeMonths
          theme={{
            arrowColor: colors.primary,
            monthTextColor: colors.textDark,
            textMonthFontWeight: "700",
            textDayHeaderFontWeight: "600",
            textSectionTitleColor: colors.textLight,
          }}
        />
      </View>

      {/* Legend */}
      <View style={styles.legend}>
        <Legend color={colors.todayBlueBg} label="Today" />
        <Legend color={colors.holidayGreen} label="Official Holiday" />
        <Legend color={colors.weekendRed} label="Friday & Saturday" />
      </View>

      {/* View All Holidays */}
      <Pressable
        style={styles.allHolidayBtn}
        onPress={() => setShowHolidayList(true)}
      >
        <Text style={styles.allHolidayText}>📜 View All Holidays</Text>
      </Pressable>

      <HolidayListModal
        visible={showHolidayList}
        onClose={() => setShowHolidayList(false)}
      />

      <NextHolidayCard />

      {/* 🎉 Holiday Modal */}
      <Modal visible={!!selectedHoliday} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Holiday Details</Text>
            <Text style={styles.modalText}>📅 {selectedHoliday?.date}</Text>
            <Text style={styles.modalText}>🎉 {selectedHoliday?.name}</Text>

            <Pressable
              style={styles.closeBtn}
              onPress={() => setSelectedHoliday(null)}
            >
              <Text style={styles.closeText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* 🔵 FAB – Add Reminder */}
      <Pressable style={styles.fab} onPress={() => setShowDatePicker(true)}>
        <Text style={styles.fabText}>⏰</Text>
      </Pressable>

      {/* 🔵 FAB – Reminder List */}
      <Pressable
        style={[styles.fab, { left: 20 }]}
        onPress={() => setShowReminderList(true)}
      >
        <Text style={styles.fabText}>📋</Text>
      </Pressable>

      <ReminderListModal
        visible={showReminderList}
        onClose={() => setShowReminderList(false)}
      />

      {/* 📅 Date Picker */}
      {showDatePicker && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          display="calendar"
          onChange={(e, date) => {
            setShowDatePicker(false);
            if (date) {
              setTempDate(date);
              setShowTimePicker(true);
            }
          }}
        />
      )}

      {/* ⏰ Time Picker */}
      {showTimePicker && (
        <DateTimePicker
          value={new Date()}
          mode="time"
          display="clock"
          onChange={(e, time) => {
            setShowTimePicker(false);

            if (!time || !tempDate) return;

            // User selected date + time
            const selectedDateTime = new Date(
              tempDate.getFullYear(),
              tempDate.getMonth(),
              tempDate.getDate(),
              time.getHours(),
              time.getMinutes(),
              0,
              0,
            );

            const now = new Date();

            // ✅ Buffer = 30 seconds
            const BUFFER_MS = 30 * 1000;

            if (selectedDateTime.getTime() <= now.getTime() + BUFFER_MS) {
              alert(
                "Please select a time a bit later (at least 30 seconds in the future)",
              );
              return;
            }

            // ✅ Perfect — exactly what you want
            setTriggerDate(selectedDateTime);
            setShowReminderModal(true);
          }}
        />
      )}

      {/* 🔔 Add Reminder Modal */}
      <AddReminderModal
        visible={showReminderModal}
        triggerDate={triggerDate}
        onClose={() => setShowReminderModal(false)}
      />
    </View>
  );
}

function Legend({ color, label }) {
  return (
    <View style={styles.legendItem}>
      <View style={[styles.legendDot, { backgroundColor: color }]} />
      <Text style={styles.legendText}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: colors.background,
  },

  headerCard: {
    marginHorizontal: 16,
    marginBottom: 14,
    paddingVertical: 14,
    backgroundColor: colors.card,
    borderRadius: 18,
    alignItems: "center",
    elevation: 3,
  },

  logo: {
    width: 70,
    height: 70,
    marginBottom: 6,
  },

  title: {
    fontSize: 22,
    fontFamily: "Arima_700Bold",
    color: colors.textDark,
  },

  subtitle: {
    fontSize: 13,
    fontFamily: "Arima_400Regular",
    color: colors.textLight,
  },

  card: {
    marginHorizontal: 16,
    borderRadius: 20,
    backgroundColor: colors.card,
    padding: 14,
    elevation: 3,
  },

  dayContainer: {
    width: 38,
    height: 38,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  dayText: {
    fontSize: 14,
    fontFamily: "Arima_600SemiBold",
  },

  legend: {
    marginTop: 18,
    flexDirection: "row",
    justifyContent: "center",
    gap: 18,
  },

  legendItem: {
    flexDirection: "row",
    alignItems: "center",
  },

  legendDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginRight: 8,
  },

  legendText: {
    fontSize: 14,
    fontFamily: "Arima_500Medium",
    color: colors.textDark,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalBox: {
    width: "82%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 22,
  },

  modalTitle: {
    fontSize: 18,
    fontFamily: "Arima_700Bold",
    marginBottom: 10,
  },

  modalText: {
    fontSize: 15,
    fontFamily: "Arima_400Regular",
    marginBottom: 6,
  },

  closeBtn: {
    marginTop: 18,
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: "center",
  },

  closeText: {
    color: "#fff",
    fontFamily: "Arima_600SemiBold",
  },

  allHolidayBtn: {
    marginTop: 16,
    marginHorizontal: 16,
    backgroundColor: "#FFF3E0",
    paddingVertical: 14,
    borderRadius: 18,
    alignItems: "center",
    elevation: 3,
  },

  allHolidayText: {
    fontSize: 15,
    fontFamily: "Arima_600SemiBold",
    color: "#EF6C00",
  },

  fab: {
    position: "absolute",
    bottom: 50,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    zIndex: 999,
  },

  fabText: {
    color: "#fff",
    fontSize: 24,
  },
});
