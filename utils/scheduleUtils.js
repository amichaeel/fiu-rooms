export function transformClassesToSchedule(classesData) {
  if (!classesData) {
    console.log("No class data found! Exiting.")
    return
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
  const days = { 'Mo': 1, 'Tu': 2, 'We': 3, 'Th': 4, 'Fr': 5, 'Sa': 6, 'Su': 0 };
  return scheduleDay.includes(currentDay) || days[scheduleDay] === currentDay;
}

export function isTimeInRange(scheduleTime, currentTime) {
  const [startTime, endTime] = scheduleTime.split('-');
  const [startHours, startMinutes] = startTime.endsWith('PM') ?
    startTime.replace('PM', '').trim().split(':').map(Number) :
    startTime.replace('AM', '').trim().split(':').map(Number);
  const [endHours, endMinutes] = endTime.endsWith('PM') ?
    endTime.replace('PM', '').trim().split(':').map(Number) :
    endTime.replace('AM', '').trim().split(':').map(Number);

  // Convert to 24-hour format
  const start = new Date();
  start.setHours(startHours + (startTime.endsWith('PM') && startHours !== 12 ? 12 : 0), startMinutes, 0);
  const end = new Date();
  end.setHours(endHours + (endTime.endsWith('PM') && endHours !== 12 ? 12 : 0), endMinutes, 0);

  return currentTime >= start && currentTime <= end;
}

export function isRoomInUse(roomSchedule, currentTime) {
  const currentDay = currentTime.getDay(); // 0 for Sunday, 1 for Monday, etc.
  for (let timeSlot of roomSchedule) {
    timeSlot = timeSlot.replace(' - ', '-')
    const scheduleDay = timeSlot.split(' ')[0]
    const scheduleTime = timeSlot.split(' ')[1]
    if (isDayMatching(scheduleDay, currentDay) && isTimeInRange(scheduleTime, currentTime)) {
      return true;
    }
  }
  return false;
}