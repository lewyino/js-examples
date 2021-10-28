let a = 2;
const button = document.querySelector("#button")
button.addEventListener("click", () => {
    let num = document.querySelector("#number").value;
    document.querySelector("#result").innerText = num * a;
});
