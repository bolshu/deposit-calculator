require('../scss/styles.scss');

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
    },
    minValue : function () {
        if (this.value.length >= 1) {
            this.value = 0;
            this.nextElementSibling.value = 0;
        }
    },
    tempLimit : function (val, min, max) {
        if (val < min) {
            val = min;
        } else if (val > max) {
            val = max;
        }
        console.log(val, min, max)
    }
};

// эта функция с параметрами не работает
function inputLimit(val, min, max) {
    if (val < min) {
        val  = min;
        return val;
    } else if (val > max) {
        val = max;
        return val;
    }
}

const cashLimit = {
    inputValue: cashNumber.value,
    minValue: 30000,
    maxValue: 500000,
    inputLimit: inputLimit
};

const percentLimit = {
    minValue: .01,
    maxValue: 15,
    inputLimit: inputLimit
};

const monthLimit = {
    minValue: 3,
    maxValue: 24,
    inputLimit: inputLimit
};

// cashNumber.addEventListener('keyup', function(){
//     let currentInputValue = this.value;
//     inputValue.tempLimit(currentInputValue, 30000, 500000);
//     console.log(inputValue.tempLimit, currentInputValue);
// });

// cashNumber.addEventListener('keyup', function () {
//     inputValue.tempLimit(cashNumber.value, 30000, 500000);
// });

cashNumber.addEventListener('input', inputValue.numberHandler);
cashNumber.addEventListener('change', inputValue.cashLimit);
cashNumber.addEventListener('keyup', inputValue.minValue);
cashRange.addEventListener('input', inputValue.rangeHandler);

percentNumber.addEventListener('input', inputValue.numberHandler);
percentNumber.addEventListener('keyup', inputValue.percentLimit);
percentRange.addEventListener('input', inputValue.rangeHandler);

monthNumber.addEventListener('input', inputValue.numberHandler);
monthNumber.addEventListener('keyup', inputValue.monthLimit);
monthRange.addEventListener('input', inputValue.rangeHandler);
