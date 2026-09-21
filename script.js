const setupPanel = document.getElementById("setup-panel");
const dashboard = document.getElementById("dashboard");
const budgetAmountInput = document.getElementById("budget-amount-input");
const setBudgetBtn = document.getElementById("set-budget-btn");
const remainingLabel = document.getElementById("remaining-label");

const expenseNameInput = document.getElementById("expense-name-input");
const expenseAmountInput = document.getElementById("expense-amount-input");
const expenseCategoryInput = document.getElementById("expense-category-input");
const addExpenseBtn = document.getElementById("add-expense-btn");

const expenseList = document.getElementById("expense-list");



let totalBudget = 0;
let expenses = [];

setBudgetBtn.addEventListener("click", function() {
  totalBudget = Number(budgetAmountInput.value);

  setupPanel.style.display = "none";
  dashboard.style.display = "block";

  remainingLabel.textContent = "Remaining: RM " + totalBudget.toFixed(2);
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
    remainingLabel.textContent = "Remaining: RM " + remaining.toFixed(2);

    const expenseItem = document.createElement("li");
    expenseItem.textContent = newExpense.name + " - RM " + newExpense.amount.toFixed(2) + " (" + newExpense.category + ")";
    expenseList.appendChild(expenseItem);

    expenseNameInput.value = "";
    expenseAmountInput.value = "";

});

