import React, { useState, useEffect } from 'react';
import '../styles/main.scss';
import { HTVColor } from '../../typings';
import ColorCircle from './ColorCircles';

function Inventory() {
  // TODO: add filtering options and separators by brand/style
  // TODO: make content overlay functional or remove it (to make selected color more prominent)
  const [HTVColors, setHTVColors] = useState<HTVColor[]>([]);
  const [groupedColors, setGroupedColors] = useState<HTVColor[][]>([]);
  const [activeCircle, setActiveCircle] = useState<number>(0);
  const [contentOverlay, setContentOverlay] = useState<React.ReactElement>(
    <></>
  );

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

  // Function to activate selected color circle
  const handleCircleClick = (e: React.MouseEvent<HTMLElement>): void => {
    // Initialize element, representing clicked element
    const element = e.target as HTMLElement;

    // Initialize circle as clicked element, possibly to be changed if circle was not clicked
    let circle = element as HTMLElement;

    // Starting at clicked element, traverse up the DOM until root is reached or color-circle is found
    let classNames = circle.className.split(' ');
    while (true) {
      if (!classNames.includes('color-circle')) {
        console.log(circle);

        if (circle.parentElement !== null) {
          circle = circle.parentElement;
          classNames = circle.className.split(' ');
        } else {
          setActiveCircle(0);
          break;
        }
      } else {
        break;
      }
    }

    // With resulting element, if there is no primary key (pk) attribute, set active circle to 0 (none)
    const pk = circle.getAttribute('pk');
    if (pk === null) {
      setActiveCircle(0);
      return;
    }

    // If the circle that was clicked is already active, deactivate it.
    // Otherwise activate the clicked circle
    if (activeCircle === parseInt(pk)) {
      setActiveCircle(0);
    } else {
      setActiveCircle(parseInt(pk));
    }
  };

  // On component mount, get all colors from db, update HTVColors state
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

  // Run functions/set states that are dependent on HTVColors
  useEffect(() => {
    groupColors();
  }, [HTVColors]);

  useEffect(() => {
    if (activeCircle > 0) {
      setContentOverlay(<div className="content-overlay"></div>);
    } else {
      setContentOverlay(<></>);
    }
  }, [activeCircle]);

  return (
    <div className="outer-container" onClick={handleCircleClick}>
      <h1>Inventory</h1>
      <div className="inner-container">
        {groupedColors.map((group) => (
          <>
            <h2>{`${group[0].brand} ${group[0].style}`}</h2>
            <div className="content">
              <div className="content-inventory">
                {group.map((color) => (
                  <ColorCircle
                    color={color}
                    onClick={handleCircleClick}
                    isActive={color.id === activeCircle}
                  />
                ))}
              </div>
            </div>
            {contentOverlay}
          </>
        ))}
      </div>
    </div>
  );
}

export default Inventory;
