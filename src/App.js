import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
  const calorieCounter = document.getElementById("calorie-counter");
  const budgetNumberInput = document.getElementById("budget");
  const entryDropdown = document.getElementById("entry-dropdown");
  const addEntryButton = document.getElementById("add-entry");
  const clearButton = document.getElementById("clear");
  const output = document.getElementById("output");
  let isError = false;
  function cleanInputString(str) {
    const regex = /[\+-\s]/;
    return str.replace(regex, "");
  }

  function isIndividualInput(str) {
    const regex = /\d+e\d+/i;
    return str.match(regex);
  }

  function addEntry() {
    const targetInputContainer = document.querySelector(`#${entryDropdown.value} .input-container`);
    const entryNumber = targetInputContainer.querySelectorAll('input[type="text"]').length;
    const HTMLString = `
    <label for="${entryDropdown.value}-${entryNumber}-name">Entry ${entryNumber} Name</label>
    <input type="text" id="${entryDropdown.value}-${entryNumber}-name" placeholder="Name" />
    <label for="${entryDropdown.value}-${entryNumber}-calories">Entry ${entryNumber} Calories</label>
    <input
      type="number"
      min="0"
      id="${entryDropdown.value}-${entryNumber}-calories"
      placeholder="Calories"
    />`;
    targetInputContainer.insertAdjacentElement("beforeend", HTMLString);
  }

  function getCaloriesFromInput(list) {
    let calories = 0;
    for (const item of list) {
      const currVal = item.value;
      currVal = cleanInputString(currVal);
      const invalidInputMatch = isIndividualInput(currVal);
      if (invalidInputMatch) {
        alert(`Invalid input: ${invalidInputMatch[0]}`);
        isError = true;
        return null;
      }
      calories += Number(currVal);
      return calories;
    }
  }

  addEntryButton.addEventListener("click", addEntry);
  return (
    <div className="App">
      <h1>Calorie Counter</h1>
      <div className="container">
        <form className="calorie-counter">
          <label for="budget">Budget</label>
          <input
            id="budget"
            type="number"
            placeholder="Daily calorie budget"
            min="0"
            required
          />
          <fieldset id="breakfast">
            <legend>Breakfast</legend>
            <div className="input-container"></div>
          </fieldset>
          <fieldset id="lunch">
            <legend>Lunch</legend>
            <div className="input-container"></div>
          </fieldset>
          <fieldset id="dinner">
            <legend>Dinner</legend>
            <div className="input-container"></div>
          </fieldset>
          <fieldset id="snacks">
            <legend>Snacks</legend>
            <div className="input-container"></div>
          </fieldset>
          <fieldset id="exercise">
            <legend>Exerciese</legend>
            <div className="input-container"></div>
          </fieldset>

          <div className="controls">
            <span>
              <label for="entry-dropdown">Add food or exerciese: </label>
              <select id="entry-dropdown" name="options">
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
                <option value="snack">Snack</option>
                <option value="exercise">Exercise</option>
              </select>
              <button type="button" id="add-entry">
                Add Entry
              </button>
            </span>
          </div>
          <button type="submit">Calculate Remaining Calories</button>
          <button type="button" id="clear">
            Clear
          </button>
        </form>
        <div id="output" class="output hide">

        </div>
      </div>
    </div>
  );
}

export default App;
