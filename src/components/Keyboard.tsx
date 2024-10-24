import React, { useEffect } from 'react';

interface KeyboardProps {
  handleGuess: (letter: string) => void;
  guessedLetters: string[];
  disabled: boolean;
}

const KEYS = 'abcdefghijklmnopqrstuvwxyz'.split('');

const Keyboard: React.FC<KeyboardProps> = ({ handleGuess, guessedLetters, disabled }) => {
    // Handle physical keyboard input
    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            const { key } = event;
            if (key.length === 1 && key.match(/[a-z]/i)) { // Only allow alphabetical letters
                const lowerKey = key.toLowerCase();
                if (!guessedLetters.includes(lowerKey) && !disabled) {
                    handleGuess(lowerKey);
                }
            }
        };

    // Add event listener for keydown
    window.addEventListener('keydown', handleKeyPress);

    // Cleanup event listener on unmount
    return () => {
        window.removeEventListener('keydown', handleKeyPress);
    };
    }, [guessedLetters, disabled, handleGuess]);

    return (
        <div className="keyboard">
        {KEYS.map((letter) => (
            <button
            key={letter}
            onClick={() => handleGuess(letter)}
            disabled={guessedLetters.includes(letter) || disabled}
            style={{
                padding: '10px',
                margin: '5px',
                fontSize: '18px',
                cursor: guessedLetters.includes(letter) ? 'not-allowed' : 'pointer',
                backgroundColor: guessedLetters.includes(letter) ? 'grey' : 'lightblue',
            }}
            >
            {letter.toUpperCase()}
            </button>
        ))}
        </div>
    );
};

export default Keyboard;