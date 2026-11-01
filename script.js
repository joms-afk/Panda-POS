
const orderInput = document.getElementById("order");
const cashInput = document.getElementById("cash");
const changeDisplay = document.getElementById("change");

const buttons = document.querySelectorAll(".cash-btn");
const resetButton = document.getElementById("reset");

// Remember which input is selected
let activeInput = null;


// DETECT FOCUSED INPUT
orderInput.addEventListener("focus", function() {
    activeInput = orderInput;
});

cashInput.addEventListener("focus", function() {
    activeInput = cashInput;
});


// DENOMINATION BUTTONS
buttons.forEach(function(button) {

    button.addEventListener("click", function() {

        if (activeInput === null) {
            return;
        }

        const amount = Number(button.dataset.value);

        const currentValue = Number(activeInput.value) || 0;

        activeInput.value = currentValue + amount;

        calculateChange();

    });

});


// CALCULATE CHANGE
function calculateChange() {

    const order = Number(orderInput.value);
    const cash = Number(cashInput.value);

    if (orderInput.value === "" || cashInput.value === "") {
        changeDisplay.textContent = "0.00";
        return;
    }

    const change = cash - order;

    if (change < 0) {

        changeDisplay.innerHTML =
    '<span class="short-label">short</span> ' + Math.abs(change).toFixed(2);

    } else {

        changeDisplay.textContent = change.toFixed(2);

    }

}


// UPDATE WHEN TYPING
orderInput.addEventListener("input", calculateChange);
cashInput.addEventListener("input", calculateChange);


// RESET
resetButton.addEventListener("click", function() {

    orderInput.value = "";
    cashInput.value = "";

    activeInput = null;

    calculateChange();

});
