import MastermindGame from '@/components/mastermind';

type PlaySearchParams = {
  gameId?: string | string[];
};

export default async function Play({ searchParams }: { searchParams?: Promise<PlaySearchParams> }) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const gameIdParamRaw = resolvedSearchParams?.gameId;
  const gameIdParam = Array.isArray(gameIdParamRaw) ? gameIdParamRaw[0] : gameIdParamRaw;
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