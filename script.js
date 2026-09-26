const setupPanel = document.getElementById("setup-panel");
const dashboard = document.getElementById("dashboard");
const budgetAmountInput = document.getElementById("budget-amount-input");
const setBudgetBtn = document.getElementById("set-budget-btn");

const expenseNameInput = document.getElementById("expense-name-input");
const expenseAmountInput = document.getElementById("expense-amount-input");
const expenseCategoryInput = document.getElementById("expense-category-input");
const addExpenseBtn = document.getElementById("add-expense-btn");

const expenseList = document.getElementById("expense-list");
const progressRing = document.getElementById("progress-ring");
const ringLabel = document.getElementById("ring-label");

const trackButton = document.getElementById("show-track-btn");
const expenseDiv = document.getElementById("expense-adder");

const resetBtn = document.getElementById("reset-btn");

const budgetEndDateInput = document.getElementById("budget-end-date-input");
const daysLeftLabel = document.getElementById("days-left-label");




let totalBudget = 0;
let budgetEndDate = "";
let expenses = [];

setBudgetBtn.addEventListener("click", function() {
  totalBudget = Number(budgetAmountInput.value);
  budgetEndDate = budgetEndDateInput.value;

  setupPanel.style.display = "none";
  dashboard.style.display = "block";

  updateRing();
  saveBudgetData();
  renderExpenseList();
  updateDaysLeft();
});

 trackButton.addEventListener("click", function() { 

    if (expenseDiv.style.display === "none") {
        expenseDiv.style.display = "flex";
    }

    else {
        expenseDiv.style.display = "none";
    }
 });

addExpenseBtn.addEventListener("click", function(){
    const expenseName = expenseNameInput.value;
    const expenseAmount = Number(expenseAmountInput.value);
    const expenseCategory = expenseCategoryInput.value;

    const newExpense = {
    name : expenseName,
    amount : expenseAmount,
    category : expenseCategory
    };

    expenses.push(newExpense);
    let totalSpent = 0;

    expenses.forEach(function(expense) {
     totalSpent = totalSpent + expense.amount;
   });

    const remaining = totalBudget - totalSpent;

    expenseNameInput.value = "";
    expenseAmountInput.value = "";

    updateRing();
    saveBudgetData();
    renderExpenseList();
    updateDaysLeft();


});

function updateRing() {
  let totalSpent = 0;
  expenses.forEach(function(expense) {
    totalSpent = totalSpent + expense.amount;
  });

  const remaining = totalBudget - totalSpent;
  const percentRemaining = remaining / totalBudget;

  const radius = 65;
  const circumference = 2 * Math.PI * radius;
  const dashLength = circumference * percentRemaining;
  const gapLength = circumference - dashLength;

  progressRing.style.strokeDasharray = dashLength + " " + gapLength;
  ringLabel.textContent = "RM " + remaining.toFixed(2);

  if (percentRemaining > 0.5) {
    progressRing.style.stroke = "#22c55e"; // green
  } else if (percentRemaining > 0.2) {
    progressRing.style.stroke = "#eab308"; // yellow
  } else {
    progressRing.style.stroke = "#ef4444"; // red
  }
}

const savedBudget = localStorage.getItem("myBudget");
const savedExpenses = localStorage.getItem("myExpenses");
const savedBudgetEndDate = localStorage.getItem("myBudgetEndDate");

if (savedBudget) {
  totalBudget = Number(savedBudget);
}
if (savedExpenses) {
  expenses = JSON.parse(savedExpenses);
}
if (savedBudgetEndDate){
  budgetEndDate = savedBudgetEndDate;
}

function saveBudgetData() {
  localStorage.setItem("myBudget", totalBudget);
  localStorage.setItem("myExpenses", JSON.stringify(expenses));
  localStorage.setItem("myBudgetEndDate", budgetEndDate);
}

if (totalBudget !== 0) {
  setupPanel.style.display = "none";
  dashboard.style.display = "block";
  updateRing();
  renderExpenseList();
  updateDaysLeft();


  
}

function renderExpenseList() {
  expenseList.innerHTML = "";

  expenses.forEach(function(expense) {
    const expenseItem = document.createElement("li");
    expenseItem.textContent = expense.name + " - RM " + expense.amount.toFixed(2) + " (" + expense.category + ")";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "×";
    deleteBtn.classList.add("delete-expense-btn");

    deleteBtn.addEventListener("click", function() {
      expenses = expenses.filter(function(e) {
        return e !== expense;
      });

      updateRing();
      saveBudgetData();
      renderExpenseList();
      updateDaysLeft();

    });

    expenseItem.appendChild(deleteBtn);
    expenseList.appendChild(expenseItem);
  });
}

resetBtn.addEventListener("click", function() {
  totalBudget = 0;
  expenses = [];

  localStorage.removeItem("myBudget");
  localStorage.removeItem("myExpenses");
  localStorage.removeItem("myBudgetEndDate");

  dashboard.style.display = "none";
  setupPanel.style.display = "flex";

  budgetAmountInput.value = "";
  budgetEndDateInput.value="";
}); 

function updateDaysLeft() {
  const today = new Date();
  const end = new Date(budgetEndDate);

  const diffTime = end - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  daysLeftLabel.textContent = "Days Left: " + diffDays;
}