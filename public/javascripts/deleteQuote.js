deleteButtons.forEach(button => {
    button.addEventListener('click', () => deleteQuote(button.dataset.id))
})

function deleteQuote(id) {
    console.log('attempting to delete quote', id);
    fetchDeleteQuote(id)
}