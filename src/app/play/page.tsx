'use client';

import MastermindGame from '@/components/mastermind';
import { useSearchParams } from 'next/navigation';

export default function Play() {
  const searchParams = useSearchParams();
  const gameId = searchParams.get('gameId');

  return (
    <main>
      <MastermindGame initialGameId={gameId}/>
    </main>
  )
}