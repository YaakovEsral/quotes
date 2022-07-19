const socket = io();

socket.on('connect', () => {
    console.log('connected');
})

socket.on('notification', (msg) => {
    console.log('message received');
    console.log(msg)

    if(msg.status === 'success') {
        show(submitSuccessMessage);
        setTimeout(() => hide(submitSuccessMessage), 3000);
        // print success message
        // add quote to recentQuotes array
        recentQuotesArray.push(msg.quote)
        originalQuotesArray.push(msg.quote)
        // add to originalQuotes array
        // set Timeout for success message

        // console.log(recentQuotesArray, originalQuotesArray);
    }
    
});

form.addEventListener('submit', e =>{
    e.preventDefault();
    const quote = {
        text: quoteInput.value,
        author: authorInput.value
    }

    quoteInput.value = '';
    authorInput.value = '';

    socket.emit('quote-message', quote)
})

