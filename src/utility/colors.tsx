export const getColorClass = (color: string): string => {
  const colorMap: { [key: string]: string } = {
    'Red': 'bg-red-500',
    'Blue': 'bg-blue-500',
    'Green': 'bg-green-500',
    'Yellow': 'bg-yellow-500',
    'Purple': 'bg-purple-500',
    'Orange': 'bg-orange-500',
    'Pink': 'bg-pink-500',
    'Brown': 'bg-amber-700',
    'Silver': 'bg-gray-400',
    'Black': 'bg-black'
  };

  return colorMap[color] || 'bg-gray-300';
};