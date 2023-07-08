import { useState } from 'react';

export const useCounter = (initialValue = 1, stockValue = 1) => {
	const [counter, setCounter] = useState(initialValue);

	// Funciones que voy a requerir
	const increment = (value = 1) => {
		if (stockValue > counter) {
			return setCounter(counter + value);
		}
	};

	const decrement = (value = 1) => {
		if (counter === 1) return; // Para que no pueda bajar de 1
		setCounter(counter - value);
	};

	const reset = () => {
		setCounter(initialValue);
	};

	return {
		counter,
		increment,
		decrement,
		reset,
	};
};
