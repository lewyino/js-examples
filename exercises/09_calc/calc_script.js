var result = 0;
var lastOperation = '';
var resultFiled = document.querySelector("#result-field");
var toClean = true;
var firstValue = true;

var buttons = document.querySelectorAll(".buttons button[number]");
for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function(event) {
        var value = event.target.innerText;
        resultFiled.value = toClean ? value : resultFiled.value + value;
        toClean = false;
    });
}

(function handleActionButtons() {
    var add = document.querySelector('#add');
    add.addEventListener("click", function () {
        result += Number(resultFiled.value);
        resultFiled.value = "";
        lastOperation = '+';
    });
    var subtract = document.querySelector('#subtract');
    subtract.addEventListener("click", function () {
        var value = Number(resultFiled.value);
        result = firstValue ? value : result - value;
        resultFiled.value = "";
        lastOperation = '-';
    });
    var multi = document.querySelector('#multi');
    multi.addEventListener("click", function () {
        var value = Number(resultFiled.value);
        result = firstValue ? value : result * value;
        resultFiled.value = "";
        lastOperation = '*';
    });
    var division = document.querySelector('#division');
    division.addEventListener("click", function () {
        var value = Number(resultFiled.value);
        if (!firstValue && value === 0) {
            resultFiled.value = 'nie wolno dzielić przez 0';
        }
        result = firstValue ? value : result / value;
        resultFiled.value = "";
        lastOperation = '/';
    });
})();

var calculate = document.querySelector('#calculate');
calculate.addEventListener("click", function() {
    switch (lastOperation) {
        case '+': result += Number(resultFiled.value); break;
        case '-': result -= Number(resultFiled.value); break;
        case '*': result *= Number(resultFiled.value); break;
        case '/': result = Number(resultFiled.value) === 0
                    ? 'nie wolno dzielić przez 0'
                    : result / Number(resultFiled.value); break;
    }
    resultFiled.value = result;
    result = 0;
    toClean = true;
    firstValue = true;
});

var clear = document.querySelector('#clear');
clear.addEventListener("click", function() {
    resultFiled.value = "";
    result = 0;
    lastOperation = "";
    firstValue = true;
});

resultFiled.addEventListener("keyup", function (event) {
    var value = Number(event.key);
    if (isNaN(value)) {
        resultFiled.value = resultFiled.value.slice(0, resultFiled.value.length - 1);
        return;
    }

});
