// Create Splash Screen
document.querySelector(".control-buttons span").onclick = function () {
    let yourName = prompt("Enter You Name");
    if (yourName == null || yourName == "") {
        document.querySelector(".name span").innerHTML = "Unknown";
    } else {
        document.querySelector(".name span").innerHTML = yourName;
    }
    document.querySelector('.control-buttons').remove();
}

// Get The Main Variables
let duration = 1000;
let blocksContainer = document.querySelector('.memory-game-blocks');
let blocks = Array.from(blocksContainer.children);
let orderRange = [...Array(blocks.length).keys()];
// let anotherWay = Array.from(Array(blocks.length).keys());
// let anotherOne = Array.from(blocks.keys());

// console.log(orderRange);
shuffle(orderRange);
// console.log(orderRange);

// Add Order Css Property To Blocks Elements
blocks.forEach((block, index) => {

    block.style.order = orderRange[index];

    block.addEventListener('click', function () {

        flipBlock(block);

    });
});

// Fliped Block Function
function flipBlock(selectedBlock) {

    selectedBlock.classList.add('is-flipped');

    let allFlipedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));

    if (allFlipedBlocks.length === 2) {

        // console.log("Now Two Cards Flipped");

        // Stop Clicking Function
        stopClicking();

        // Check Matching Function
        
        checkMatching(allFlipedBlocks[0], allFlipedBlocks[1]);

    }
}

// Stop Clicking Function
function stopClicking() {

    blocksContainer.classList.add('no-clicking');

    setTimeout(function () {
        blocksContainer.classList.remove('no-clicking');
    }, 1000)
}

// Check Matching Function
function checkMatching(firstBlock, secondBlock) {
    if (firstBlock.dataset.technology === secondBlock.dataset.technology) {

        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');

        firstBlock.classList.add('is-match');
        secondBlock.classList.add('is-match');

        document.getElementById('success').play();

    } else {

        setTimeout(function () {

            firstBlock.classList.remove('is-flipped');
            secondBlock.classList.remove('is-flipped');

            let tries = document.querySelector('.tries span');
            tries.innerHTML = parseInt(tries.innerHTML) + 1;

            document.getElementById('failure').play();

        }, duration);

    }
}

// Shuffle Function
function shuffle(array) {
    // Setting Variables
    let current = array.length;
    let temp;
    let random;
    while (current > 0) {
        // Create Random Number
        random = Math.floor(Math.random() * current);

        // Decrease Current By One
        current = current - 1;

        // Save The Random Index Of Array In Stash (Temporary Value)
        temp = array[current];

        // Current Index Of Array = Random Index Of Array
        array[current] = array[random];

        // Random Index Of Array = Temporary Value
        array[random] = temp;
    }
    return array;
}
