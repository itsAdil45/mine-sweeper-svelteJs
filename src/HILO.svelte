<script>
	import { onMount } from 'svelte';
	import { currentCard, nextCard, score, gameOver } from './store';
  
	let deck = [];
	let message = '';
  
	onMount(() => {
	  startGame();
	});
  
	function startGame() {
	  deck = generateDeck();
	  currentCard.set(drawCard());
	  nextCard.set(drawCard());
	  score.set(0);
	  gameOver.set(false);
	  message = '';
	}
  
	function generateDeck() {
	  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
	  const values = Array.from({ length: 13 }, (_, i) => i + 1);
	  return suits.flatMap(suit => values.map(value => ({ suit, value })));
	}
  
	function drawCard() {
	  const randomIndex = Math.floor(Math.random() * deck.length);
	  return deck.splice(randomIndex, 1)[0];
	}
  
	function guessHigher() {
	  makeGuess(true);
	}
  
	function guessLower() {
	  makeGuess(false);
	}
  
	function makeGuess(isHigher) {
	  let current, next;
	  
	  currentCard.subscribe(value => current = value)();
	  nextCard.subscribe(value => next = value)();
  
	  if (current && next) {
		if ((isHigher && next.value > current.value) || (!isHigher && next.value < current.value)) {
		  score.update(n => n + 1);
		  currentCard.set(next);
		  nextCard.set(drawCard());
		} else {
		  gameOver.set(true);
		  message = 'Game Over! Your final score is ' + $score;
		}
	  } else {
		gameOver.set(true);
		message = 'Game Over! Error occurred.';
	  }
	}
  </script>
  
  <style>
	.game-container {
	  text-align: center;
	}
	.card {
	  font-size: 2em;
	}
	.buttons {
	  margin-top: 20px;
	}
  </style>
  
  <div class="game-container">
	<h1>HILO Game</h1>
	{#if $gameOver}
	  <p>{message}</p>
	  <button on:click={startGame}>Play Again</button>
	{:else}
	  <div class="card">Current Card: {#if $currentCard} {$currentCard.value} of {$currentCard.suit} {/if}</div>
	  <div class="card">Next Card: ??</div>
	  <div class="buttons">
		<button on:click={guessHigher}>Higher</button>
		<button on:click={guessLower}>Lower</button>
	  </div>
	  <p>Score: {$score}</p>
	{/if}
  </div>
  