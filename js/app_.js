let currentBubble = null;
let nextBubble = null;
let bubbles = [];  // Array to keep track of bubbles and their timeouts
let fadeTimeout = null;
// let disappearAfterEnter = false;

document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        console.log("(Main) -- Cond 1");
        finalizeBubble();
    } else if (event.key.length === 1) {
        console.log("(Main) -- Cond 2")
        createOrUpdateBubble(event.key);
    } else if (event.key === 'Backspace' && currentBubble) {
        console.log("(Main) -- Cond 3")
        currentBubble.textContent = currentBubble.textContent.slice(0, -1);
        if (currentBubble.textContent === "") {
            currentBubble.remove();
            currentBubble = null;
        }
    }
    resetFadeTimeout();
    console.log("(Main) ", currentBubble)
    console.log("(Main) ", fadeTimeout)
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
        resetFadeTimeout();
        nextBubble = currentBubble;
        currentBubble = null;  // Important to make new bubbles
        // disappearAfterEnter = true;
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
        }, 3000);
        // disappearAfterEnter = false;
        console.log("(resetFadeTimeout) -- If 2 -- Cond 1 -- after");
        console.log(fadeTimeout);
    }

    if (nextBubble) {
        fadeTimeout = setTimeout(() => {
            if (nextBubble) {  // the action to do after time is out
                nextBubble.remove();
                nextBubble = null;
            }
        }, 3000);
    }
}
