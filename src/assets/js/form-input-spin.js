/*
Template Name: Yum - Multipurpose Food Tailwind CSS Template
Version: 1.0
Author: coderthemes
Email: support@coderthemes.com
*/


function setupQuantityControls() {
    const plusButtons = document.querySelectorAll('.plus');
    const minusButtons = document.querySelectorAll('.minus');
    const productInputs = document.querySelectorAll('.product');

    plusButtons.forEach((plusButton) => {
        plusButton.addEventListener('click', (event) => {
            const inputElement = event.target.previousElementSibling;
            const maxAttributeValue = inputElement.getAttribute('max');
            const currentValue = parseInt(inputElement.value);

            if (currentValue < parseInt(maxAttributeValue)) {
                inputElement.value = currentValue + 1;
                updateQuantity(inputElement);
            }
        });
    });

    minusButtons.forEach((minusButton) => {
        minusButton.addEventListener('click', (event) => {
            const inputElement = event.target.nextElementSibling;
            const minAttributeValue = inputElement.getAttribute('min');
            const currentValue = parseInt(inputElement.value);

            if (currentValue > parseInt(minAttributeValue)) {
                inputElement.value = currentValue - 1;
                updateQuantity(inputElement);
            }
        });
    });
}

function updateQuantity(inputElement) {
    // Implement your logic to update the quantity here
    // This function will be called when the plus or minus buttons are clicked
    // You can access the input element's value using inputElement.value
    // Update the quantity as needed
}

// Call the setupQuantityControls function when the page loads
document.addEventListener('DOMContentLoaded', setupQuantityControls);
