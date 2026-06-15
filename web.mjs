// This is a placeholder file which shows how you can access functions and data defined in other files.
// It can be loaded into index.html.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.
import daysData from "./days.json" with { type: "json" };

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

const months = [
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

const monthSelect = document.querySelector("#month-select");
const yearSelect = document.querySelector("#year-select");
const calendar = document.querySelector("#calendar");

// Populate month dropdown
months.forEach((month, index) => {
  const option = document.createElement("option");
  option.value = index;
  option.textContent = month;
  monthSelect.appendChild(option);
});
monthSelect.addEventListener("change", () => {
  currentMonth = Number(monthSelect.value);
  renderCalendar();
});
// Populate year dropdown
for (let year = 1900; year <= 2100; year++) {
  const option = document.createElement("option");
  option.value = year;
  option.textContent = year;
  yearSelect.appendChild(option);
}

function renderCalendar(month = currentMonth, year = currentYear) {
  calendar.innerHTML = "";

  const weekdays = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

  weekdays.forEach(day => {
    const cell = document.createElement("div");
    cell.textContent = day;
    cell.classList.add("header");
    calendar.appendChild(cell);
  });

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let i = 0; i < 35; i++) {
    const emptyCell = document.createElement("div");
    emptyCell.classList.add("day");
    calendar.appendChild(emptyCell);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const cell = document.createElement("div");
    cell.classList.add("day");
    const dayNumber = document.createElement("div");
    dayNumber.textContent = day;
    dayNumber.classList.add("day-number");
    cell.appendChild(dayNumber);
    daysData.forEach(event => {
      const eventDate = calculateCommemorativeDate(year, event);
      if (eventDate.getUTCMonth() === month &&eventDate.getUTCDate() === day
       ) {const eventName = document.createElement("div");
          eventName.textContent = event.name;
          eventName.classList.add("event-name");

        cell.appendChild(eventName);
      }
    });

    calendar.appendChild(cell);
  }
  }

// Set current month/year
const today = new Date();

monthSelect.value = today.getMonth();
yearSelect.value = today.getFullYear();

monthSelect.addEventListener("change", () => {
  currentMonth = Number(monthSelect.value);
  renderCalendar();
});

yearSelect.addEventListener("change", () => {
  currentYear = Number(yearSelect.value);
  renderCalendar();
});

document.querySelector("#next-btn").addEventListener("click", () => {
  currentMonth++;

  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }

  monthSelect.value = currentMonth;
  yearSelect.value = currentYear;

  renderCalendar();
});

document.querySelector("#prev-btn").addEventListener("click", () => {
  currentMonth--;

  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }

  monthSelect.value = currentMonth;
  yearSelect.value = currentYear;

  renderCalendar();
});

renderCalendar();

