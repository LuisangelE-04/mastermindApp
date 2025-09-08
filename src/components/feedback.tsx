import { getColorClass } from '@/utility/colors';

interface FeedbackGridProps {
  exactMatches: number;
  positionMatches: number;
  noMatches: number;
}

export default function FeedbackGrid({ exactMatches, positionMatches, noMatches }: FeedbackGridProps) {
  const feedbackPegs = [
    ...Array(exactMatches).fill('Black'),
    ...Array(positionMatches).fill('Silver'),
    ...Array(noMatches).fill('empty')
  ];

  return (
    <div className="grid grid-cols-3 grid-rows-2 gap-1">
      {feedbackPegs.map((pegType, index) => (
        <div
          key={index}
          className={`w-3 h-3 rounded-full border border-gray-300 ${
            pegType === 'empty'
            ? 'bg-gray-50'
            : getColorClass(pegType)
          }`}
        />
      ))}
    </div>
  );
}
