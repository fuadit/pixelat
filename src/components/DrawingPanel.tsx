import '../styles/DrawingPanel.scss';
import Row from "./Row";

interface Props {
  xPixelsCount: number;
  yPixelsCount: number;
  pixelWidth: number;
  selectedColor: string;
  panelRef: React.RefObject<HTMLDivElement>; 
  onPixelHover: (x:number, y:number) => void;
}

function DrawingPanel({ xPixelsCount, yPixelsCount, pixelWidth, selectedColor, panelRef, onPixelHover }: Props) {
  let rows: JSX.Element[] = [];

  for (let i = 0; i < yPixelsCount; i++) {
    rows.push(<Row key={i} rowIndex={i} xPixelsCount={xPixelsCount} pixelWidth={pixelWidth} selectedColor={selectedColor} onPixelHover={onPixelHover}  />);
  }

  return (
    <div className='p-0 mx-auto shadow-2xl shadow-slate-600 overflow-auto w-fit h-fit max-w-screen-md max-h-screen'>
        <div id="drawingPanel" className='' ref={panelRef}>
          <div id="pixels" className='m-0 p-0'>
            {rows}
          </div>
        </div>
    </div>
  );
}

export default DrawingPanel;
