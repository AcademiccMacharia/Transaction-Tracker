document.addEventListener("DOMContentLoaded", function() {
    let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
  
    const form = document.getElementById("transaction-form");
    const titleInput = document.getElementById("title");
    const categoryInput = document.getElementById("category");
    const amountInput = document.getElementById("amount");
    const transactionList = document.getElementById("transactions");
  
    function addTransaction(event) {
      event.preventDefault();
  
      const title = titleInput.value.trim();
      const category = categoryInput.value;
      const amount = parseFloat(amountInput.value);
  
      if (title === "" || isNaN(amount) || category === "") {
        return;
      }
  
      const transaction = {
        title,
        category,
        amount
      };
  
      transactions.push(transaction);
      saveTransactions();
      renderTransaction(transaction);
      clearInputs();
    }
  
    function renderTransaction(transaction) {
      const listItem = document.createElement("li");
      listItem.classList.add("transaction-item", transaction.category);
      listItem.innerHTML = `
        <span>${transaction.title}</span>
        <span>$${transaction.amount.toFixed(2)}</span>
        <button class="delete-btn"><i class="fas fa-trash"></i></button>
      `;
      transactionList.appendChild(listItem);
    }
  
    function clearInputs() {
      titleInput.value = "";
      categoryInput.value = "";
      amountInput.value = "";
    }
  
    function deleteTransaction(event) {
      const deleteButton = event.target.closest(".delete-btn");
      if (deleteButton) {
        const listItem = deleteButton.parentNode;
        const index = Array.from(listItem.parentNode.children).indexOf(listItem);
        transactions.splice(index, 1);
        saveTransactions();
        listItem.remove();
      }
    }
  
    function saveTransactions() {
      localStorage.setItem("transactions", JSON.stringify(transactions));
    }
  
    function loadTransactions() {
      transactionList.innerHTML = "";
      transactions.forEach(renderTransaction);
    }
  
    form.addEventListener("submit", addTransaction);
    transactionList.addEventListener("click", deleteTransaction);
  
    loadTransactions();
  });
  