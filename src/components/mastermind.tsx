'use client';

import ColorPalette from './palette'
import GuessGrid from './gameboard'
import { useState, useEffect } from 'react'
import { GuessHistoryItem, GameStateResponse } from '@/utility/types';


export default function MastermindGame() {
  const [currentGuess, setCurrentGuess] = useState<string[]>([]);
  const [submittedGuesses, setSubmittedGuesses] = useState<GuessHistoryItem[]>([]);
  const [gameId, setGameId] = useState<number | null>(7);
  const [gameStatus, setGameStatus] = useState<string>('IN_PROGRESS');
  const [attempts, setAttempts] = useState<number>(0);
  const MAX_GUESSES = 20;

  useEffect(() => {
    if (gameId) {
      loadGameState();
    }
  }, [gameId]);

  const loadGameState = async () => {
    try {
      const API = process.env.NEXT_PUBLIC_API_URL;

      console.log('Loading game state for the gameId:', gameId);

      const response = await fetch(`${API}/games/${gameId}`);

      if (response.ok) {
        const gameState: GameStateResponse = await response.json();
        console.log('Loaded game state:', gameState);

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
    if (currentGuess.length !== 6 || !gameId) return;

    try {
      const API = process.env.NEXT_PUBLIC_API_URL;

      console.log('Submitting guess to game:', gameId);
      console.log('Current guess:', currentGuess);

      const response = await fetch(`${API}/games/${gameId}/guess`, {
        method: 'POST',
        headers: {
          'accept': '*/*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          colors: currentGuess
        })
      });

      if (response.ok) {
        const result: GameStateResponse = await response.json();
        
        console.log('API Response:', result);
        
        const latestGuess = result.guessHistory[result.guessHistory.length - 1];
        if (latestGuess) {
          console.log('Latest Guess Results:');
          console.log('Exact Matches:', latestGuess.exactMatches);
          console.log('Position Matches:', latestGuess.positionMatches);
          console.log('No Matches:', latestGuess.noMatches);
        }
        
        setSubmittedGuesses(result.guessHistory);
        setGameStatus(result.status);
        setCurrentGuess([]);
        
        if (result.status === 'WON' || result.status === 'LOST') {
          console.log('Game Over!');
          console.log('Final Status:', result.status);
          if (result.secretCode) {
            console.log('Secret Code was:', result.secretCode);
          }
        }
      } else {
        console.error('Failed to submit guess. Status:', response.status);
        const errorText = await response.text();
        console.error('Error details:', errorText);
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