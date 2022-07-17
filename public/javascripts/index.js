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
    await sleep(1000);

    const numberOfTransitions = randomNumber(3, 5, true);
    for (let i = 1; i <= numberOfTransitions; i++) {
        // start over if it's the last one
        if(i === numberOfTransitions) {
            animate();
        }

        if (animationActive) {
            const quote = getQuoteText();
            // console.log('new quote', quote);
            // console.log('placing quote');
            
            placeQuoteDiv(divIndex, quote);
            divIndex++;
            if(divIndex === allQuoteDivs.length) {
                divIndex = 0;
            }
            await sleep(200);
        } else {
            console.log('ending animation');
            break;
        }
    }

}

function getQuoteText() {
    if(!quotesSelectionArray.length) {
        quotesSelectionArray = [...originalQuotesArray];
        // console.log('refilling array');
    }

    const index = randomNumber(0, quotesSelectionArray.length, true);
    // console.log(index, quotesSelectionArray);
    return quotesSelectionArray.splice(index, 1)[0];
}

async function placeQuoteDiv(index, quote) {
    let overlap = true;
    let counter = 0;
    const currentDiv = allQuoteDivs[index];
    hide(currentDiv);
    const quoteText = currentDiv.children[0];
    const authorText = currentDiv.children[1];
    quoteText.innerText = quote.text;
    authorText.innerText = quote.author;

    await sleep(200)

    // place a single div
    while (overlap) {
        if (counter++ > 1000) {
            console.log('COUNTER OVERLOAD');
            break;
        }
        console.log('searching for available space');
        // get dimensions of each div
        const props = getProperties(currentDiv);

        // calculate a random spot for divs based on screen size and div dimensions
        // (this should ensure they are not positioned off the screen in any direction)
        const left = randomNumber(0, window.innerWidth - props.width);
        const top = randomNumber(0, window.innerHeight - props.height);


        currentDiv.style.left = `${left}px`;
        currentDiv.style.top = `${top}px`;
        // await sleep(1000)

        // check that this div doesn't overlap with a different one
        overlap = checkOverlap(currentDiv, allQuoteDivs);
        // console.log('overlap', overlap);

        show(currentDiv);
    }

}