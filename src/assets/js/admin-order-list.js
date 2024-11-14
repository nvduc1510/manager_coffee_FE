/*
Template Name: Yum - Multipurpose Food Tailwind CSS Template
Version: 1.0
Author: coderthemes
Email: support@coderthemes.com
*/

import flatpickr from 'flatpickr';

import {Dropzone} from "dropzone";

flatpickr("#datepicker-basic", { defaultDate: new Date() })

Dropzone.discover();