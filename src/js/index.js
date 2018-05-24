require('../scss/styles.scss');

'use strict';

const cashRange = document.getElementById('cash-range');
const percentRange = document.getElementById('percent-range');
const monthRange = document.getElementById('month-range');
const refillNumber = document.getElementById('refill-range');

const profitPercent = document.getElementById('profit-percent');
const profitCash = document.getElementById('profit-cash');
const profitSum = document.getElementById('profit-sum');
const profitMonth = document.getElementById('profit-month');

const numbersCollection = document.querySelectorAll('input[type="number"]');
const rangeCollection = document.querySelectorAll('input[type="range"]');

const inputValue = {
    rangeHandler: function() {
        this.previousElementSibling.setAttribute('type', 'text');
        this.previousElementSibling.value = this.value.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
    },
    numberHandler: function() {
        this.nextElementSibling.value = +this.value;
    },
    numberToNumber: function() {
        this.setAttribute('type', 'number');
        this.value = this.nextElementSibling.value;
    },
    numberToString: function() {
        this.setAttribute('type', 'text');
        this.value = this.value.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
    },
    valueLimit: function() {
        let minVal = this.getAttribute('min');
        let maxVal = this.getAttribute('max');
        if (this.value < +minVal) {
            this.value = +minVal;
        }
        if (this.value > +maxVal) {
            this.value = +maxVal;
        }
    }
};

function calculateTotalSum() {
    let calcProfitCash = (cashRange.value * (percentRange.value / 100) / 12) * monthRange.value,
        calcProfitPercent = calcProfitCash * 100 / cashRange.value,
        calcProfitTotal = (+calcProfitCash + +cashRange.value).toFixed(0),
        monthValue = +monthRange.value;
    profitPercent.innerHTML = calcProfitPercent.toFixed(2);
    profitCash.innerHTML = calcProfitCash.toFixed(0).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
    profitSum.innerHTML = calcProfitTotal.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');

    if (monthValue < 5 || monthValue > 21) {
        profitMonth.innerHTML = monthValue + ' месяца';
    } else if (monthValue === 21) {
        profitMonth.innerHTML = monthValue + ' месяц';
    } else {
        profitMonth.innerHTML = monthValue + ' месяцев';
    }
}

calculateTotalSum();

document.addEventListener('DOMContentLoaded', function() {
    for (let i = 0; i < numbersCollection.length; i++) {
        numbersCollection[i].setAttribute('type', 'text');
        numbersCollection[i].value = numbersCollection[i].value.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
    }
});

for (let i = 0; i < rangeCollection.length; i++) {
    rangeCollection[i].addEventListener('input', inputValue.rangeHandler);
    rangeCollection[i].addEventListener('input', calculateTotalSum);
}

for (let i = 0; i < numbersCollection.length; i++) {
    numbersCollection[i].addEventListener('change', inputValue.numberHandler);
    numbersCollection[i].addEventListener('change', inputValue.valueLimit);
    numbersCollection[i].addEventListener('change', calculateTotalSum);
    numbersCollection[i].addEventListener('blur', inputValue.numberToString);
    numbersCollection[i].addEventListener('focus', inputValue.numberToNumber);
}


