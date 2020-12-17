'use strict';

import STATIC from '../Static.js';

export default class ImageCapture {

    /**
     *
     */
    constructor() {
        this.startVideoButtonListener();
        this.captureButtonListener();
        this.saveButtonListener();
    }

    /**
     * Listens for clicks on the start capture button
     */
    startVideoButtonListener() {
        const $startCaptureButton = document.getElementById('start-capture-button');
        $startCaptureButton.addEventListener('click', async () => {

            const $canvas = document.getElementById('video-canvas');
            const $videoBox = document.getElementById('video');
            $canvas.style.display = 'none';
            $videoBox.style.display = 'block';
            try {
                const videoWidth = $videoBox.offsetWidth;
                const videoHeight = $videoBox.offsetHeight;
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: {
                        width: videoWidth,
                        height: videoHeight
                    }
                });
                window.stream = stream;
                $videoBox.srcObject = stream;
            } catch (error) {
                console.error(error);
            }
        });
    }

    /**
     * Listens for clicks on the capture button
     */
    captureButtonListener() {
        const $takeCaptureButton = document.getElementById('take-capture-button');
        $takeCaptureButton.addEventListener('click', () => {

            if (window.stream) {
                const $canvas = document.getElementById('video-canvas');
                const $videoBox = document.getElementById('video');
                const $sendCaptureButton = document.getElementById('send-capture-button');
                const videoWidth = $videoBox.offsetWidth;
                const videoHeight = $videoBox.offsetHeight;

                $canvas.width = videoWidth;
                $canvas.height = videoHeight;
                $canvas.getContext('2d').drawImage($videoBox, 0, 0, videoWidth,videoHeight);

                $videoBox.style.display = 'none';
                $canvas.style.display = 'block';

                this.stopVideoStream();
                $sendCaptureButton.disabled = false;
            }
        });
    }

    /**
     * Saves the images that is on the screen
     */
    saveButtonListener() {
        const $sendCaptureButton = document.getElementById('send-capture-button');
        $sendCaptureButton.disabled = true;
        $sendCaptureButton.addEventListener('click', () => {
            const $canvas = document.getElementById('video-canvas');
            const canvasBase64 = $canvas.toDataURL();
            this.sendImageToNode(canvasBase64);
            this.displayScreenMessage();
        });
    }

    /**
     * Stops the video stream
     */
    stopVideoStream() {
        window.stream.getTracks().forEach(function (track) {
            track.stop();
            window.stream = '';
        });
    }

    /**
     *
     * @param canvasBase64
     */
    sendImageToNode(canvasBase64) {
        STATIC.performFetch(canvasBase64, 'fetch.deposit');
        console.log(canvasBase64);
    }

    /**
     * Displays status message
     */
    displayScreenMessage() {
        const $mainDisplayBar = document.getElementById('main-display-bar');
        $mainDisplayBar.innerHTML = `<i id="image-sent">Image sent to server</i>`;
        setTimeout(() => {
            document.location.href="/home";
        }, 1250);
    }
}