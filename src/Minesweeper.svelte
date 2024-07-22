<script>
    let rows = 10;
    let cols = 10;
    let mines = 20;
    let board = [];
    let gameOver = false;
  
    function initializeBoard() {
      board = Array(rows)
        .fill()
        .map(() => Array(cols).fill({ revealed: false, mine: false, number: 0 }));
  
      // Place mines
      let minesPlaced = 0;
      while (minesPlaced < mines) {
        let row = Math.floor(Math.random() * rows);
        let col = Math.floor(Math.random() * cols);
        if (!board[row][col].mine) {
          board[row][col].mine = true;
          minesPlaced++;
        }
      }
  
      // Calculate numbers
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (board[r][c].mine) continue;
          let numMines = 0;
          for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
              if (
                r + dr >= 0 &&
                r + dr < rows &&
                c + dc >= 0 &&
                c + dc < cols &&
                board[r + dr][c + dc].mine
              ) {
                numMines++;
              }
            }
          }
          board[r][c].number = numMines;
        }
      }
    }
  
    function revealCell(row, col) {
      if (gameOver || board[row][col].revealed) return;
      board[row][col].revealed = true;
      if (board[row][col].mine) {
        gameOver = true;
        alert("Game Over!");
      }
    }
  
    initializeBoard();
  </script>
  
  <style>
    .board {
      display: grid;
      grid-template-columns: repeat(10, 40px);
    }
    .cell {
      width: 40px;
      height: 40px;
      border: 1px solid black;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .mine {
      background-color: red;
    }
    .revealed {
      background-color: lightgrey;
    }
  </style>
  
  <div class="board">
    {#each board as row, r}
      {#each row as cell, c}
        <div
          class="cell {cell.revealed ? 'revealed' : ''} {cell.mine ? 'mine' : ''}"
          >
          <!-- on:click={() => revealCell(r, c)} -->
          {cell.revealed && !cell.mine ? cell.number : ''}
        </div>
      {/each}
    {/each}
  </div>
  