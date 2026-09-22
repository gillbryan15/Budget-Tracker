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

let totalBudget = 0;
let expenses = [];

setBudgetBtn.addEventListener("click", function() {
  totalBudget = Number(budgetAmountInput.value);

  setupPanel.style.display = "none";
  dashboard.style.display = "block";

  updateRing();
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

    const expenseItem = document.createElement("li");
    expenseItem.textContent = newExpense.name + " - RM " + newExpense.amount.toFixed(2) + " (" + newExpense.category + ")";
    expenseList.appendChild(expenseItem);

    expenseNameInput.value = "";
    expenseAmountInput.value = "";

    updateRing();

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
