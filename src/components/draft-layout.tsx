'use client';

import { useState, useEffect } from "react";

export default function DraftLayout() {
  const [availableColors, setAvailableColors] = useState([]);
  const [currentGuess, setCurrentGuess] = useState<string[]>([]);
  const [submittedGuesses, setSubmittedGuesses] = useState<string[][]>([]);
  const MAX_GUESSES = 20;

  useEffect(() => {
    const API = process.env.NEXT_PUBLIC_API_URL;
    
    const fetchAvailableColors = async () => {
      try {
        const response = await fetch(`${API}/colors`);
        const colors = await response.json();
        setAvailableColors(colors);
      } catch (error) {
        console.error('Error fetching colors:', error);
      }
    };

    fetchAvailableColors();
  }, []);

  const addColorToGuess = (color: string) => {
    if (currentGuess.length < 6) {
      setCurrentGuess([...currentGuess, color]);
    }
  };

  const removeColorFromGuess = () => {
    if (currentGuess.length > 0) {
      setCurrentGuess(currentGuess.slice(0, -1));
    }
  }

  const submitGuess = () => {
    if (currentGuess.length === 6) {
      setSubmittedGuesses([...submittedGuesses, currentGuess]);
      setCurrentGuess([]);
    }
  };

  const getColorClass = (color: string) => {
    const colorMap: { [key: string]: string } = {
      'Red': 'bg-red-500',
      'Blue': 'bg-blue-500',
      'Green': 'bg-green-500',
      'Yellow': 'bg-yellow-500',
      'Purple': 'bg-purple-500',
      'Orange': 'bg-orange-500',
      'Pink': 'bg-pink-500',
      'Brown': 'bg-amber-700',
      'Silver': 'bg-gray-400',
      'Black': 'bg-black'
    };

    return colorMap[color] || 'bg-gray-300';
  }

  const renderGuessGrid = () => {
    const allGuesses = Array.from({ length: MAX_GUESSES }, (_, index) => {
      const guessNumber = MAX_GUESSES - index;
      const guessIndex = guessNumber - 1;
      const guess = submittedGuesses[guessIndex];
      const isCurrentGuessRow = guessNumber === submittedGuesses.length + 1;

      return (
        <div key={guessNumber} className="flex items-center gap-4 mb-2">
          <span className="text-sm font-mono w-6 text-gray-500">
            {guessNumber.toString().padStart(2, '0')}
          </span>
          <div className="flex gap-2">
            {Array.from({ length: 6 }, (_, colorIndex) => {
              let color = null;
              
              // If this is a submitted guess, show the guess colors
              if (guess) {
                color = guess[colorIndex];
              }
              // If this is the current active row and we're building a guess
              else if (isCurrentGuessRow && currentGuess[colorIndex]) {
                color = currentGuess[colorIndex];
              }

              return (
                <div
                  key={colorIndex}
                  className={`w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center ${
                    color ? getColorClass(color) : 'bg-gray-100'
                  }`}
                >
                  {!color && (
                    <span className="text-gray-400 text-xs">{colorIndex + 1}</span>
                  )}
                  {color && (
                    <span className="sr-only">{color}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      );
    });

    return allGuesses;
  }
  
  return (
    <div>
      <main className='flex min-h-screen flex-col p-6'>
        <div>
          <div className='flex flex-col gap-4'>
            {availableColors.map(color => (
              <button 
                key={color}
                className={`w-16 h-16 rounded-full border-2 border-gray-300 hover:border-gray-500 transition-colors ${getColorClass(color)}`}
                onClick={() => addColorToGuess(color)}
              >
                <span className='sr-only'>{color}</span>
              </button>
            ))}
          </div>
          <button onClick={() => removeColorFromGuess()}>
            Remove Color
          </button>
          <button
            onClick={() => submitGuess()}
            disabled={currentGuess.length !== 6}
            hidden={currentGuess.length!==6}
          >
            Submit Guess
          </button>
        </div>
      </main>

      <div className='flex p-6'>
        <div className='flex gap-2 mb-6'>
          {Array.from({ length: 6}, (_, i) => (
            <div
              key={i}
              className={`w-16 h-16 rounded-full border-2 border-gray-300 flex items-center justify-center ${currentGuess[i] ? getColorClass(currentGuess[i]) : 'bg-gray-100'}`}
            >
              {!currentGuess[i] && (
                <span className='text-gray-400 text-sm'>{i + 1}</span>
              )}
              {currentGuess[i] && (
                <span className='sr-only'>{currentGuess[i]}</span>
              )}
            </div>
          ))}
        </div>
      </div>
      <div>
        {submittedGuesses.length > 0 && (
          <div>
            {submittedGuesses.slice().reverse().map((guess, guessIndex) => (
              <div key={guessIndex} className='mb-4 pl-6 pr-6'>
                <div className='flex gap-2'>
                  {guess.map((color, colorIndex) => (
                    <div
                      key={colorIndex}
                      className={`w-16 h-16 rounded-full border-2 border-gray-300 ${getColorClass(color)}`}
                    >
                      <span className='sr-only'>{color}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <div className="w-2/3 p-6">
          <h2 className="text-xl font-bold mb-4">Game Board</h2>
          <div>
            {renderGuessGrid()}
          </div>
          
          {submittedGuesses.length >= MAX_GUESSES && (
            <div className="mt-4 p-4 bg-red-100 border border-red-300 rounded">
              <p className="text-red-700 font-semibold">Game Over! You have used all 20 guesses.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}