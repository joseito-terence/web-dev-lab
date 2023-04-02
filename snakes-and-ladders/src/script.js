let noOfPlayers;
let player_position = [-1, -1, -1, -1]; // position of each player's token.
let next_player = 0;
let againstComputer = false; // 1 player plays against the computer.

// WILL EXECUTE ONCLICK START BUTTON.
document.querySelector("#start-game").addEventListener("click", () => {
  noOfPlayers = parseInt(document.querySelector("#noOfPlayers").value);

  if (noOfPlayers == 1) {
    noOfPlayers = 2;
    againstComputer = true;
  }

  document.querySelectorAll(".token")
    .forEach((token, i) => {
      token.style.display = i < noOfPlayers ? "block" : "none";
    });

  document.querySelector(".startScreen").style.display = "none";

  indicateTurn(); // indicate player's turn first.
});

const dice = document.querySelector("#dice");
dice.addEventListener("click", () => {                                        // EXECUTE WHEN DICE IS CLICKED
  let dice_value = rollDice();                                                // STEP 1: Roll Dice.

  if (!move_token(dice_value)) {                                              // STEP 2: Move the player's token.
    next_player = next_player == noOfPlayers - 1 ? 0 : next_player + 1;       // STEP 3: Mark player's turn.
  }

  indicateTurn();                                                             // STEP 4: Indicate player's turn.

  if (againstComputer && next_player == 1) {                                  // If single player game, then computer plays against the player.
    setTimeout(() => {
      console.log("computer's turn");
      dice.click();
    }, 1000);
  }
});

// DICE ROLE FUNCTION [RETURNS RANDOM NO. FROM 0 - 6]
function rollDice() {
  let dice_value = Math.floor(Math.random() * 6) + 1;

  dice.classList.toggle("is-rolled");
  dice.src = `./src/dice/dice${dice_value}.png`; // Display the dice on screen.

  return dice_value;
}

// INDICATES THE PLAYER'S TURN IN THE INDICATION PANEL
function indicateTurn() {
  if (next_player > 0)
    document.querySelector(`#turn-indicator-panel #player${next_player}`).style.border = "none";

  document.querySelector(`#turn-indicator-panel #player${next_player + 1}`).style.border = "5px solid red";

  if (next_player == 0)
    document.querySelector(`#turn-indicator-panel #player${noOfPlayers}`).style.border = "none";
}

// TOKEN
const token = (pid) => `<div id=\"player${pid + 1}\" class=\"token\"></div>`;

// MOVE THE TOKEN
function move_token(dice_value) {
  const i = next_player; // i holds the id of the current player.
  const new_pos = dice_value + player_position[i];
  if (new_pos <= 30) {

    if (player_position[i] == -1) {
      if (dice_value == 6) {
        player_position[i] = 0;
        return true;
      }
      return false;
    }

    if (player_position[i] != 0)
      document.querySelector(`#c${player_position[i]}`).innerHTML = "";
    player_position[i] = new_pos;

    let cur_pos = document.querySelector(`#c${player_position[i]}`);
    cur_pos.innerHTML = token(i);

    checkForSnakesOrLadders(cur_pos, i);
  } else {
    return false;        // if dice_value + player_position[i] > 30 don't move token.
  }


  if (new_pos == 30) gameEnded(i);

  if (dice_value == 6) return true;  // return true to get another turn.
}

// CHECK IF THE BLOCK HAS A SNAKE OR A LADDER
function checkForSnakesOrLadders(cur_pos, pid) {
  let new_pos = "";
  if (cur_pos.id.match(/c3|c5|c11|c20/g) != null)
    new_pos = cur_pos.dataset.ladderend;
  else if (cur_pos.id.match(/c17|c19|c21|c27/g) != null)
    new_pos = cur_pos.dataset.snakeend;

  if (new_pos != "") {
    setTimeout(() => {
      cur_pos.innerHTML = "";
      document.querySelector(`#c${new_pos}`).innerHTML = token(pid);
      player_position[pid] = parseInt(new_pos);
    }, 500);
  }
}

// Game Ended
function gameEnded(pid) {
  if (againstComputer) alert((pid == 0) ? "You Win!" : "You Lose!");
  else alert(`Player ${pid + 1} won!`);

  window.location.reload();
}
