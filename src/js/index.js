require('../scss/styles.scss');

'use strict';

const cashNumber = document.getElementById('cash-number');
const percentNumber = document.getElementById('percent-number');
const monthNumber = document.getElementById('month-number');
const refillNumber = document.getElementById('refill-number');

const profitPercent = document.getElementById('profit-percent');
const profitCash = document.getElementById('profit-cash');
const profitSum = document.getElementById('profit-sum');

const numbersCollection = document.querySelectorAll('input[type="number"]');
const rangeCollection = document.querySelectorAll('input[type="range"]');

const inputValue = {
    rangeHandler : function () {
        this.previousElementSibling.value = this.value;
    },
    numberHandler : function () {
        this.nextElementSibling.value = this.value;
    },
    valueLimit : function () {
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
    let calcProfitCash = (cashNumber.value * (percentNumber.value / 100) / 12) * monthNumber.value,
        calcProfitPercent = calcProfitCash * 100 / cashNumber.value,
        calcProfitTotal = (+calcProfitCash + +cashNumber.value).toFixed(0)
        // ,
        // calcRefillCash;
        // for (let i = 0; i < monthNumber.value; i++) {
        //     return calcRefillCash = refillNumber.value * i;
        // }
    profitPercent.innerHTML = calcProfitPercent.toFixed(2);
    profitCash.innerHTML = calcProfitCash.toFixed(0).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1\&nbsp\;');
    profitSum.innerHTML = calcProfitTotal.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1\&nbsp\;');
}

calculateTotalSum();

for (let i = 0; i < rangeCollection.length; i++) {
    rangeCollection[i].addEventListener('input', inputValue.rangeHandler);
    rangeCollection[i].addEventListener('input', calculateTotalSum);
}

for (let i = 0; i < numbersCollection.length; i++) {
    numbersCollection[i].addEventListener('change', inputValue.valueLimit);
    numbersCollection[i].addEventListener('change', inputValue.numberHandler);
    numbersCollection[i].addEventListener('change', calculateTotalSum);
    numbersCollection[i].addEventListener('change', function() {
        let val = this.value.toString();
        this.innerHTML = val.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1\&nbsp\;');
    });
}
