var rand = (function() {
    var result = '';
    for (var i = 0; i < 3; i++) {
        result += Math.round(Math.random() * 9);
    }
    console.log('wylosowano:', result);
    return result;
})();

function addAttempt() {
    var template = document.querySelector("#attemptTemplate");
    var clone = template.content.cloneNode(true);
    var input = clone.querySelector(".pfb-attempt input");
    input.addEventListener('keyup', function(event) {
        // add prevent before put letter
        var value = input.value;
        if (value.length !== 3) {
            return;
        }
        input.disabled = true;
        var arrResult = [];
        var fermi = 0;
        var fermiPosition = [];
        for (var i = 0; i < value.length; i++) {
            if (value[i] === rand[i]) {
                arrResult.push('fermi');
                fermiPosition.push(i);
                fermi++;
            } else if (rand.indexOf(value[i]) !== -1) { // to fix
                arrResult.push('pico');
            }
        }
        var result = event.target.parentNode.querySelector(".result");
        if (!arrResult.length) {
            result.innerText = 'bagels';
        } else {
            result.innerText = arrResult.join(" ");
        }
        if (fermi === 3) {
            document.body.innerHTML += '<div>GRATULACJE!</div>';
        } else {
            addAttempt();
        }
    });
    document.body.appendChild(clone);
}

addAttempt();
