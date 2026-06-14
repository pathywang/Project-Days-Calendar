import { getGreeting } from "./common.mjs";
import daysData from "./days.json" with { type: "json" };

window.onload = function () {
  document.querySelector("body").innerText =
    `${getGreeting()} - there are ${daysData.length} known days`;
};
