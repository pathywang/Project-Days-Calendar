import { calculateCommemorativeDate } from "./common.mjs";
import { getGreeting } from "./common.mjs";
import assert from "node:assert";
import test from "node:test";

test("Greeting is correct", () => {
  assert.equal(getGreeting(), "Hello");
});

test("Ada Lovelace Day in 2024 is on the second Tuesday of October (the 8th)", () => {
  //1. simulate the card data for Ada Lovelace Day
  const adaConfig = {
    name: "Ada Lovelace Day",
    monthName: "October",
    dayName: "Tuesday",
    occurrence: "second",
  };

  //2. call the function with the year and the card data
  const result = calculateCommemorativeDate(2024, adaConfig);

  //3. assert that the result is equal to the expected date (8th)
  assert.equal(result, 8);
});

test("Ada Lovelace Day in 2020 is on the second Tuesday of October (the 13th)", () => {
  //1. simulate the card data for Ada Lovelace Day
  const adaConfig = {
    name: "Ada Lovelace Day",
    monthName: "October",
    dayName: "Tuesday",
    occurrence: "second",
  };

  //2. call the function with the year and the card data
  const result = calculateCommemorativeDate(2020, adaConfig);

  //3. assert that the result is equal to the expected date (13th)
  assert.equal(result, 13);
});
