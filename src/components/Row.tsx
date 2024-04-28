import '../styles/Row.scss';
import Pixel from "./Pixel";

interface Props {
  xPixelsCount: number;
  selectedColor: string;
  pixelWidth: number;
  rowIndex: number;
  onPixelHover: (x:number, y:number) => void;
}

function Row({ xPixelsCount, pixelWidth, selectedColor, rowIndex, onPixelHover  }: Props) {
  let pixels: JSX.Element[] = []; 

  for (let i = 0; i < xPixelsCount; i++) {
    pixels.push(
      <Pixel key={i} x={i} y={rowIndex} pixelWidth={pixelWidth} selectedColor={selectedColor} onPixelHover={onPixelHover} />
    );

  }

  return <div className="row">{pixels}</div>;
}

export default Row;
