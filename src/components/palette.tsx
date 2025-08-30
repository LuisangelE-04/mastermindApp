'use client';

import { useState, useEffect } from 'react';
import { getColorClass } from '@/utility/colors';

export default function ColorPalette() {
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
              className={`w-12 h-12 rounded-full border-2 border-gray-300 hover:border-gray-500 transition-colors ${getColorClass(color)}`}
            >
              <span className='sr-only'>{color}</span>
            </button>
          ))}
        </div>
      </main>
    </>
  )
}