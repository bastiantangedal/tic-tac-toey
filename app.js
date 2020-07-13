const vue = new Vue({
  el: '#app',
  data: {
    name: 'Tic Tac.. Toey'
  }
})

//#region Variables
// If false: X turn, true? O turn
var turn = false;

var turnCount = 0;

var gameInProgress = true;
var doubleCheckedWin = false;

const buttons = [
  document.getElementById('A1'),
  document.getElementById('A2'),
  document.getElementById('A3'),
  document.getElementById('B1'),
  document.getElementById('B2'),
  document.getElementById('B3'),
  document.getElementById('C1'),
  document.getElementById('C2'),
  document.getElementById('C3')
];

const A1 = document.getElementById('A1');
const A2 = document.getElementById('A2');
const A3 = document.getElementById('A3');
const B1 = document.getElementById('B1');
const B2 = document.getElementById('B2');
const B3 = document.getElementById('B3');
const C1 = document.getElementById('C1');
const C2 = document.getElementById('C2');
const C3 = document.getElementById('C3');
//#endregion

//#region Game logic & loop
buttons.forEach(button => button.addEventListener('click', () => {
  if (button.innerHTML == '' && gameInProgress) {
    if (turn == false) {
      button.style.color = 'green'
      button.innerHTML = "X";
    } else {
      button.style.color = 'blue'
      button.innerHTML = "O";
    }
    
    turn = !turn;
    turnCount++;

    if (checkForWinner()) {
      if (!doubleCheckedWin) {
        checkForWinner();
        doubleCheckedWin = true;
        return;
      } else {
        gameInProgress = false;
      }
    } else if (turnCount == 9) {
      gameInProgress = false;

      buttons.forEach(button => {
        button.style.color = 'black';
      });
      
      elementsAddClass(buttons, 'rotate');

      setTimeout(function() {
        resetGame();
        elementsRemoveClass(buttons, 'rotate');
      }, 2500);
    }
  }
}));

function checkForWinner() {
  // Horizontal checks
  if (A1.innerHTML == A2.innerHTML && A2.innerHTML == A3.innerHTML && (A1.innerHTML != '')) {
    colorWinningButtons(A1, A2, A3);
    return true;
  }
  if (B1.innerHTML == B2.innerHTML && B2.innerHTML == B3.innerHTML && (B1.innerHTML != '')) {
    colorWinningButtons(B1, B2, B3);
    return true;
  }
  if (C1.innerHTML == C2.innerHTML && C2.innerHTML == C3.innerHTML && (C1.innerHTML != '')) {
    colorWinningButtons(C1, C2, C3);
    return true;
  }

  // Vertical checks
  if (A1.innerHTML == B1.innerHTML && B1.innerHTML == C1.innerHTML && (A1.innerHTML != '')) {
    colorWinningButtons(A1, B1, C1);
    return true;
  }
  if (A2.innerHTML == B2.innerHTML && B2.innerHTML == C2.innerHTML && (A2.innerHTML != '')) {
    colorWinningButtons(A2, B2, C2);
    return true;
  }
  if (A3.innerHTML == B3.innerHTML && B3.innerHTML == C3.innerHTML && (A3.innerHTML != '')) {
    colorWinningButtons(A3, B3, C3);
    return true;
  }

  // Diagonal checks
  if (A1.innerHTML == B2.innerHTML && B2.innerHTML == C3.innerHTML && (A1.innerHTML != '')) {
    colorWinningButtons(A1, B2, C3);
    return true;
  }
  if (A3.innerHTML == B2.innerHTML && B2.innerHTML == C1.innerHTML && (A3.innerHTML != '')) {
    colorWinningButtons(A3, B2, C1);
    return true;
  }

  return false;
}

function colorWinningButtons(button1, button2, button3) {
  // Reset buttons
  buttons.forEach(button => {
    if (button != button1 && button != button2 && button != button3) {
      button.style.color = 'black';
      button.style.opacity = '35%';
    }
  });

  if (button1.innerHTML == 'O') {
    button1.style.color = 'blue';
    button2.style.color = 'blue';
    button3.style.color = 'blue';
  } else if (button1.innerHTML == 'X') {
    button1.style.color = 'green';
    button2.style.color = 'green';
    button3.style.color = 'green';
  }

  elementAddClass(button1, 'rotate');
  elementAddClass(button2, 'rotate');
  elementAddClass(button3, 'rotate');
  
  setTimeout(function() {
    elementRemoveClass(button1, 'rotate');
    elementRemoveClass(button2, 'rotate');
    elementRemoveClass(button3, 'rotate');
  
    resetGame();
  }, 2500);
}

function resetGame() {
  // Reset buttons
  buttons.forEach(button => {
    button.style.color = 'black';
    button.innerHTML = '';
    button.style.opacity = '100%';
  });

  turn = false;
  turnCount = 0;
  gameInProgress = true;
  doubleCheckedWin = false;
}
//#endregion

//#region Helper functions
function elementAddClass(element, classToAdd) {
  element.classList.add(classToAdd);
}

function elementsAddClass(elements, classToAdd) {
  elements.forEach(element => {
    element.classList.add(classToAdd);
  }); 
}

function elementsRemoveClass(elements, classToRemove) {
  elements.forEach(element => {
    element.classList.remove(classToRemove);
  }); 
}

function elementRemoveClass(element, classToRemove) {
  element.classList.remove(classToRemove);
}
//#endregion