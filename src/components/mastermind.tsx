'use client';

import ColorPalette from './palette'
import GuessGrid from './gameboard'
import { useState, useEffect } from 'react'
import { GuessHistoryItem, GameStateResponse } from '@/utility/types';

interface MastermindGameProps {
  initialGameId?: number;
  initialStatus?: string;
  initialAttempt?: number;
}

export default function MastermindGame({ 
  initialGameId,
  initialStatus, 
  initialAttempt 
}: MastermindGameProps) {
  const [currentGuess, setCurrentGuess] = useState<string[]>([]);
  const [submittedGuesses, setSubmittedGuesses] = useState<GuessHistoryItem[]>([]);
  const [gameId, setGameId] = useState<number | null>(initialGameId || null);
  const [gameStatus, setGameStatus] = useState<string>(initialStatus ?? 'IN_PROGRESS');
  const [attempts, setAttempts] = useState<number>(initialAttempt ?? 0);
  const MAX_GUESSES = 20;

  useEffect(() => {
    if (gameId) {
      loadGameState();
    }
  }, [gameId]);

  const loadGameState = async () => {
    try {
      const API = process.env.NEXT_PUBLIC_API_URL;


      const response = await fetch(`${API}/games/${gameId}`);

      if (response.ok) {
        const gameState: GameStateResponse = await response.json();

        setSubmittedGuesses(gameState.guessHistory);
        setGameStatus(gameState.status);
        setAttempts(gameState.attempts);
      } else {
        console.error('Failed to load game state.');
      }
    } catch (error) {
      console.error('Error loading game state:', error);
    }
  };

  const handleColorSelect = (color: string) => {
    if (currentGuess.length < 6) {
      setCurrentGuess([...currentGuess, color]);
    }
  };

  const handleSubmitGuess = async () => {
    if (currentGuess.length !== 6 || !gameId || gameStatus !== 'IN_PROGRESS') return;

    try {
      const API = process.env.NEXT_PUBLIC_API_URL;

      const response = await fetch(`${API}/games/${gameId}/guess`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          colors: currentGuess
        })
      });

      if (response.ok) {
        const guessResult = await response.json();
        
        console.log('API Response:', guessResult);
        
        setCurrentGuess([]);
        await loadGameState();
        if (guessResult.isGameOver) {
          console.log('Game Over!');
          console.log('Final Status:', guessResult.gameStatus)
        }
      } else {
        console.error('Failed to submit guess.');
      }
    } catch (error) {
      console.error('Error submitting guess', error);
    }
  };

  const handleRemoveColor = () => {
    setCurrentGuess(currentGuess.slice(0, -1));
  };
  
  return (
    <div className='flex-row'>
      <p>{gameStatus}</p>
      <GuessGrid
        currentGuess={currentGuess}
        submittedGuesses={submittedGuesses}
        maxGuesses={MAX_GUESSES}
      />
      <ColorPalette 
        currentGuess={currentGuess}
        onColorSelect={handleColorSelect}
        onSubmitGuess={handleSubmitGuess}
        onRemoveColor={handleRemoveColor}
        disabled={submittedGuesses.length >= MAX_GUESSES}
      />
    </div>
  )
}