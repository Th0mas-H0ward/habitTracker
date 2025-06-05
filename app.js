const addBtn = document.getElementById("addBtn");
const habitList = document.getElementById("habitList");
const todaysDate = new Date().toLocaleDateString("pl-PL", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});
let habitsArray = [];

class Habit {
  constructor(habit, isDone, date) {
    this.habit = habit;
    this.isDone = isDone;
    this.date = date;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const data = localStorage.getItem('habitsArray');
  if (data) {
    habitsArray = JSON.parse(data);
    habitsArray.forEach(habitObj => {
      if (habitObj.date !== todaysDate) {
        habitObj.isDone = false; 
        habitObj.date = todaysDate; 
      }
      renderHabit(habitObj);
    });
  }
});

habitList.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    const listItem = e.target.closest("li");
    const habitText = listItem.querySelector(".habit-text").textContent;
    habitsArray = habitsArray.filter(habit => habit.habit !== habitText);

    localStorage.setItem('habitsArray', JSON.stringify(habitsArray));

    habitList.removeChild(listItem);
  }
});

habitList.addEventListener("click", (e) => {
  if (e.target.classList.contains("checkbox")) {
    const checkbox = e.target;
    const listItem = e.target.closest("li");
    const habitText = listItem.querySelector(".habit-text").textContent;

    habitsArray.forEach(habit => {
      if (habit.habit === habitText) {
        habit.isDone = checkbox.checked;
      }
    });

    localStorage.setItem('habitsArray', JSON.stringify(habitsArray));
  }
});

addBtn.addEventListener("click", () => {
  const inputField = document.getElementById("inputField");
  const habitName = inputField.value;

  let newHabit = new Habit(habitName, false, todaysDate);
  renderHabit(newHabit);
  habitsArray.push(newHabit);
  localStorage.setItem('habitsArray', JSON.stringify(habitsArray));
  inputField.value = '';
});

function renderHabit(habitObj) {
  const newListItem = document.createElement("li");
  newListItem.classList.add("habit-list-item");
  newListItem.innerHTML = `
          <div>
            <input type="checkbox" class="checkbox" ${habitObj.isDone && habitObj.date === todaysDate ? "checked" : ""}>
            <span class="habit-text" contenteditable="true">${habitObj.habit}</span>
          </div>
          <div>
            <button class="delete button">🗑️</button>
          </div>   
        `;
  habitList.appendChild(newListItem);
};

function displayDate() {
  const dateToDisplay = document.getElementById("date");
  dateToDisplay.innerHTML = "📅" + todaysDate + "📅";
}

displayDate();