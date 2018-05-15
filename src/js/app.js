'use strict'

const cashNumber = document.getElementById('cash-number');
const cashRange = document.getElementById('cash-range');

const percentNumber = document.getElementById('percent-number');
const percentRange = document.getElementById('percent-range');

const monthNumber = document.getElementById('month-number');
const monthRange = document.getElementById('month-range');

const inputValue = {
    rangeHandler : function () {
        this.previousElementSibling.value = this.value;
    },
    numberHandler : function () {
        this.nextElementSibling.value = this.value;
    },
    cashLimit : function () {
        if (this.value < 30000) {
            this.value = 30000;
        }
        if (this.value > 500000) {
            this.value = 500000;
        }
    },
    percentLimit : function () {
        if (this.value < 0.1) {
            this.value = 0.1;
        }
        if (this.value > 15) {
            this.value = 15;
        }
    },
    monthLimit : function () {
        if (this.value < 3) {
            this.value = 3;
        }
        if (this.value > 24) {
            this.value = 24;
        }
    }
};

cashNumber.addEventListener('input', inputValue.numberHandler);
cashNumber.addEventListener('keyup', inputValue.cashLimit);
cashRange.addEventListener('input', inputValue.rangeHandler);

percentNumber.addEventListener('input', inputValue.numberHandler);
percentNumber.addEventListener('keyup', inputValue.percentLimit);
percentRange.addEventListener('input', inputValue.rangeHandler);

monthNumber.addEventListener('input', inputValue.numberHandler);
monthNumber.addEventListener('keyup', inputValue.monthLimit);
monthRange.addEventListener('input', inputValue.rangeHandler);
