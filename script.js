document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("taxForm");

  form.addEventListener("input", (event) => {
    const target = event.target;

    if (target.tagName === "INPUT" && target.type === "text") {
      validateInput(target);
    }
  });

  const ageSelect = document.getElementById("age");
  ageSelect.addEventListener("change", () => {
    hideError(ageSelect);
  });
});

function validateInput(input) {
  const inputValue = input.value.trim();
//   console.log(inputValue);

  if (!/^\d*\.?\d*$/.test(inputValue)) 
  {
    showError(input, "Please enter numbers only.");
  } else {
    hideError(input);
  }
}

function showError(input, errorMessage) {
  const errorIcon = input.nextElementSibling;
  errorIcon.style.display = "block";

  const tooltip = document.createElement("div");
  tooltip.className = "tooltip";
  tooltip.textContent = "!";
  tooltip.title = errorMessage; 
  input.parentElement.appendChild(tooltip);

//   console.log(input.offsetTop, input.offsetLeft, input.offsetWidth);

  tooltip.style.top = `${input.offsetTop}px`;
  tooltip.style.left = `${input.offsetLeft + input.offsetWidth - 50}px`;

  tooltip.classList.add("active");
}

function hideError(input) {
  const errorIcon = input.nextElementSibling;
  errorIcon.style.display = "none";

  const tooltip = input.parentElement.querySelector(".tooltip");
  if (tooltip) {
    tooltip.remove();
  }
}

function calculateTax() {
  const income = parseFloat(document.getElementById("income").value);
  const extraIncome = parseFloat(document.getElementById("extraIncome").value);
  const deductions = parseFloat(document.getElementById("deductions").value);
  const age = document.getElementById("age").value;
  console.log(income);
  if (isNaN(income)) {
    return alert("Please fill the Gross Annual income");
  } else if (isNaN(extraIncome)) {
    return alert("Please fill the extraIncome");
  } else if (isNaN(deductions)) {
    return alert("Please fill the deductions");
  } else if (age === "") {
    return alert("Please fill the age");
  } 
  console.log(age);

  const totalIncome = income + extraIncome - deductions;
  const taxableIncome = Math.max(totalIncome - 800000, 0);

  let taxAmount = 0;

  if (taxableIncome > 0) {
    if (age === "<40") {
      taxAmount = taxableIncome * 0.3;
    } else if (age === ">=40&<60") {
      taxAmount = taxableIncome * 0.4;
    } else if (age === ">=60") {
      taxAmount = taxableIncome * 0.1;
    }
  }

  const modal = document.getElementById("resultModal");
  const taxAmountElement = document.getElementById("taxAmount");

  const overallIncome = totalIncome - taxAmount.toFixed(2);
  console.log(overallIncome, taxAmount);
  taxAmountElement.textContent = `Your Overall income Will be: ${overallIncome}`;

  modal.style.display = "block";

  const closeButton = modal.querySelector(".close");

  closeButton.addEventListener("click", () => {
    modal.style.display = "none";
  });

  document.getElementById("taxForm").reset();
}
