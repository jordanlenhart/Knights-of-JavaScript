// these values are set at the beginning
// and then used throughout the game
let gameState = {
    players: 2,
    whoseTurn: 1,
    gameOver: false
}


// function that considers which player's turn it is and then
// changes the UI accordingly
function changePlayer() {
    // if the current player is player 1 at the end of a move
    if (gameState.whoseTurn === 1) {
        let playerTwoHealth = document.getElementById("playerTwoHealth");
        // conversts the innerHTML from string to a number and stores it in a variable
        let playerTwoHealthNum = Number(playerTwoHealth.innerHTML);
        // reduces by 10
        playerTwoHealthNum -= 10;
        // resets the HTML to the new value
        playerTwoHealth.innerHTML = playerTwoHealthNum;

        // checks if the player has reached 0 health
        if (playerTwoHealthNum <= 0) {
            // ensures health does not dig into the negative MUST EDIT THIS LINE OF CODE
            playerTwoHealth = 0;
            // ends the game AND THIS LINE
            gameOver();
        }
        else {
            // switch to the next player and change the UI's display / behavior THIS LINE TOO
            gameState.whoseTurn = 2;

            // grabs the 'playerName' element and changes the player's turn display
            let playerName = document.getElementById("playerName");
            playerName.innerHTML = `Player ${gameState.whoseTurn}`;
        }
    } 
}

// if a player's health reaches 0 at the end of a turn, the game ends
// and the winner is announced
function gameOver() {
    let title = document.getElementById("title");
    title.style = "display: none;";
    let playerTurnDisplay = document.getElementById("playerTurn");
    playerTurnDisplay.style = "display: none;";

    let winningPlayer = document.getElementById("winningPlayer");
    winningPlayer.innerHTML = `Player ${gameState.whoseTurn} wins!`

    let gameOverScreen = document.getElementById("gameOverScreen");
    gameOverScreen.style = "display: flex; flex-direction: column;";
}

// function that allows the player two attack button to reduce the player two's
// health
function attackPlayerTwo() {
    // compartmentalized function that will switch the player 2 attack button to inactive
    // and player 1 attack button to active using DOM manipulation
    // this also DISABLES the button, meaning they are not interactable
    function changeButtonStatus() {
        let playerTwoAttackButton = document.getElementById("playerTwoAttack");
        playerTwoAttackButton.disabled = true;
        playerTwoAttackButton.classList.add("inactive");
        playerTwoAttackButton.classList.remove("active");

        let playerOneAttackButton = document.getElementById("playerOneAttack");
        playerOneAttackButton.disabled = false;
        playerOneAttackButton.classList.add("active");
        playerOneAttackButton.classList.remove("inactive");
    }

    // commpartmentalized function that changes the player 1's sprite using the array
    // containing multiple images
    function animatePlayer() {
        // an array containing the images using in player one's animation
        // the indices are later used to cycle / "animate" when the player attacks
        let playerOneFrames = [
            "./images/R_Idle.png",
            "./images/R_Attack.png"
        ];

        let playerSprite = document.getElementById("playerOneSprite");
        // function we will call in setTimeout, before the frames change back
        // the idle stance
        // in other words, we set to the attack sprite, wait 3 seconds,
        // then set it back to the idle sprite
        playerSprite.src = playerOneFrames[1];
        
        // removes the 'idle' class from the player sprite
        playerSprite.classList.remove("idle");
        // adds the 'attack' class to the player sprite
        // ** CHECK THE CSS TO NOTE THE CHANGES MADE **
        playerSprite.classList.add("attack");

        // grabs the enemy sprite
        let enemySprite = document.getElementById("playerTwoSprite");
        let enemyDamage = document.getElementById("SFX_PlayerDamage");
        // removes the 'idle' class from the enemy sprite
        enemySprite.classList.remove("idle");
        // adds the 'attack' class to the enemy sprite
        // ** CHECK THE CSS TO NOTE THE CHANGES MADE **
        enemySprite.classList.add("damage");
        // sound that plays when enemy takes damage
        enemyDamage.play();

        // the function we will call in the setTimeOut method below
        // after 350 milliseconds
        // this function will execute this block of code
        function changePlayerOneSprite() {
            enemySprite.classList.remove("damage");
            enemySprite.classList.add("idle");

            playerSprite.src = playerOneFrames[0];
            playerSprite.classList.remove("attack");
            playerSprite.classList.add("idle");
        }

        setTimeout(changePlayerOneSprite, 350);
    }

    // for easy reading,
    // we do not include ALL of the above code within this condition
    // instead, we create higher-order functions to keep the code neat and readable
    if (gameState.whoseTurn === 1) {
        animatePlayer();
        changeButtonStatus();
        changePlayer();
    }
}

/* Function that allows player 1 attack button to reduce the health of player 1 when clicked */
function attackPlayerOne() {
    // if statement that is executed when the current player is player 2.
    if (gameState.whoseTurn === 2) {
        // set the variable for player 1 health from the html element, then ise .innerHTML to convert from string to a number, also stored in a variable.
        let playerOneHealth = document.getElementById("playerOneHealth");
        let playerOneHealthNum = Number(playerOneHealth.innerHTML);
        // reduce health by 10 and reset to the new value after losing 10
        playerOneHealthNum -= 10;
        playerOneHealth.innerHTML = playerOneHealthNum;

        /* compartamentalized function  that will change player 2 attack button to active and player 1 attack to inactive using DOM manipultion of classList properties. Using .disable, the buttons not interactable while inactive. */
        function changeButtonStatus() {
            let playerTwoAttackButton = document.getElementById("playerTwoAttack");
            playerTwoAttackButton.disabled = false;
            playerTwoAttackButton.classList.add("active");
            playerTwoAttackButton.classList.remove("inactive");
    
            let playerOneAttackButton = document.getElementById("playerOneAttack");
            playerOneAttackButton.disabled = true;
            playerOneAttackButton.classList.add("inactive");
            playerOneAttackButton.classList.remove("active");
        }

        // commpartmentalized function that changes the player 2's sprite using the array of different .png images, giving the animation
        function animatePlayer() {
        // an array containing the images using in player two's animation for attacking and idling
        let playerTwoFrames = [
            "./images/L_Idle.png",
            "./images/L_Attack.png"
        ];

        let playerSprite = document.getElementById("playerTwoSprite");
        // Basically, the sprite attacks, waits, then goes back to the idle sprite.
        playerSprite.src = playerTwoFrames[1];
        
        // removes the 'idle' from the player 2 sprite
        playerSprite.classList.remove("idle");
        // adds the 'attack' to the player 2 sprite
        playerSprite.classList.add("attack");

        // grabs the enemy sprite with getelemenetbyID
        let enemySprite = document.getElementById("playerOneSprite");
        let enemyDamage = document.getElementById("SFX_PlayerDamage");
        // removes the 'idle' class from the enemy sprite
        enemySprite.classList.remove("idle");
        // adds the 'attack' class to the enemy sprite to animate the enemy to show taking damage
        enemySprite.classList.add("damage");
        // sound that plays when enemy takes damage (does not work if clicked too fast)
        enemyDamage.play();

        // the function we will call in the setTimeOut method below after a certain amount of time (350ms)
        function changePlayerTwoSprite() {
            enemySprite.classList.remove("damage");
            enemySprite.classList.add("idle");
            // this is just adding and removing the damage and idle images to show animation.
            playerSprite.src = playerTwoFrames[0];
            playerSprite.classList.remove("attack");
            playerSprite.classList.add("idle");
        }
        // timeout sets the certain amount of time before stopping.
        setTimeout(changePlayerTwoSprite, 350);
    }
        // if it is player 2's turn, we will execute these functions when called/triggered via the buttons.
        if (gameState.whoseTurn === 2) {
            animatePlayer();
            changeButtonStatus();
            changePlayer();
        }
        //if player one has 0 or less health, game over function will be executed and called instead. 
        if (playerOneHealthNum <= 0) {
                playerOneHealth = 0;
                gameOver();
        } else {
            // switch to the next player and change the UI's display / behavior
            gameState.whoseTurn = 1;

            // grabs the 'playerName' element and changes the player's turn display
            let playerName = document.getElementById("playerName");
            playerName.innerHTML = `Player ${gameState.whoseTurn}`;
        }
    }
}

