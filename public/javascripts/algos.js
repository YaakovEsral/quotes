function getProperties(elem) {
    const style = window.getComputedStyle(elem);

    const props = {};
    props.width = parseFloat(style.width);
    props.height = parseFloat(style.height);
    props.left = parseFloat(style.left);
    props.top = parseFloat(style.top);
    props.right = props.left + props.width;
    props.bottom = props.top + props.height;
    return props;
}

function checkOverlap(div, allQuoteDivs) {
    // find index of the current div in allQuoteDivs
    const index = allQuoteDivs.findIndex(quoteDiv => quoteDiv === div);
    // create a copy of allQuoteDivs
    const allDivs = [...allQuoteDivs];
    // remove index of currentDiv from the copy, so we can check the other divs against it
    allDivs.splice(index, 1);

    const divProps = getProperties(div);

    let topLeft1, topLeft2, topRight1, topRight2, bottomLeft1, bottomLeft2, bottomRight1, bottomRight2;
    const overlap = allDivs.some(div2 => {
        // check if two separate divs are overlapping
        const div2Props = getProperties(div2);

        // top left corner
        topLeft1 = (divProps.left >= div2Props.left &&
            divProps.left <= div2Props.right &&
            divProps.top >= div2Props.top &&
            divProps.top <= div2Props.bottom)
        // top left corner
        topLeft2 = (div2Props.left >= divProps.left &&
            div2Props.left <= divProps.right &&
            div2Props.top >= divProps.top &&
            div2Props.top <= divProps.bottom)

        // top right corner
        topRight1 = (divProps.right >= div2Props.left &&
            divProps.right <= div2Props.right &&
            divProps.top >= div2Props.top &&
            divProps.top <= div2Props.bottom)
        // top right corner
        topRight2 = (div2Props.right >= divProps.left &&
            div2Props.right <= divProps.right &&
            div2Props.top >= divProps.top &&
            div2Props.top <= divProps.bottom)

        // bottom left corner
        bottomLeft1 = (divProps.left >= div2Props.left &&
            divProps.left <= div2Props.right &&
            divProps.bottom >= div2Props.top &&
            divProps.bottom <= div2Props.bottom)
        // bottom left corner
        bottomLeft2 = (div2Props.left >= divProps.left &&
            div2Props.left <= divProps.right &&
            div2Props.bottom >= divProps.top &&
            div2Props.bottom <= divProps.bottom)

        // bottom right corner
        bottomRight1 = (divProps.right >= div2Props.left &&
            divProps.right <= div2Props.right &&
            divProps.bottom >= div2Props.top &&
            divProps.bottom <= div2Props.bottom)
        // bottom right corner
        bottomRight2 = (div2Props.right >= divProps.left &&
            div2Props.right <= divProps.right &&
            div2Props.bottom >= divProps.top &&
            div2Props.bottom <= divProps.bottom)

            // console.log(div.id, div2.id, topLeft1, topLeft2, topRight1, topRight2, bottomLeft1, bottomLeft2, bottomRight1, bottomRight2);

        // return if any are true (i.e. if any are overlapping)
        return (topLeft1 || topLeft2 || topRight1 || topRight2 || bottomLeft1 || bottomLeft2 || bottomRight1 || bottomRight2) && (!div2.classList.contains('hidden'));
    });

    return overlap;
}