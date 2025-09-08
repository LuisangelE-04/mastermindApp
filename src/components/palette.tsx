'use client';

import { useState, useEffect } from 'react';
import { getColorClass } from '@/utility/colors';

interface ColorPaletteProps {
  currentGuess: string[];
  onColorSelect: (color: string) => void;
  onSubmitGuess: () => void;
  onRemoveColor: () => void;
  disabled: boolean;
}

export default function ColorPalette({
  currentGuess,
  onColorSelect,
  onSubmitGuess,
  onRemoveColor,
  disabled
}: ColorPaletteProps) {
  const [availableColors, setAvailableColors] = useState([]);

  useEffect(() => {
    const API = process.env.NEXT_PUBLIC_API_URL;

    const fetchAvailableColors = async () => {
      try {
        const response = await fetch(`${API}/colors`);
        const colors = await response.json();
        setAvailableColors(colors);
      } catch (error) {
        console.error('Error fetching colors: ', error);
      }
    };

    fetchAvailableColors();
  }, []);

  return (
    <>
      <main className='flex flex-row justify-center'>
        <div className='grid grid-cols-5 gap-2'>
          {availableColors.map(color => (
            <button
              key={color}
              onClick={() => onColorSelect(color)}
              disabled={disabled || currentGuess.length >= 6}
              className={`w-12 h-12 rounded-full border-2 border-gray-300 hover:border-gray-500 transition-colors ${getColorClass(color)}`}
            >
              <span className='sr-only'>{color}</span>
            </button>
          ))}
        </div>
      </main>

      <div className='flex justify-center gap-2'>
        <button
          onClick={onRemoveColor}
          disabled={currentGuess.length === 0 || disabled}
          className='px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed'
        >
          Remove Color
        </button>
        <button
          onClick={onSubmitGuess}
          disabled={currentGuess.length !== 6 || disabled}
          className='px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed'
        >
          Submit Guess
        </button>
      </div>
    </>
  )
}