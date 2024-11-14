/*
Template Name: Yum - Multipurpose Food Tailwind CSS Template
Version: 1.0
Author: coderthemes
Email: support@coderthemes.com
*/

import Quill from 'quill'
import flatpickr from 'flatpickr';

var quill = new Quill('#editor', {
    theme: 'snow'
});

flatpickr("#datepicker-basic", { defaultDate: new Date() })

flatpickr("#timepicker", {
    enableTime: true,
    noCalendar: true,
    dateFormat: "H:i",
    defaultDate: "13:45"
});