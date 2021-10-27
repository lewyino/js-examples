var removeCardEvent = new Event("removeCardEvent", { bubbles: true });
document.body.addEventListener("removeCardEvent", deleteCard);

function deleteCard(event) {
    document.body.removeChild(event.card);
}

function addCard() {
    var template = document.querySelector("#simpleTemplate");
    var clone = template.content.cloneNode(true);
    clone.querySelector(".title").textContent = "title";
    clone.querySelector(".content").textContent = "content";
    var button = clone.querySelector("button");
    button.style.display = 'none';
    var card = clone.querySelector(".card");
    card.addEventListener("mouseenter", function (event) {
        var button = event.target.querySelector("button");
        button.style.display = 'initial';
    });
    card.addEventListener("mouseleave", function (event) {
        var button = event.target.querySelector("button");
        button.style.display = 'none';
    });
    button.addEventListener("click", function (event) {
        removeCardEvent.card = event.target.parentNode;
        event.target.dispatchEvent(removeCardEvent);
    });
    document.body.appendChild(clone);
}

var addCardButton = document.querySelector("#addCardButton");
addCardButton.addEventListener("click", addCard);
