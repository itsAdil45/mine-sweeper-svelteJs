<script>
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
  
	// Create stores for grid columns, selected columns, and bet value
	const grid = writable([]);
	const selectedColumns = writable([]);
	const betValue = writable(0);
  
	let gameStarted = false;
	let prizeColumns = [];
  
	// Function to generate random prize columns
	function generatePrizeColumns() {
	  let columns = Array(20).fill(false);
	  let prizeColumns = [];
	  while (prizeColumns.length < 10) {
		let randomIndex = Math.floor(Math.random() * 20);
		if (!columns[randomIndex]) {
		  columns[randomIndex] = true;
		  prizeColumns.push(randomIndex);
		}
	  }
	  return columns;
	}
  
	onMount(() => {
	  prizeColumns = generatePrizeColumns();
	  grid.set(Array(20).fill(false)); // Initial grid setup, all columns hidden
	});
  
	function startGame() {
	  gameStarted = true;
	  selectedColumns.set([]); // Clear previous selections
	}
  
	function selectColumn(index) {
	  if (gameStarted) {
		selectedColumns.update(cols => {
		  if (cols.includes(index)) {
			return cols.filter(col => col !== index);
		  } else if (cols.length < 10) {
			return [...cols, index];
		  }
		  return cols;
		});
	  }
	}
  
	function confirmBet() {
	  selectedColumns.update(cols => {
		if (cols.length === 10) {
		  // Reveal prize columns and update the grid
		  grid.set(prizeColumns);
		
		  // Calculate rewards
		  let matches = cols.filter(col => prizeColumns[col]).length;
		  let prizeIndexes = prizeColumns
			.map((isPrize, index) => (isPrize ? index + 1 : null))
			.filter(index => index !== null);
  
		  // Trigger a re-render to ensure the prize columns are styled
		  setTimeout(() => {
			// Show alert after ensuring DOM update
			alert(`You matched ${matches} columns and won ${$betValue * matches}!\nPrize columns: ${prizeIndexes.join(', ')}`);
		  }, 100); // Small delay to ensure DOM update
  
		} else {
		  alert("Please select exactly 10 columns before confirming your bet.");
		}
		return cols;
	  });
	}
  </script>
  
  <style>
	.grid {
	  display: grid;
	  grid-template-columns: repeat(5, 1fr);
	  gap: 10px;
	}
	.column {
	  width: 50px;
	  height: 50px;
	  background-color: #eee;
	  display: flex;
	  justify-content: center;
	  align-items: center;
	  cursor: pointer;
	}
	.selected {
	  background-color: yellow;
	}
	.prize {
	  background-color: green !important; /* Ensure this color overrides the default */
	}
  </style>
  
  <div>
	<label for="betValue">Bet Value: </label>
	<input id="betValue" type="number" bind:value={$betValue} min="1" />
  </div>
  
  <div class="grid">
	{#each Array(20) as _, index}
	  <!-- svelte-ignore a11y-click-events-have-key-events -->
	  <div 
		class="column {gameStarted && $selectedColumns.includes(index) ? 'selected' : ''} {gameStarted && grid[index] ? 'prize' : ''}" 
		on:click={() => selectColumn(index)}
	  >
		{index + 1}
	  </div>
	{/each}
  </div>
  
  {#if !gameStarted}
	<button on:click={startGame}>Start Game</button>
  {/if}
  
  {#if gameStarted}
	<button on:click={confirmBet}>Confirm Bet</button>
  {/if}
  