import '../scss/mainstyle.scss';


document.addEventListener('DOMContentLoaded', function() {
    console.log('---' + 'load');
});

// var tempBlock = document.getElementsByClassName('block');
// document.getElementById('block').addEventListener('click', function() {
//     console.log('---' + 'load');
// });

var cashNumber = document.getElementById("cash-number"),
    cashRange = document.getElementById("cash-range")

cashNumber.addEventListener("change", function() {
    cashRange.value = this.value;
});