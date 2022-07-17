async function fetchQuotes() {
    try {
        const response = await fetch('/quotes', {
            method: 'get'
        });
        if (!response.ok) {
            const message = await response.text();
            throw new Error(`${response.status} - ${message || response.statusText}`)
        }

        const data = await response.json();
        return data;
    }
    catch (err) {
        console.error(err)
        return err;
    }

}