import React, { useState, useEffect, useCallback } from 'react';
import WordDisplay from './WordDisplay';
import Keyboard from './Keyboard';
import HangmanDrawing from './HangmanDrawing';
import CategorySelector from './CategorySelector';
import wordList from '../wordList.json';

// Define the structure of the word list, where each category contains an array of words
interface WordList {
    [category: string]: string[];
}

// Typecast the imported word list to ensure it matches the defined WordList interface
const typedWordList = wordList as WordList;

// Helper function to get a random word from a selected category
const getRandomWord = (category: string) => {
    const words = typedWordList[category];
    return words[Math.floor(Math.random() * words.length)];
};

const Hangman: React.FC = () => {
    // State variables to keep track of the selected category, word, guessed letters, and incorrect guesses
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedWord, setSelectedWord] = useState<string | null>(null);
    const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
    const [incorrectGuesses, setIncorrectGuesses] = useState<number>(0);

    const maxAttempts = 6; // Maximum number of incorrect guesses before the game ends

    // Check if the game is over (too many incorrect guesses) or if the player has won (guessed all letters)
    const gameOver = incorrectGuesses >= maxAttempts;
    const gameWon = selectedWord
        ? selectedWord.split('').every((letter) => guessedLetters.includes(letter))
        : false;

    // Handle guessing a letter; updates guessed letters and incorrect guesses
    const handleGuess = useCallback(
        (letter: string) => {
            if (guessedLetters.includes(letter) || gameOver || gameWon) return; // Prevent repeated guesses or guessing after game over/win
            setGuessedLetters((prev) => [...prev, letter]);

            if (selectedWord && !selectedWord.includes(letter)) {
                setIncorrectGuesses((prev) => prev + 1); // Increment incorrect guesses if the letter is not in the word
            }
        },
        [guessedLetters, selectedWord, gameOver, gameWon]
    );

    // Reset the game to start over with a new word from the same category
    const resetGame = () => {
        if (selectedCategory) {
            setSelectedWord(getRandomWord(selectedCategory)); // Choose a new random word
        }
        setGuessedLetters([]); // Clear guessed letters
        setIncorrectGuesses(0); // Reset incorrect guesses
    };

    // Handle the selection of a category; reset the game and choose a word from the selected category
    const handleCategorySelect = (category: string) => {
        setSelectedCategory(category); // Update the category
        setSelectedWord(getRandomWord(category)); // Select a new word from the chosen category
        setGuessedLetters([]); // Reset guessed letters for the new game
        setIncorrectGuesses(0); // Reset incorrect guesses
    };

    // Add keyboard event listeners for typing guesses and resetting the game with "Enter"
    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            const { key } = event;
            if (key.length === 1 && key.match(/[a-z]/i)) {
                const lowerKey = key.toLowerCase();
                handleGuess(lowerKey); // Handle letter input
            } else if (key === 'Enter') {
                if (gameOver || gameWon) {
                    resetGame(); // Reset game if it's over or won
                }
            }
        };

        // Attach the event listener to capture key presses
        window.addEventListener('keydown', handleKeyPress);

        // Cleanup the event listener when the component unmounts
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [guessedLetters, handleGuess, gameOver, gameWon]);

    // Render the category selection screen if no category is selected
    if (!selectedCategory) {
        return (
            <div className="hangman">
                <CategorySelector
                categories={Object.keys(typedWordList)} // List the available categories
                onSelectCategory={handleCategorySelect} // Handle category selection
                />
            </div>
        );
    }

    // Render the game interface with the hangman drawing, word display, guesses, and keyboard
    return (
        <div
        style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            height: '100vh', // Full-page height for centering
        }}
        >
        <h1>Hangman Game</h1>
        <p>Category: {selectedCategory}</p>
        <div style={{ display: 'flex', gap: '150px', alignItems: 'flex-start' }}>
            {/* Display the hangman drawing based on the number of incorrect guesses */}
            <HangmanDrawing numberOfGuesses={incorrectGuesses} />
            <div style={{ marginTop: '60px'}}>
            {/* Display the word with guessed letters revealed */}
            {selectedWord && (
            <WordDisplay word={selectedWord} guessedLetters={guessedLetters} />
            )}
            </div>
        </div>
        <p>
            Wrong guesses: {incorrectGuesses} / {maxAttempts}
        </p>
        {/* Display game-over or victory message based on the game state */}
        {gameOver && <p>Game Over! The word was "{selectedWord}".</p>}
        {gameWon && <p>Congratulations! You guessed the word.</p>}
        {/* Render the keyboard component for guessing letters */}
        <Keyboard
            handleGuess={handleGuess}
            guessedLetters={guessedLetters}
            disabled={gameOver || gameWon} // Disable keyboard when the game is over or won
        />
        {/* Display "Play Again" button if the game is over or won */}
        {(gameOver || gameWon) && (
            <button onClick={resetGame}>Play Again</button>
        )}
        </div>
    );
};

export default Hangman;