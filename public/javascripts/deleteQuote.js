quotesListContainer.addEventListener('click', e => {
    // console.log(e.target);

    // if target was delete button
    if (e.target.classList.contains('quote-li-delete')) {
        // deleteQuote(e.target.parentElement, e.target.dataset.id)
        window.socket.emit('quote-delete', id)
    }
})

// async function deleteQuote(containerElem, id) {

    

    // // console.log('attempting to delete quote', id);
    // const response = await fetchDeleteQuote(id);
    // if (response.status === 200) {
    //     // remove div from dom
    //     containerElem.remove();

    //     // remove from originalQuotesArray
    //     const originalQuotesIndex = originalQuotesArray.findIndex(quote => quote._id === id);
    //     console.log(originalQuotesArray, originalQuotesIndex);
    //     originalQuotesArray.splice(originalQuotesIndex, 1);

    //     // remove from quotesSelectionArray
    //     const selectionQuotesIndex = quotesSelectionArray.findIndex(quote => quote._id === id);
    //     // console.log(selectionQuotesIndex, quotesSelectionArray);
    //     quotesSelectionArray.splice(selectionQuotesIndex, 1);
    // }
// }

window.socket.on('quote-delete-status', (msg) => {
    if (msg.status === 'success') {
        console.log('successfully deleted', msg.id);
        const quoteListItems = Array.from(document.querySelectorAll('.quote-li'));
        const index = quoteListItems.findIndex(elem => elem.dataset.id === msg.id);

        // console.log('index in list items', index);
        quoteListItems[index].remove();

        // remove from originalQuotesArray
        const originalQuotesIndex = originalQuotesArray.findIndex(quote => quote._id === id);
        console.log(originalQuotesArray, originalQuotesIndex);
        originalQuotesArray.splice(originalQuotesIndex, 1);

        // remove from quotesSelectionArray
        const selectionQuotesIndex = quotesSelectionArray.findIndex(quote => quote._id === id);
        // console.log(selectionQuotesIndex, quotesSelectionArray);
        quotesSelectionArray.splice(selectionQuotesIndex, 1);
    }
})