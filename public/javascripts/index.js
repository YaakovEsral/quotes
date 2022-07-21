document.addEventListener('click', (e) => {
    if (!form.contains(e.target) && (!quotesListContainer.contains(e.target))) {
        toggleFullScreen()
    }
})

var animationActive = false;
var originalQuotesArray = [];
var quotesSelectionArray = [];
var recentQuotesArray = [];
let currentlyDisplayedDivs = [];
let marginOffset = 100;
const minimumSequenceInterval = 5000, maximumSequenceInterval = 15000;
const darkModeInterval = 210000; // 3 1/2 minutes
let mainQuoteInterval;
const mainQuoteMinInterval = 6000, mainQuoteMaxInterval = 8000;

// setInterval(() => console.log(currentlyDisplayedDivs), 2000);
// setInterval(() => console.log(quotesSelectionArray), 2000);

init();
async function init() {
    originalQuotesArray = await fetchQuotes();
    if (window.innerWidth < 800)
        mainQuoteDiv.style.fontSize = (window.innerWidth / 22) + 'px';

    addVideoListeners();
}

// function to toggle full screen
function toggleFullScreen() {
    if (!document.fullscreenElement &&
        !document.mozFullScreenElement &&
        !document.msFullScreenElement &&
        !document.webkitFullScreenElement) {

        // full screen is done on the container, so that we can switch between quotes and video
        container.requestFullscreen();
        startQuotesAnimation();
        setTimeout(playVideo, videoInterval);
    }
    else {
        animationActive = false;
        document.exitFullscreen();
        videoDisplay.pause();
        videoDisplay.src = '';
    }
}

function startQuotesAnimation() {
    animationActive = true;
    animate(true); // main quote
    animate(false); // secondary quotes
    setInterval(() => toggleDarkMode(quotesDisplay), 210000)
}

let divIndex = 0;
async function animate(main) {
    // before starting anything. sometimes while loop malfunctions without this
    await sleep(1000);

    // start a sequence of transitions
        /*  note: The sequence of transitions was implemented because it seemed logical. In retrospect, it can probably be done without sequences and just have them execute one at a time, just like is being done for the main quote. Something to keep in mind in case we ever rewrite this program. */
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
        const quote = getQuoteText(main);
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

function getQuoteText(main) {
    // refill array if it's empty
    if (!quotesSelectionArray.length) {
        quotesSelectionArray = [...originalQuotesArray];
        // console.log('refilling array');
    }
    
    // For the main quote, first use entries in recentQuotesArray
    if(recentQuotesArray.length && main) {
        return recentQuotesArray.shift()
    }

    // else, pick a random quote from the unused array
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
        // only search if animation is active
        if (!animationActive) {
            console.log('ending');
            break;
        }

        // after too many attempts, clear the screen for the main quote and wait it out for secondary quotes
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
        
        // await sleep(1000) // used this for testing - each new placement attempt

        // check that this div doesn't overlap with a different one
        overlap = checkOverlap(currentDiv, allQuoteDivs);
        // console.log('overlap', overlap, 'hidden', currentDiv.classList.contains('hidden'));
    }
    // once there is no overlap, show the div
    show(currentDiv);
    currentlyDisplayedDivs.push(currentDiv);
    // console.log('quote appeared', currentlyDisplayedDivs);

    // hide div after a timeout
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
    currentlyDisplayedDivs.forEach(hide); // as long as they are hidden, they aren't a problem with overlapping
    // currentlyDisplayedDivs.length = 0; // ### bug - we should be able to empty the array here, but it seems to cause problems
}