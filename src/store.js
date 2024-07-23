import { writable } from 'svelte/store';

export const currentCard = writable(null);
export const nextCard = writable(null);
export const score = writable(0);
export const gameOver = writable(false);
