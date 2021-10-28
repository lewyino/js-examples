export function add(a, b) {
    return a + b;
}

export function diff(a, b) {
    return a - b;
}

export function multi(a, b) {
    return a * b;
}

export function div(a, b) {
    if (b === 0) {
        throw "div by 0!"
    }
    return a / b;
}
