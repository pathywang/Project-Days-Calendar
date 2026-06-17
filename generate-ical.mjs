import { calculateCommemorativeDate } from "./common.mjs";
import daysData from "./days.json" with { type: "json" };
import fs from "node:fs";

let icsContent = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Ping & ALex Project//Days Calendar//EN\n`;

for (let year = 2020; year <= 2030; year++) {
  daysData.forEach((dayConfig) => {
    // 1. Get the numerical month (0-11) - Use the same lookup logic from calculateCommemorativeDate
    const monthMap = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const targetMonth = monthMap.indexOf(dayConfig.monthName);

    // 2. Get the day number
    const day = calculateCommemorativeDate(year, dayConfig);

    // 3. Create the Date objects
    const currentDate = new Date(year, targetMonth, day);
    const nextDate = new Date(currentDate);
    nextDate.setDate(currentDate.getDate() + 1);

    // 4. Create the formatted strings
    const fmtMonth = String(currentDate.getMonth() + 1).padStart(2, "0");
    const fmtDay = String(currentDate.getDate()).padStart(2, "0");
    const fmtNextMonth = String(nextDate.getMonth() + 1).padStart(2, "0");
    const fmtNextDay = String(nextDate.getDate()).padStart(2, "0");

    // 5. Build the string and add to icsContent
    icsContent +=
      "BEGIN:VEVENT\n" +
      `SUMMARY:${dayConfig.name}\n` +
      `DTSTART;VALUE=DATE:${year}${fmtMonth}${fmtDay}\n` +
      `DTEND;VALUE=DATE:${nextDate.getFullYear()}${fmtNextMonth}${fmtNextDay}\n` +
      "END:VEVENT\n";
  });
}

try {
  icsContent += "END:VCALENDAR\n"; // Added \n for cleaner file endings
  fs.writeFileSync("days.ics", icsContent);
  console.log("ICS file generated successfully: days.ics");
} catch (error) {
  console.error("Error generating ICS file:", error);
}
