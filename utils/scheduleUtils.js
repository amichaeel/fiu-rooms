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
  // TO DO: Find the start time of the next class
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
  // Use isTimeInRange to find the start time of the next class.
  return [false];
}
