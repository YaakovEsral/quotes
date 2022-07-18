function playVideo() {
    videoDisplay.src = '/media/vid2.mp4';
    videoDisplay.addEventListener('loadeddata', () => {
        if (videoDisplay.readyState >= 4) {
            remove(quotesDisplay);
            animationActive = false;
            videoDisplay.play();
        }
    })

    videoDisplay.addEventListener('ended', () => {
        replace(quotesDisplay);
        animationActive = true;
        animate();
    });

}