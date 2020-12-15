'use strict';

export default class ImageCapture {

    constructor() {

        this.startVideoButtonListener();
        this.captureButtonListener();
        this.saveButtonListener();
    }

    startVideoButtonListener() {
        document.getElementById('start-capture-button').addEventListener('click', async () => {

            const canvas = document.getElementById('video-canvas');
            const videoBox = document.getElementById('video');
            canvas.style.display = 'none';
            videoBox.style.display = 'block';
            try {
                const videoWidth = videoBox.offsetWidth;
                const videoHeight = videoBox.offsetHeight;
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: {
                        width: videoWidth,
                        height: videoHeight
                    }
                });
                window.stream = stream;
                videoBox.srcObject = stream;
            } catch (error) {
                console.error(error)
            }
        });
    }

    captureButtonListener() {
        document.getElementById('take-capture-button').addEventListener('click', () => {

            if (window.stream) {
                const canvas = document.getElementById('video-canvas');
                const videoBox = document.getElementById('video');
                const videoWidth = videoBox.offsetWidth;
                const videoHeight = videoBox.offsetHeight;

                canvas.width = videoWidth;
                canvas.height = videoHeight;
                canvas.getContext('2d').drawImage(videoBox, 0, 0, videoWidth,videoHeight);

                videoBox.style.display = 'none';
                canvas.style.display = 'block';

                this.stopVideoStream();
                document.getElementById('send-capture-button').disabled = false;
            }
        })
    }

    saveButtonListener() {
        document.getElementById('send-capture-button').disabled = true;
        document.getElementById('send-capture-button').addEventListener('click', () => {
            const canvas = document.getElementById('video-canvas');
            const canvasBase64 = canvas.toDataURL();
            this.sendImageToNode(canvasBase64);
            this.displayScreenMessage();
        })
    }

    stopVideoStream() {
        window.stream.getTracks().forEach(function (track) {
            track.stop();
            window.stream = '';
        });
    }

    sendImageToNode(canvasBase64) {
        console.log(canvasBase64);
    }

    displayScreenMessage() {
        document.getElementById('main-display-bar').innerHTML = `<i id="image-sent">Image sent to server</i>`;
        setTimeout(() => {
            document.location.href="/home";
        }, 1250)
    }
}