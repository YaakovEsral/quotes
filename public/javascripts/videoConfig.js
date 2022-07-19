function playVideo() {
    videoDisplay.src = `/media/${videoArray[videoIndex++]}`;
    if (videoIndex === videoArray.length) {
        videoIndex = 0;
    }
}

function addVideoListeners() {
    let time = 1;
    // setInterval(() => console.log(time++, 'seconds'), 1000)

    videoDisplay.addEventListener('canplay', () => {
        show(videoDisplay);
        hide(quotesDisplay)
        animationActive = false;
        videoDisplay.play();

        console.log(videoIndex, 'index');
    })

    videoDisplay.addEventListener('ended', () => {
        show(quotesDisplay);
        hide(videoDisplay);
        videoDisplay.src = '';
        animationActive = true;
        animate(true);
        animate(false);
        setTimeout(playVideo, videoInterval)
    });

}