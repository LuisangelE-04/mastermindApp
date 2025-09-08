import FeedbackGrid from './feedback';
import { getColorClass } from '@/utility/colors';
import { GuessHistoryItem } from '@/utility/types';

interface GuessGridProps {
  currentGuess: string[];
  submittedGuesses: GuessHistoryItem[];
  maxGuesses: number;
}

interface GuessRowProps {
  guessNumber: number;
  guessData?: {
    guess: string[];
    exactMatches: number;
    positionMatches: number;
    noMatches: number;
  };
  currentGuess: string[];
  isCurrentRow: boolean;
}

function GuessRow({ 
  guessNumber, 
  guessData,
  currentGuess,
  isCurrentRow
}: GuessRowProps) {
  return (
    <div className='flex items-center gap-4 mb-2'>
      <span className='text-sm font-mono w-6 text-gray-500'>
        {guessNumber.toString().padStart(2, '0')}
      </span>
      <div className='flex gap-2'>
        {Array.from({ length: 6 }, (_, colorIndex) => {
          let color = null;

          if (guessData) {
            color = guessData.guess[colorIndex];
          }
          else if (isCurrentRow && currentGuess[colorIndex]) {
            color = currentGuess[colorIndex];
          }

          return (
            <div
            key={colorIndex}
            className={`w-7 h-7 rounded-full border-2 border-gray-300 flex items-center justify-center 
                        ${color ? getColorClass(color) : 'bg-gray-100'}`}
            >
              {!color && (
                <span className='text-gray-400 text-sm'>{colorIndex + 1}</span>
              )}
            </div>
          );
        })}
      </div>

      <div className='ml-2'>  
        {guessData ? (
          <FeedbackGrid 
            exactMatches={guessData.exactMatches} 
            positionMatches={guessData.positionMatches}
            noMatches={guessData.noMatches}
          />
        ) : (
          <div className="grid grid-cols-3 grid-rows-2 gap-1">
            {Array.from({ length: 6 }, (_, index) => (
              <div
                key={index}
                className="w-3 h-3 rounded-full border border-gray-300 bg-gray-50"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function GuessGrid({
  currentGuess,
  submittedGuesses,
  maxGuesses
}:  GuessGridProps){
  const currentAttempt = submittedGuesses.length + 1;

  return (
    <div className='p-4 flex justify-center'>
      <div className=''>
        {Array.from({ length: maxGuesses }, (_, index) => {
          const guessNumber = maxGuesses - index;
          const guessIndex = guessNumber - 1;
          const guessData = submittedGuesses[guessIndex];
          const isCurrentRow = guessNumber === currentAttempt;

          return (
            <GuessRow 
              key={guessNumber} 
              guessNumber={guessNumber}
              guessData={guessData}
              currentGuess={currentGuess}
              isCurrentRow={isCurrentRow}
            />
          );
        })}
      </div>
    </div>
  )
}