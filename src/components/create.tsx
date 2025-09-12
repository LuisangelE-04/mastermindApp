'use client';

import { useRouter } from 'next/navigation';
import { CreateGameResponse } from '@/utility/types';

export default function CreateGame() {
  const router = useRouter();

  const createNewGame = async () => {
    try {
      const API = process.env.NEXT_PUBLIC_API_URL;

      console.log('Creating new game...');

      const seed = Math.floor(Math.random() * 1000);

      const response = await fetch(`${API}/games`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          seed: seed
        })
      });

      if (response.ok) {
        const gameData: CreateGameResponse = await response.json();

        console.log('New game created!');

        router.push(`/play?gameId=${gameData.gameId}`)
      } else {
        console.error('Failed to create game');
        return null;
      }
    } catch (error) {
      console.error('Error creating game:', error);
      return null;
    }
  };

  return (
    <>
      <button
        onClick={createNewGame}
      >
        Play Now
      </button>
    </>
  )
}