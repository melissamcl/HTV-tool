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
  const [groupedColors, setGroupedColors] = useState<HTVColor[][]>([]);

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

  // Function to populate groupedColors by grouping HTVColors by brand/style
  const groupColors = (): void => {
    const result: {
      [key: string]: HTVColor[];
    } = {};

    // For each color in HTVColors ojb:
    // If color's brand and style has already been added to result obj, push color into corresponding array
    // Else add brand/style to result obj with value set to array containing color
    for (let color of HTVColors) {
      if (`${color.brand} ${color.style}` in result) {
        result[`${color.brand} ${color.style}`].push(color);
      } else {
        result[`${color.brand} ${color.style}`] = [color];
      }
    }

    setGroupedColors(Object.values(result));
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

  useEffect(() => {
    groupColors();
  }, [HTVColors]);

  return (
    <div className="outer-container">
      <h1>Inventory</h1>
      <div className="inner-container">
        {groupedColors.map((group) => (
          <>
            <h2>{`${group[0].brand} ${group[0].style}`}</h2>
            <div className="content">
              {group.map((color) => (
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
          </>
        ))}
      </div>
    </div>
  );
}

export default Inventory;
