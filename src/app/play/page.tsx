'use client';

import MastermindGame from '@/components/mastermind';
import { useSearchParams } from 'next/navigation';

export default function Play() {
  const searchParams = useSearchParams();
  const gameIdParam = searchParams.get('gameId');
  const parsedGameId = gameIdParam ? Number(gameIdParam) : undefined;
  const gameId = parsedGameId !== undefined && !Number.isNaN(parsedGameId)
    ? parsedGameId
    : undefined;

  return (
    <main>
      <MastermindGame initialGameId={gameId}/>
    </main>
  )
}