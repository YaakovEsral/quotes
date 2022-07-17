function get(id) {
    return document.getElementById(id);
}

function show(elem) {
    elem.classList.remove('hidden');
}

function hide(elem) {
    elem.classList.add('hidden');
}

function randomNumber(min, max, floor) {
    const range = max - min;
    let num = Math.random() * range;
    num += min;
    if (floor) {
        num = Math.floor(num);
    }
    return num;
}

function sleep(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}