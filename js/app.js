let currentBubble = null;
let bubbles = [];  // Array to keep track of bubbles and their timeouts
let fadeTimeout = null;
let timeOutMilliseconds = 5000;

document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        finalizeBubble();
    } else if (event.key.length === 1) {
        createOrUpdateBubble(event.key);
        resetFadeTimeout();
    } else if (event.key === 'Backspace' && currentBubble) {
        currentBubble.textContent = currentBubble.textContent.slice(0, -1);
        if (currentBubble.textContent === "") {
            currentBubble.remove();
            currentBubble = null;
        }
        resetFadeTimeout();
    }
});

function createOrUpdateBubble(text) {
    if (!currentBubble) {  
        // Create a container for the bubble
        let container = document.createElement('div');
        container.classList.add('bubble-container');
        document.getElementById('chatArea').appendChild(container);

        // Create the bubble inside the container
        currentBubble = document.createElement('div');
        currentBubble.classList.add('bubble');
        container.appendChild(currentBubble);
    }
    currentBubble.textContent += text;
    // if (!currentBubble) {  // if currentBubble is null
    //     currentBubble = document.createElement('div');
    //     currentBubble.classList.add('bubble');
    //     document.getElementById('chatArea').appendChild(currentBubble);
    // }
    // currentBubble.textContent += text;

    const maxLength = 25; // You can adjust this value as needed
    if (currentBubble.textContent.length > maxLength) {
        currentBubble.style.width = '80%'; // Set to max width when text length exceeds maxLength
        currentBubble.style.whiteSpace = 'normal'; // Allow the text to wrap
    }
}

function finalizeBubble() {
    if (currentBubble && currentBubble.textContent.trim() !== "") {

        // Create a timeout for the bubble
        let timeoutID = setTimeout(() => {
            // Get the container of the bubble
            let container = bubbles[0].element.parentElement;
            container.classList.add('fadeOut');
            setTimeout(() => {
                bubbles = bubbles.filter(b => b.element !== currentBubble);
                container.remove();
                bubbles[0].element = null;
                bubbles.shift();
            }, 1000);
        }, timeOutMilliseconds);
        //resetFadeTimeout();
        bubbles.push({ element: currentBubble, timeout: timeoutID })
        currentBubble = null;  // Important to make new bubbles
    } else if (currentBubble) {
        currentBubble.remove();
        currentBubble = null;
    }
}

function resetFadeTimeout() {
    // Clear the previous timeout
    if (fadeTimeout) {
        clearTimeout(fadeTimeout);
    }

    // Set a new timeout if there's a current bubble
    if (currentBubble) {
        fadeTimeout = setTimeout(() => {
            if (currentBubble) {
                let container = currentBubble.parentElement; // Get the container of the bubble
                container.classList.add('fadeOut'); // Add fadeOut class to the container

                // Wait for the fade-out effect to complete before removing the element
                setTimeout(() => {
                    container.remove();
                    currentBubble = null;
                }, 1000); 
            }
        }, timeOutMilliseconds);
    }
}
