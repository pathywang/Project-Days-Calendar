export function getGreeting() {
  return "Hello";
}

// Function to calculate the commemorative date based on the provided year and day configuration
export function calculateCommemorativeDate(year, dayConfig) {
  // Month Object
  const month = {
    January: 0,
    February: 1,
    March: 2,
    April: 3,
    May: 4,
    June: 5,
    July: 6,
    August: 7,
    September: 8,
    October: 9,
    November: 10,
    December: 11,
  };

  // Weekday Object
  const weekday = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
  };

  //look up the month and weekday numbers using th card data (days.json)
  const targetMonth = month[dayConfig.monthName];
  const targetWeekday = weekday[dayConfig.dayName];

  // Start at the first day of the month at noon to account for daylight savings time changes
  let date = new Date(year, targetMonth, 1, 12, 0, 0);

  //get the dates weekday to match the target weekday
  while (date.getDay() !== targetWeekday) {
    date.setDate(date.getDate() + 1);
  }

  // Adjust to the correct week based on the occurrence/card rule (first, second, third, last)
  if (dayConfig.occurrence === "second") {
    date.setDate(date.getDate() + 7);
  } else if (dayConfig.occurrence === "third") {
    date.setDate(date.getDate() + 14);
  } else if (dayConfig.occurrence === "last") {
    // check if +7 days is still in the same month
    while (
      new Date(year, targetMonth, date.getDate() + 7).getMonth() === targetMonth
    ) {
      date.setDate(date.getDate() + 7);
    }
  }
  // hand the final day of the month back to the calling function
  return date.getDate();
}
