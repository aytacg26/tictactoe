/**
 * TIC TAC TOE ON JAVASCRIPT
 * Developer : Aytaç Güley
 * Nicosia, Cyprus
 */

window.onload = () => {
  const buttons = document.querySelectorAll('button');
  const winLine = document.querySelector('.winner-line');
  const alert = document.querySelector('.alert-box');
  const clickedButtons = [];
  let current = 'X';

  const selectedBox = (button) => {
    button.innerHTML = current;
    if (current === 'X') {
      button.classList.add('x-red-color');
      current = 'O';
    } else {
      button.classList.add('o-black-color');
      current = 'X';
    }
    button.disabled = true;
  };

  const addClickedButtons = (button) => {
    clickedButtons.push({ id: button.id, player: button.innerHTML });
  };

  const getXClicks = (clickedButtons) => {
    const xClicks = clickedButtons
      .filter((btn) => btn.player === 'X')
      .map((pS) => pS.id)
      .sort()
      .join('');

    return xClicks;
  };

  const getOClicks = (clickedButtons) => {
    const oClicks = clickedButtons
      .filter((btn) => btn.player === 'O')
      .map((pS) => pS.id)
      .sort()
      .join('');

    return oClicks;
  };

  const hasWinnerNum = (player) => {
    const winnerNums = [
      ['1', '2', '3'],
      ['4', '5', '6'],
      ['7', '8', '9'],
      ['1', '4', '7'],
      ['2', '5', '8'],
      ['3', '6', '9'],
      ['1', '5', '9'],
      ['3', '5', '7'],
    ];
    let wins = false;
    let winnerLine = '';

    winnerNums.forEach((num) => {
      let count = 0;
      num.forEach((n) => {
        if (player.includes(n)) {
          count++;
        }
      });

      if (count === 3) {
        wins = true;
        winnerLine = num.join('');
      }
    });

    return { wins, line: `L${winnerLine}` };
  };

  const disableButtons = (buttons) => {
    buttons.forEach((btn) => {
      if (!btn.disabled) {
        btn.disabled = true;
      }
    });
  };

  const restartGame = (message) => {
    const timer = setTimeout(() => {
      alert.classList.add('active');
      alert.innerText = message;
      clearTimeout(timer);
      const removeAlert = setTimeout(() => {
        alert.classList.remove('active');
        clearTimeout(removeAlert);
        const restart = setTimeout(() => {
          location.reload();
          clearTimeout(restart);
        }, 1500);
      }, 4000);
    }, 300);
  };

  //pS => playerSelection
  const evaluateWinner = (clickedButtons) => {
    const xClicks = getXClicks(clickedButtons);
    const oClicks = getOClicks(clickedButtons);

    const xIsWinner = hasWinnerNum(xClicks);
    const oIsWinner = hasWinnerNum(oClicks);

    if (xIsWinner.wins) {
      winLine.classList.add(xIsWinner.line);
      const message = 'Player X Wins!';
      restartGame(message);
    } else if (oIsWinner.wins) {
      winLine.classList.add(oIsWinner.line);
      const message = 'Player O Wins!';
      restartGame(message);
    } else {
      if (clickedButtons.length === 9) {
        restartGame('Cats Game!');
      }
    }

    if (xIsWinner.wins || oIsWinner.wins) {
      disableButtons(buttons);
    }
  };

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      button.classList.remove('ghost-X');
      button.classList.remove('ghost-O');
      selectedBox(button);
      addClickedButtons(button);

      if (clickedButtons.length > 4) {
        evaluateWinner(clickedButtons);
      }
      button.removeEventListener('click');
      button.removeEventListener('mouseover');
      button.removeEventListener('mouseout');
    });

    button.addEventListener('mouseover', () => {
      button.innerText = current;
      button.classList.add(`ghost-${current}`);
    });

    button.addEventListener('mouseout', () => {
      button.innerText = '';
      button.classList.remove(`ghost-${current}`);
    });
  });
};
