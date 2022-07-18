document.addEventListener('click', toggleFullScreen)
let animationActive = false;
let originalQuotesArray = [];
let quotesSelectionArray = [];
let marginOffset = 100;

init();
async function init() {
    originalQuotesArray = await fetchQuotes();
    if(window.innerWidth < 800)
        get('main-quote').style.fontSize = (window.innerWidth / 22) + 'px';
}

// function to toggle full screen
function toggleFullScreen() {
    if (!document.fullscreenElement &&
        !document.mozFullScreenElement &&
        !document.msFullScreenElement &&
        !document.webkitFullScreenElement) {
        quotesDisplay.requestFullscreen();
        animationActive = true;
        animate();
    }
    else {
        animationActive = false;
        document.exitFullscreen();
    }
}

let divIndex = 0;
async function animate() {
    // before starting anything. sometimes while loop malfunctions without this
    await sleep(1000);

    // start a sequence of transitions
    const numberOfTransitions = randomNumber(4, 6, true);
    for (let i = 1; i <= numberOfTransitions; i++) {
        // start a new sequence if it's the last transition
        if(i === numberOfTransitions) {
            const interval = randomNumber(2000, 4000);
            setTimeout(animate, interval);
        }

        // get a quote, place it, and increment the div counter
        if (animationActive) {
            const quote = getQuoteText();
            placeQuoteDiv(divIndex, quote);
            divIndex++;
            if(divIndex === allQuoteDivs.length) {
                divIndex = 0;
            }
            // pause between quote transitions
            await sleep(200);
        } else {
            console.log('ending animation');
            break;
        }
    }

}

function getQuoteText() {
    // refill array if it's empty
    if(!quotesSelectionArray.length) {
        quotesSelectionArray = [...originalQuotesArray];
        // console.log('refilling array');
    }

    // pick a random quote from the unused array
    const index = randomNumber(0, quotesSelectionArray.length, true);
    // console.log(index, quotesSelectionArray);
    return quotesSelectionArray.splice(index, 1)[0];
}

async function placeQuoteDiv(index, quote) {
    let overlap = true;
    let counter = 0;
    const currentDiv = allQuoteDivs[index];
    hide(currentDiv);
    // await sleep(1000)

    // set text
    const quoteText = currentDiv.children[0];
    const authorText = currentDiv.children[1];
    quoteText.innerText = quote.text;
    authorText.innerText = `- ${quote.author}`;

    // set font weight
    const fontIndex = randomNumber(0, fonts.length, true);
    currentDiv.style.fontFamily = fonts[fontIndex];

    // set font size
    if(window.innerWidth > 800 && currentDiv !== get('main-quote')) {
        const fontSize = randomNumber(20, 50);
        currentDiv.style.fontSize = `${fontSize}px`;
    }


    // place a single div
    while (overlap) {
        if (counter++ > 1000) {
            console.log('COUNTER OVERLOAD');
            removeDivs();
            // break;
        }
        // console.log('searching for available space');
        // get dimensions of current div
        const props = getProperties(currentDiv);

        // calculate a random spot for div based on screen size and div dimensions
        // (this should ensure they are not positioned off the screen in any direction)
        const left = randomNumber(marginOffset, window.innerWidth - props.width -marginOffset);
        const top = randomNumber(marginOffset, window.innerHeight - props.height - marginOffset);

        // place the div
        currentDiv.style.left = `${left}px`;
        currentDiv.style.top = `${top}px`;
        // used this for testing - each new placement attempt
        // await sleep(1000)

        // check that this div doesn't overlap with a different one
        overlap = checkOverlap(currentDiv, allQuoteDivs);
        // console.log('overlap', overlap, 'hidden', currentDiv.classList.contains('hidden'));
    }
    show(currentDiv);
    const timeout = randomNumber(5000, 6000);
    setTimeout(() => hide(currentDiv), timeout);
}

function removeDivs() {
    console.log('removing divs');
    allQuoteDivs.forEach(div => {
        div.style.left = '-100%';
        div.style.top = '-100%';
    })
}