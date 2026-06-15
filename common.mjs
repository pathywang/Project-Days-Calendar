// This is a placeholder file which shows how you can define functions which can be used from both a browser script and a node script. You can delete the contents of the file once you have understood how it works.

export function getGreeting() {
    return "Hello";
}

export const monthMap = [
  "January","February","March","April",
  "May","June","July","August",
  "September","October","November","December"
];

const monthIndex = monthMap.indexOf(dayInfo.monthName);

export const dayMap = [
  "Sunday","Monday","Tuesday","Wednesday",
  "Thursday","Friday","Saturday"
];

const dayIndex = dayMap.indexOf(dayInfo.dayName);

