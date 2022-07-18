document.addEventListener('click', toggleFullScreen)
let animationActive = false;
let originalQuotesArray = [];
let quotesSelectionArray = [];

init();
async function init() {
    originalQuotesArray = await fetchQuotes();
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
    const numberOfTransitions = randomNumber(3, 5, true);
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
    // quoteText.innerText = quote.text;
    // authorText.innerText = quote.author;


    // place a single div
    while (overlap) {
        if (counter++ > 1000) {
            console.log('COUNTER OVERLOAD');
            // removeAllDivs();
            break;
        }
        console.log('searching for available space');
        // get dimensions of current div
        const props = getProperties(currentDiv);

        // calculate a random spot for div based on screen size and div dimensions
        // (this should ensure they are not positioned off the screen in any direction)
        const left = randomNumber(0, window.innerWidth - props.width);
        const top = randomNumber(0, window.innerHeight - props.height);

        // place the div
        currentDiv.style.left = `${left}px`;
        currentDiv.style.top = `${top}px`;
        // used this for testing - each new placement attempt
        // await sleep(1000)

        // check that this div doesn't overlap with a different one
        overlap = checkOverlap(currentDiv, allQuoteDivs);
        console.log('overlap', overlap, 'hidden', currentDiv.classList.contains('hidden'));
    }
    show(currentDiv);
    const timeout = randomNumber(3000, 5000);
    setTimeout(() => hide(currentDiv), timeout);
}

function removeAllDivs() {
    console.log('removing divs');
    allQuoteDivs.forEach(div => {
        div.style.left = '-100%';
        div.style.top = '-100%';
    })
}