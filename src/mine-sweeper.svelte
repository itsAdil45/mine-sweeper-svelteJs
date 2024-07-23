 <script>
	let rows = 10;
	let cols = 10;
	let mines = 20;
	let board = [];
	let gameOver = false;
  
	function shuffleArray(array) {
	  for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	  }
	  return array;
	}
  
	function initializeBoard() {
	  console.log("Initializing board...");
	  gameOver = false;
	  // Create an empty board
	  board = Array.from({ length: rows }, () => 
		Array.from({ length: cols }, () => ({ revealed: false, mine: false, number: 0 }))
	  );
  
	  // Create an array of all possible cell indices
	  let cellIndices = [];
	  for (let r = 0; r < rows; r++) {
		for (let c = 0; c < cols; c++) {
		  cellIndices.push({ r, c });
		}
	  }
  
	  // Shuffle the array and take the first 'mines' elements to place mines
	  cellIndices = shuffleArray(cellIndices);
	  for (let i = 0; i < mines; i++) {
		const { r, c } = cellIndices[i];
		board[r][c].mine = true;
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
  
	  console.log("Board initialized:", board);
	}
  
	function revealCell(row, col) {
    if (gameOver || board[row][col].revealed) return;
    board[row][col].revealed = true;
    if (board[row][col].mine) {
      gameOver = true;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (board[r][c].mine) {
            board[r][c].revealed = true;
          }
        }
      }
    }
  }
  
	initializeBoard();
  </script>
  
  <style>
	.btn{
		margin-top: 10px;
		width: 150px;
		background-color: black;
		color: white;
		border-radius: 12px;
	}
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
	  cursor: pointer;
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
		<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
		<div
		  class="cell {cell.revealed && !cell.mine ? 'revealed' : ''} {cell.mine && cell.revealed ? 'mine' : ''}"
		  tabindex="0" 
		  on:click={() => revealCell(r, c)}
		  on:keydown={(e) => { if (e.key === 'Enter' || e.key === ' ') revealCell(r, c); }}
		>
		
		  <!-- {cell.revealed && !cell.mine ? cell.number : ''} -->
		</div>
		{/each}
		{/each}
		<button class="btn" on:click={()=>initializeBoard()}>initializeBoard</button>
  </div>
 