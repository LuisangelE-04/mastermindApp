interface FeedbackGridProps {
  exactMatches: number;
  positionMatches: number;
  noMatches: number;
}

export default function FeedbackGrid({ exactMatches, positionMatches, noMatches }: FeedbackGridProps) {
  const feedbackPegs = [
    ...Array(exactMatches).fill('black'),
    ...Array(positionMatches).fill('silver'),
    ...Array(noMatches).fill('empty')
  ];

  return (
    <div className="grid grid-cols-3 grid-rows-2 gap-1 w-16 h-12">
      {feedbackPegs.map((pegType, index) => (
        <div
          key={index}
          className={`w-4 h-4 rounded-full border border-gray-400 ${
            pegType === 'black' 
              ? 'bg-black' 
              : pegType === 'silver' 
              ? 'bg-gray-400' 
              : 'bg-gray-100'
          }`}
        />
      ))}
    </div>
  );
}
