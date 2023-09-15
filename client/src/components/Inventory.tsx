import React, { useState, useEffect } from 'react';
import '../styles/main.scss';

interface HTVColor {
  id: number;
  brand: string;
  style: string;
  name: string;
  hex_code: string;
}

function Inventory() {
  // TODO: add filtering options and separators by brand/style
  const [HTVColors, setHTVColors] = useState<HTVColor[]>([]);

  // Function to determine text color based on background brightness
  const getTextColor = (backgroundColor: string): string => {
    // Convert the background color to its RGB components
    const r = parseInt(backgroundColor.substring(1, 3), 16);
    const g = parseInt(backgroundColor.substring(3, 5), 16);
    const b = parseInt(backgroundColor.substring(5, 7), 16);

    // Calculate the relative luminance using the formula for sRGB
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    // Use a threshold to determine if text should be light or dark
    return luminance > 0.5 ? 'dark-text' : 'light-text';
  };

  // On component mount, get all colors from db and update HTVColors state
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/colors');
        const data: HTVColor[] = await response.json();
        setHTVColors(data);
      } catch (error) {
        console.error('Error fetching colors:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>Inventory</h1>
      {/* <h2>Test h2</h2>
      <h3>Test h3</h3>
      <h4>Test h4</h4>
      <h5>Test h5</h5> */}
      <div className="container">
        <div className="content">
          {HTVColors.map((color, i) => (
            <div
              key={color.id}
              className={`color-circles ${getTextColor(color.hex_code)}`}
              style={{
                backgroundColor: color.hex_code,
              }}
            >
              <span>{color.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Inventory;
