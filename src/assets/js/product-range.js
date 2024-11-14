/*
Template Name: Yum - Multipurpose Food Tailwind CSS Template
Version: 1.0
Author: coderthemes
Email: support@coderthemes.com
*/

import noUiSlider from 'nouislider';
import wNumb from 'wnumb';

var slider = document.getElementById('product-price-range');
if (slider) {

    noUiSlider.create(slider, {
        start: [10, 30],       // Handle start position
        step: 10,              // Slider moves in increments of '10'
        margin: 20,            // Handles must be more than '20' apart
        connect: true,         // Display a colored bar between the handles
        behaviour: 'tap-drag', // Move handle on tap, bar is draggable
        range: {               // Slider can select '0' to '100'
            'min': 0,
            'max': 100
        },
        format: wNumb({
            decimals: 0,
            prefix: '$ '
        })

    });

    var minCostInput = document.getElementById('minCost');
    var maxCostInput = document.getElementById('maxCost');

    // When the slider value changes, update the input and span
    slider.noUiSlider.on('update', function (values, handle) {
        if (handle) {
            maxCostInput.value = values[handle];
        } else {
            minCostInput.value = values[handle];
        }
    });

    minCostInput.addEventListener('change', function () {
        slider.noUiSlider.set([null, this.value]);
    });

    maxCostInput.addEventListener('change', function () {
        slider.noUiSlider.set([null, this.value]);
    });
}