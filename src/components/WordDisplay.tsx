import React from 'react';

interface WordDisplayProps {
    word: string;
    guessedLetters: string[];
}

const WordDisplay: React.FC<WordDisplayProps> = ({ word, guessedLetters }) => {
    return (
        <div className="word-display">
            {word.split('').map((letter, index) => (
                <span key={index} className="letter">
                    {guessedLetters.includes(letter) ? letter : '_'}
                </span>
            ))}
        </div>
    );
};

export default WordDisplay;