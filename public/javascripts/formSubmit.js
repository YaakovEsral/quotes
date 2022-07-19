socket.on('notification', (msg) => {
    console.log('message received');
    console.log(msg)

    if (msg.status === 'success') {
        // print success message
        show(submitSuccessMessage);
        // set Timeout to hide success message
        setTimeout(() => hide(submitSuccessMessage), 3000);

        // add quotes after timeout
        setTimeout(() => {
            // add quote to recentQuotes array
            recentQuotesArray.push(msg.quote)
            // add to originalQuotes array
            originalQuotesArray.push(msg.quote)
            // console.log(recentQuotesArray, originalQuotesArray);
        }, 2000)

        // add quote to quote list container
        const html = `
        <div class="quote-li"> 
            <h3 class="quote-li-text">${msg.quote.text}</h3>
            <div class="quote-li-author">${msg.quote.author}</div>
            <button class="quote-li-delete" data-id=${msg.quote._id}>Delete This Quote</button>
        </div>
        `
        // because we are using column reverse, we need to pass beforeend
        quotesListContainer.insertAdjacentHTML('beforeend', html);

    }

});

form.addEventListener('submit', e => {
    e.preventDefault();
    const quote = {
        text: quoteInput.value,
        author: authorInput.value
    }

    quoteInput.value = '';
    authorInput.value = '';

    socket.emit('quote-submit', quote)
})

