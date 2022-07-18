document.addEventListener('click', (e) => {
    if (!e.path.includes(get('quotes-form'))) {
        toggleFullScreen()
    }
})
var animationActive = false;
let originalQuotesArray = [];
let quotesSelectionArray = [];
let currentlyDisplayedDivs = [];
let marginOffset = 100;
const minimumSequenceInterval = 5000, maximumSequenceInterval = 15000;
const darkModeInterval = 210000; // 3 1/2 minutes
let mainQuoteInterval;
const mainQuoteMinInterval = 6000, mainQuoteMaxInterval = 8000;

// setInterval(() => console.log(currentlyDisplayedDivs), 2000);

init();
async function init() {
    originalQuotesArray = await fetchQuotes();
    if (window.innerWidth < 800)
        mainQuoteDiv.style.fontSize = (window.innerWidth / 22) + 'px';
}

// function to toggle full screen
function toggleFullScreen() {
    if (!document.fullscreenElement &&
        !document.mozFullScreenElement &&
        !document.msFullScreenElement &&
        !document.webkitFullScreenElement) {

        quotesDisplay.requestFullscreen();
        startQuotesAnimation();
        // setInterval(playVideo, 20000);
    }
    else {
        animationActive = false;
        document.exitFullscreen();
    }
}

function startQuotesAnimation() {
    animationActive = true;
    animate(true);
    animate(false);
    setInterval(() => toggleDarkMode(quotesDisplay), 210000)
}

let divIndex = 0;
async function animate(main) {
    // before starting anything. sometimes while loop malfunctions without this
    await sleep(1000);

    // start a sequence of transitions
    // const numberOfTransitions = randomNumber(4, 6, true);
    const numberOfTransitions = main ? 1 : randomNumber(6, 8, true);
    for (let i = 1; i <= numberOfTransitions; i++) {
        // end loop if necessary
        if (!animationActive) {
            console.log('ending animation');
            break;
        }

        mainQuoteInterval = randomNumber(mainQuoteMinInterval, mainQuoteMaxInterval);

        // start a new sequence if it's the last transition
        if (i === numberOfTransitions) {
            const interval = main ? mainQuoteInterval : randomNumber(2000, 4000);
            setTimeout(() => animate(main), interval);
        }

        // get a quote, place it, and increment the div counter
        const quote = getQuoteText();
        placeQuoteDiv(main || divIndex, quote);
        if (!main) {
            divIndex++;
            if (divIndex === secondaryQuoteDivs.length) {
                divIndex = 0;
            }
        }
        // pause between quote transitions
        await sleep(randomNumber(2000, 4000));
    }


}

function getQuoteText() {
    // refill array if it's empty
    if (!quotesSelectionArray.length) {
        quotesSelectionArray = [...originalQuotesArray];
        // console.log('refilling array');
    }

    // pick a random quote from the unused array
    const index = randomNumber(0, quotesSelectionArray.length, true);
    // console.log(index, quotesSelectionArray);
    return quotesSelectionArray.splice(index, 1)[0];
}

async function placeQuoteDiv(div, quote) {
    let overlap = true;
    let counter = 0;
    const currentDiv = div === true /* main div */ ? mainQuoteDiv : /* index */ secondaryQuoteDivs[div];
    // hide(currentDiv);
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
    if (window.innerWidth > 800 && currentDiv !== mainQuoteDiv) {
        const fontSize = randomNumber(15, 25);
        currentDiv.style.fontSize = `${fontSize}px`;
    }


    // place a single div
    while (overlap) {
        if (!animationActive) {
            console.log('ending');
            break;
        }

        if (counter++ > 1000) {
            console.log('COUNTER OVERLOAD');
            if (currentDiv === mainQuoteDiv) {
                removeDivs();
                counter = 0;
            } else {
                await sleep(3000); // can change this to minimumSequenceInterval (5000), but may not be necessary
            }
            // break;
            continue;
        }
        // console.log('searching for available space');
        // get dimensions of current div
        const props = getProperties(currentDiv);

        // calculate a random spot for div based on screen size and div dimensions
        // (this should ensure they are not positioned off the screen in any direction)
        const left = randomNumber(marginOffset, window.innerWidth - props.width - marginOffset);
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
    currentlyDisplayedDivs.push(currentDiv);
    // console.log('quote appeared', currentlyDisplayedDivs);
    const timeout = currentDiv === mainQuoteDiv ? mainQuoteInterval : randomNumber(minimumSequenceInterval, maximumSequenceInterval);
    // setTimeout(() => hide(currentDiv), timeout);
    setTimeout(() => {
        hide(currentDiv);
        // remove div from currentlyDisplayedDivs array
        const index = currentlyDisplayedDivs.findIndex(div => div === currentDiv);
        currentlyDisplayedDivs.splice(index, 1);
        // console.log('quote disappeared', currentlyDisplayedDivs);
    }, timeout);

}

function removeDivs() {
    console.log('removing divs');
    // allQuoteDivs.forEach(div => {
    //     div.style.left = '-100%';
    //     div.style.top = '-100%';
    // })
    currentlyDisplayedDivs.forEach(hide);
    // currentlyDisplayedDivs.length = 0; // ### bug - we should be able to empty the array here, but it seems to cause problems
}