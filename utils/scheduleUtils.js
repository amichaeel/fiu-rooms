export function transformClassesToSchedule(classesData) {
  if (!classesData) {
    console.log("No class data found! Exiting.");
    return;
  }
  return classesData.reduce((acc, cls) => {
    const room = cls.location;
    if (!acc[room]) {
      acc[room] = [];
    }
    acc[room].push(cls.time);
    return acc;
  }, {});
}

export function isDayMatching(scheduleDay, currentDay) {
  const days = {
    1: "Mo",
    2: "Tu",
    3: "We",
    4: "Th",
    5: "Fr",
    6: "Sa",
    0: "Su",
  };
  return scheduleDay.includes(days[currentDay]);
}

export function findNextClass(roomSchedule, currentTime) {
  // Helper function to convert day string to day number
  const dayToNumber = (day) => {
    const days = { Mo: 1, Tu: 2, We: 3, Th: 4, Fr: 5, Sa: 6, Su: 0 };
    return days[day];
  };

  // Convert schedule strings into objects with day, start time, and end time
  const parsedSchedule = roomSchedule.map((entry) => {
    const [dayPart, timePart] = entry.split(" ");
    const [startTime, endTime] = timePart.split("-");
    return {
      days: dayPart.match(/.{1,2}/g).map(dayToNumber),
      startTime,
      endTime,
    };
  });

  // Sort the schedule by days and then by start time
  parsedSchedule.sort((a, b) => {
    const dayDiff = a.days[0] - b.days[0];
    if (dayDiff !== 0) return dayDiff;

    const timeA = new Date(`1970/01/01 ${a.startTime}`);
    const timeB = new Date(`1970/01/01 ${b.startTime}`);
    return timeA - timeB;
  });

  // Function to convert time string to Date object on a specific day
  const timeToDate = (timeStr, dayOffset) => {
    let [hours, minutes] = timeStr.split(/[: ]/); // Split by colon and space
    let period = minutes.slice(-2); // AM or PM
    minutes = minutes.slice(0, 2); // Extract minutes

    // Convert to 24-hour format
    hours = parseInt(hours);
    minutes = parseInt(minutes);
    if (period === "PM" && hours !== 12) {
      hours += 12;
    } else if (period === "AM" && hours === 12) {
      hours = 0;
    }

    const date = new Date(currentTime);
    date.setDate(currentTime.getDate() + dayOffset);
    date.setHours(hours, minutes, 0);
    return date;
  };

  // Find the next class
  for (let classSchedule of parsedSchedule) {
    for (let day of classSchedule.days) {
      const dayOffset = day - currentTime.getDay();
      const classStartTime = timeToDate(classSchedule.startTime, dayOffset);

      // Check if the class is on the same day and after the current time
      if (dayOffset === 0 && classStartTime > currentTime) {
        return classStartTime;
      }

      // Check if the class is on a future day
      if (dayOffset > 0) {
        return classStartTime;
      }
    }
  }

  // If no class is found for the current week, return the start time of the first class of the next week
  const firstClassNextWeek = parsedSchedule[0];
  return timeToDate(
    firstClassNextWeek.startTime,
    (firstClassNextWeek.days[0] + 7 - currentTime.getDay()) % 7,
  );
}

export function isTimeInRange(scheduleTime, currentTime) {
  const [startTime, endTime] = scheduleTime.split("-");
  const [startHours, startMinutes] = startTime.endsWith("PM")
    ? startTime.replace("PM", "").trim().split(":").map(Number)
    : startTime.replace("AM", "").trim().split(":").map(Number);
  const [endHours, endMinutes] = endTime.endsWith("PM")
    ? endTime.replace("PM", "").trim().split(":").map(Number)
    : endTime.replace("AM", "").trim().split(":").map(Number);

  // Convert to 24-hour format
  const start = new Date();
  start.setHours(
    startHours + (startTime.endsWith("PM") && startHours !== 12 ? 12 : 0),
    startMinutes,
    0,
  );
  const end = new Date();
  end.setHours(
    endHours + (endTime.endsWith("PM") && endHours !== 12 ? 12 : 0),
    endMinutes,
    0,
  );
  if (currentTime >= start && currentTime <= end) {
    return [true, end, start];
  }
  return [false];
}

export function isRoomInUse(roomSchedule, currentTime) {
  const currentDay = currentTime.getDay(); // 0 for Sunday, 1 for Monday, etc.
  for (let timeSlot of roomSchedule) {
    timeSlot = timeSlot.replace(" - ", "-");
    const scheduleDay = timeSlot.split(" ")[0].match(/.{1,2}/g);
    const scheduleTime = timeSlot.split(" ")[1];
    if (
      isDayMatching(scheduleDay, currentDay) &&
      isTimeInRange(scheduleTime, currentTime)[0]
    ) {
      return [
        true,
        isTimeInRange(scheduleTime, currentTime)[1],
        isTimeInRange(scheduleTime, currentTime)[2],
      ];
    }
  }
  return [false, 0, 0, findNextClass(roomSchedule, currentTime)];
}
