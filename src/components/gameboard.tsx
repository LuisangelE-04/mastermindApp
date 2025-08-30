import FeedbackGrid from './feedback';
import { getColorClass } from '@/utility/colors';

interface GuessRowProps {
  guessNumber: number;
  guessData?: {
    guess: string[];
    exactMatches: number;
    positionMatches: number;
    noMatches: number;
  };
}

function GuessRow({ guessNumber, guessData }: GuessRowProps) {
  return (
    <div className='flex items-center gap-4 mb-2'>
      <span className='text-sm font-mono w-6 text-gray-500'>
        {guessNumber.toString().padStart(2, '0')}
      </span>
      <div className='flex gap-2'>
        {Array.from({ length: 6 }, (_, colorIndex) => (
          <div
            key={colorIndex}
            className='w-7 h-7 rounded-full border-2 border-gray-300 flex items-center justify-center bg-gray-100'
          >
            {guessData ? (
              <div className={`w-full h-full rounded-full ${getColorClass(guessData.guess[colorIndex])}`} />
            ) : (
              <span className='text-gray-400 text-xs'>{colorIndex + 1}</span>
            )}
          </div>
        ))}
      </div>

      <div className="ml-4">
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

export default function GuessGrid() {
  const MAX_GUESSES = 20;
  const guessNumbers = Array.from({ length: MAX_GUESSES }, (_, index) => MAX_GUESSES - index);

  return (
    <div className='p-4 flex justify-center'>
      <div className=''>
        {guessNumbers.map(guessNumber => (
          <GuessRow key={guessNumber} guessNumber={guessNumber} />
        ))}
      </div>
    </div>
  )
}