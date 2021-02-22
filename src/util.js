const getCurrentMonth = () => {
  const currentMonth = new Date().getMonth();

  if (currentMonth < 10) {
    return `0${currentMonth + 1}`;
  } else {
    return currentMonth + 1;
  }
};

const getCurrentDay = () => {
  const currentDay = new Date().getDate();

  if (currentDay < 10) {
    return `0${currentDay + 1}`;
  } else {
    return currentDay;
  }
};

const currentYear = new Date().getFullYear();
const currentMonth = getCurrentMonth();
const currentDay = getCurrentDay();

export const currentDate = `${currentYear}-${currentMonth}-${currentDay}`;
export const lastYear = `${currentYear - 1}-${currentMonth}-${currentDay}`;
export const nextYear = `${currentYear + 1}-${currentMonth}-${currentDay}`;
