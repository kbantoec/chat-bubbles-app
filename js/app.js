let currentBubble = null;
let bubbles = [];  // Array to keep track of bubbles and their timeouts
let fadeTimeout = null;
let timeOutMilliseconds = 5000;

document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        console.log("(Main) -- Cond 1");
        console.log(bubbles);
        finalizeBubble();
    } else if (event.key.length === 1) {
        console.log("(Main) -- Cond 2");
        console.log(bubbles);
        createOrUpdateBubble(event.key);
        resetFadeTimeout();
    } else if (event.key === 'Backspace' && currentBubble) {
        console.log("(Main) -- Cond 3");
        console.log(bubbles);
        currentBubble.textContent = currentBubble.textContent.slice(0, -1);
        if (currentBubble.textContent === "") {
            currentBubble.remove();
            currentBubble = null;
        }
        resetFadeTimeout();
    }
    
    console.log("(Main) ", currentBubble)
    console.log("(Main) ", fadeTimeout)
    console.log("(Main)", bubbles);
});

function createOrUpdateBubble(text) {
    if (!currentBubble) {  // if currentBubble is null
        currentBubble = document.createElement('div');
        currentBubble.classList.add('bubble');
        document.getElementById('chatArea').appendChild(currentBubble);
    }
    currentBubble.textContent += text;
}

function finalizeBubble() {
    if (currentBubble && currentBubble.textContent.trim() !== "") {
        console.log("(finalizeBubble) -- Cond 1");
        console.log(currentBubble);
        console.log(fadeTimeout);

        // Create a timeout for the bubble
        let timeoutID = setTimeout(() => {
            setTimeout(() => {
                // Remove the bubble's record from the bubbles array
                bubbles = bubbles.filter(b => b.element !== currentBubble);
                bubbles[0].element.remove();                
                bubbles[0].element = null;
                bubbles.shift();
            }, 1000);
        }, timeOutMilliseconds);
        //resetFadeTimeout();
        bubbles.push({ element: currentBubble, timeout: timeoutID })
        currentBubble = null;  // Important to make new bubbles
    } else if (currentBubble) {
        console.log("(finalizeBubble) -- Cond 2");
        console.log(currentBubble);
        console.log(fadeTimeout);
        currentBubble.remove();
        currentBubble = null;
    }
}

function resetFadeTimeout() {
    console.log("in resetFadeTimeout")
    // Clear the previous timeout
    if (fadeTimeout) {  // if fadeTimeout is not null
        clearTimeout(fadeTimeout);
        console.log("(resetFadeTimeout) --If 1")
        console.log(fadeTimeout)
    }

    // Set a new timeout if there's a current bubble
    if (currentBubble) {
        console.log("(resetFadeTimeout) -- If 2 -- Cond 1 -- before");
        console.log(fadeTimeout);
        fadeTimeout = setTimeout(() => {
            if (currentBubble) {  // the action to do after time is out
                currentBubble.remove();
                currentBubble = null;
            }
        }, timeOutMilliseconds);
        console.log("(resetFadeTimeout) -- If 2 -- Cond 1 -- after");
        console.log(fadeTimeout);
    }


}
