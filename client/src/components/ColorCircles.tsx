import React, { useState, useEffect } from 'react';
import '../styles/main.scss';
import { HTVColor } from '../../typings';

interface Props {
  color: HTVColor;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
  isActive: Boolean;
}

const ColorCircle: React.FC<Props> = (props) => {
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

  const { id, brand, style, name, hex_code } = props.color;

  return (
    <div className="circle-container">
      <div
        key={id}
        pk={id}
        className={`${
          props.isActive ? 'active-color-circle' : 'color-circle'
        } ${getTextColor(hex_code)}`}
        style={{
          backgroundColor: hex_code,
        }}
        onClick={props.onClick}
      >
        <div className="color-details-container">
          <span className="color-name">{name}</span>
          <span className="selected-color-details">
            {'Inventory details here'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ColorCircle;
