require('../scss/styles.scss');

'use strict';

const cashRange = document.getElementById('cash-range');
const percentRange = document.getElementById('percent-range');
const monthRange = document.getElementById('month-range');
const refillRange = document.getElementById('refill-range');

const refillCheckbox = document.getElementById('refill-checkbox');

const profitPercent = document.getElementById('profit-percent');
const profitCash = document.getElementById('profit-cash');
const profitSum = document.getElementById('profit-sum');
const profitMonth = document.getElementById('profit-month');

const numbersCollection = document.querySelectorAll('input[type="number"]');
const rangeCollection = document.querySelectorAll('input[type="range"]');

const valueTemplate = /(\d)(?=(\d{3})+([^\d]|$))/g;

const inputValue = {
    rangeHandler: function() {
        this.previousElementSibling.setAttribute('type', 'text');
        this.previousElementSibling.value = this.value.replace(valueTemplate, '$1 ').replace('.', ',');
    },
    numberHandler: function() {
        this.nextElementSibling.value = +this.value;
    },
    stringToNumber: function() {
        this.setAttribute('type', 'number');
        this.value = this.nextElementSibling.value;
    },
    numberToString: function() {
        this.setAttribute('type', 'text');
        this.value = this.value.replace(valueTemplate, '$1 ').replace('.', ',');
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
    let calcProfitCash,
        calcProfitPercent,
        calcProfitTotal,
        monthValue = +monthRange.value,
        refillValue = +refillRange.value,
        cashValue = +cashRange.value ,
        percentValue = (+percentRange.value / 100) / 12,
        cash = cashValue,
        calculateTotal = () => {return cash - cashValue;};

    if (refillCheckbox.checked) {
        for (let i = 0; i < monthValue; i++) {
            cash += +refillValue + cash * percentValue;
        }
    } else {
        for (let i = 0; i < monthValue; i++) {
            cash += cash * percentValue;
        }
    }

    calcProfitCash = calculateTotal();
    calcProfitPercent = calcProfitCash * 100 / cashRange.value;
    calcProfitTotal = (+calcProfitCash + +cashRange.value).toFixed(0);

    profitPercent.innerHTML = calcProfitPercent.toFixed(2).replace(valueTemplate, '$1 ').replace('.', ',');
    profitCash.innerHTML = calcProfitCash.toFixed(0).replace(valueTemplate, '$1 ');
    profitSum.innerHTML = calcProfitTotal.replace(valueTemplate, '$1 ');

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
        numbersCollection[i].value = numbersCollection[i].value.replace(valueTemplate, '$1 ').replace('.', ',');
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
    numbersCollection[i].addEventListener('focus', inputValue.stringToNumber);
}

refillCheckbox.addEventListener('change', calculateTotalSum);