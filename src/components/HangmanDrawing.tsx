import React from 'react';

type HangmanDrawingProps = {
    numberOfGuesses: number; // The number of incorrect guesses made so far
};

// Define the head part of the hangman
const HEAD = (
    <div
        style={{
            width: '30px',
            height: '30px',
            borderRadius: '100%', // Circular shape
            border: '5px solid black', // Outline of the head
            position: 'absolute', // Position relative to the hangman drawing container
            top: '30px', // Distance from the top of the container
            right: '-15px', // Slightly shifted to the left
        }}
    />
);

// Define the body part of the hangman
const BODY = (
    <div
        style={{
            width: '6px',
            height: '70px',
            background: 'black', // Solid black body
            position: 'absolute',
            top: '65px', // Positioned below the head
            right: '0',
        }}
    />
);

// Define the right arm of the hangman
const RIGHT_ARM = (
    <div
        style={{
            width: '60px',
            height: '6px',
            background: 'black', // Solid black arm
            position: 'absolute',
            top: '90px', // Position near the upper body
            right: '-60px', // Rotated to look like an arm extending out
            transform: 'rotate(-30deg)', // Rotating the arm
            transformOrigin: 'left bottom', // Rotation point of the arm
        }}
    />
);

// Define the left arm of the hangman
const LEFT_ARM = (
    <div
        style={{
            width: '60px',
            height: '6px',
            background: 'black', // Solid black arm
            position: 'absolute',
            top: '90px', // Positioned similarly to the right arm
            right: '6px',
            transform: 'rotate(30deg)', // Rotating the arm
            transformOrigin: 'right bottom', // Rotation point of the arm
        }}
    />
);

// Define the right leg of the hangman
const RIGHT_LEG = (
    <div
        style={{
            width: '60px',
            height: '6px',
            background: 'black', // Solid black leg
            position: 'absolute',
            top: '125px', // Positioned below the body
            right: '-55px',
            transform: 'rotate(60deg)', // Rotated to look like a leg extending down
            transformOrigin: 'left bottom', // Rotation point of the leg
        }}
    />
);

// Define the left leg of the hangman
const LEFT_LEG = (
    <div
        style={{
            width: '60px',
            height: '6px',
            background: 'black', // Solid black leg
            position: 'absolute',
            top: '125px', // Positioned similarly to the right leg
            right: '0',
            transform: 'rotate(-60deg)', // Rotated to look like a leg extending down
            transformOrigin: 'right bottom', // Rotation point of the leg
        }}
    />
);

// Array containing the body parts to be revealed in the correct order based on incorrect guesses
const BODY_PARTS = [HEAD, BODY, RIGHT_ARM, LEFT_ARM, RIGHT_LEG, LEFT_LEG];

// HangmanDrawing component that renders the hangman based on the number of incorrect guesses
const HangmanDrawing: React.FC<HangmanDrawingProps> = ({ numberOfGuesses }) => {
    return (
        <div
            style={{
                position: 'relative',
                height: '250px',
                width: '200px',
                marginBottom: '0',
            }}
        >
        {/* Display only the body parts corresponding to the number of incorrect guesses */}
        {BODY_PARTS.slice(0, numberOfGuesses)}

        {/* Render the vertical support beam */}
        <div
            style={{
                height: '30px',
                width: '6px',
                background: 'black',
                position: 'absolute',
                top: 0,
                right: 2,
            }}
        />

        {/* Render the horizontal support beam */}
        <div
            style={{
                height: '6px',
                width: '120px',
                background: 'black',
                position: 'absolute',
                top: 0,
                left: 75,
            }}
        />

        {/* Render the vertical stand on the left */}
        <div
            style={{
                height: '195px',
                width: '6px',
                background: 'black',
                position: 'absolute',
                right: '120px',
                top: 0,
            }}
        />

        {/* Render the base (ground) */}
        <div
            style={{
                height: '6px',
                width: '150px',
                background: 'black',
                position: 'absolute',
                bottom: '50px',
                right: '50px',
            }}
        />
        </div>
    );
};

export default HangmanDrawing;