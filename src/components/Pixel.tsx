import '../styles/Pixel.scss';
import { useState, useEffect } from 'react';

interface Props {
  selectedColor: string;
  pixelWidth: number;
  x: number;
  y: number;
  onPixelHover: (x:number, y:number) => void;
}

function Pixel({ selectedColor, pixelWidth, x, y, onPixelHover }: Props) {
  const [pixelColor, setPixelColor] = useState<string>("transparent");
  const [oldColor, setOldColor] = useState<string>(pixelColor);
  const [canChangeColor, setCanChangeColor] = useState<boolean>(true);

  const color1 = '#ccc'; // White
  const color2 = '#aaa'; // Black

  useEffect(() => {
    const isEvenRow = y % 2 === 0;
    const isEvenColumn = x % 2 === 0;
    const isEvenCell = (isEvenRow && isEvenColumn) || (!isEvenRow && !isEvenColumn);
    setPixelColor(isEvenCell ? color1 : color2);
  }, [x, y]);

  function applyColor(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault();
    setPixelColor(selectedColor);
    setCanChangeColor(false);
  }

  function handleRightClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault(); // Prevents the default context menu
    setPixelColor(pixelColor);
    setOldColor('transparent');
  }

  function changeColorOnHover(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault();

    onPixelHover(x, y)

    if (event.buttons === 1) {
      applyColor(event);
    } else if (event.buttons === 2) {
      setPixelColor(pixelColor);
      setOldColor('transparent');
    } else {
      setOldColor(pixelColor);
      setPixelColor('#ccc');
    }
  }

  function resetColor() {
    if (canChangeColor) {
      setPixelColor(oldColor);
    }
    setCanChangeColor(true);
  }

  return (
    <div
      className="pixel m-0 p-0 hover:cursor-pointer"
      onContextMenu={handleRightClick}
      onClick={(event) => applyColor(event)}
      onMouseEnter={(event) => changeColorOnHover(event)}
      onMouseLeave={resetColor}
      style={{ backgroundColor: pixelColor, width: pixelWidth, height: pixelWidth }}
    ></div>
  );
}

export default Pixel;
