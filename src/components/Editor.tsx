import React, { useState, useRef } from "react";
import { SketchPicker, ColorResult } from "react-color";
import DrawingPanel from "./DrawingPanel";
import { exportComponentAsJPEG, exportComponentAsPDF, exportComponentAsPNG } from "react-component-export-image";

function Editor() {
  const [pixelWidth, setPixelWidth] = useState<number>(16);
  const [panelWidth, setPanelWidth] = useState<number>(16);
  const [panelHeight, setPanelHeight] = useState<number>(16);
  const [selectedColor, setColor] = useState<string>("#f44336");
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const panelRef = useRef<HTMLDivElement>(null);
  const [hoveredPixel, setHoveredPixel] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  function handlePixelHover(x: number, y: number) {
    setHoveredPixel({ x, y });
  }

  function changeColor(color: ColorResult) {
    setColor(color.hex);
  }

  const [displayColorPicker, setdisplayColorPicker] = useState<boolean>(false);
  function handelToggleColorPicker() {
    setdisplayColorPicker(!displayColorPicker);
  }


  function handleZoomChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newZoomLevel: number = parseFloat(event.target.value);
    setZoomLevel(newZoomLevel);
    setPixelWidth(16 * newZoomLevel);
  }

  return (
    <div className="flex text-gray-100 justify-between w-full">

      <div className="w-1/3 p-4 mt-4 rounded-md bg-gray-700 absolute left-4">

        <h1 className="text-xl font-bold mb-4">Controls</h1>
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Pixels Dimensions</h2>
          <div className="flex">
            <div className="flex-1 mx-2">
              <label htmlFor="panelWidth">Width:</label>
              <input
                type="number"
                id="panelWidth"
                className="w-full py-2 px-3 border text-gray-600  border-gray-600 rounded"
                value={panelWidth}
                onChange={(e) => setPanelWidth(Number(e.target.value))}
              />
            </div>
            <div className="flex-1 mx-2">
              <label htmlFor="panelHeight">Height:</label>
              <input
                type="number"
                id="panelHeight"
                className="w-full py-2 px-3 border text-gray-600 border-gray-600 rounded"
                value={panelHeight}
                onChange={(e) => setPanelHeight(Number(e.target.value))}
              />
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="zoomRange" className="text-lg font-semibold block">Zoom</label>
          <input
            type="range"
            id="zoomRange"
            min="0.5"
            max="2"
            step="0.1"
            value={zoomLevel}
            onChange={handleZoomChange}
            className="w-full"
          />
          <span className="block">{zoomLevel * 100}%</span>
        </div>
        <div className="mb-4">
          <label className="text-lg font-semibold block mb-2">Pen Color</label>
          <div>
            <button onClick={handelToggleColorPicker} 
            className="button text-xs p-2 m-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
            style={{ backgroundColor: selectedColor, color: "#ffffff" }}
            >Select Color</button>
            {displayColorPicker && <div>
              <SketchPicker
                color={selectedColor}
                onChangeComplete={changeColor}
                disableAlpha={true}
                className="mx-auto"
              />
            </div>}
          </div>
        </div>

        <div className="mx-auto mb-4 flex items-center justify-center">
          <button
            onClick={() => exportComponentAsJPEG(panelRef)}
            className="button float-end flex items-center justify-center px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md shadow-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 256 256"
            >
              <path
                fill="white"
                d="M74.34 85.66a8 8 0 0 1 11.32-11.32L120 108.69V24a8 8 0 0 1 16 0v84.69l34.34-34.35a8 8 0 0 1 11.32 11.32l-48 48a8 8 0 0 1-11.32 0ZM240 136v64a16 16 0 0 1-16 16H32a16 16 0 0 1-16-16v-64a16 16 0 0 1 16-16h52.4a4 4 0 0 1 2.83 1.17L111 145a24 24 0 0 0 34 0l23.8-23.8a4 4 0 0 1 2.8-1.2H224a16 16 0 0 1 16 16m-40 32a12 12 0 1 0-12 12a12 12 0 0 0 12-12"
              />
            </svg>
            Download JPEG
          </button>
        </div>

        <div className="mx-auto mb-4 flex items-center justify-center">
          <button
            onClick={() => exportComponentAsPDF(panelRef)}
            className="button float-end flex items-center justify-center px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md shadow-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 256 256"
            >
              <path
                fill="white"
                d="M74.34 85.66a8 8 0 0 1 11.32-11.32L120 108.69V24a8 8 0 0 1 16 0v84.69l34.34-34.35a8 8 0 0 1 11.32 11.32l-48 48a8 8 0 0 1-11.32 0ZM240 136v64a16 16 0 0 1-16 16H32a16 16 0 0 1-16-16v-64a16 16 0 0 1 16-16h52.4a4 4 0 0 1 2.83 1.17L111 145a24 24 0 0 0 34 0l23.8-23.8a4 4 0 0 1 2.8-1.2H224a16 16 0 0 1 16 16m-40 32a12 12 0 1 0-12 12a12 12 0 0 0 12-12"
              />
            </svg>
            Download PDF
          </button>
        </div>

        <div className="mx-auto mb-4 flex items-center justify-center">
          <button
            onClick={() => exportComponentAsPNG(panelRef)}
            className="button float-end flex items-center justify-center px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md shadow-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 256 256"
            >
              <path
                fill="white"
                d="M74.34 85.66a8 8 0 0 1 11.32-11.32L120 108.69V24a8 8 0 0 1 16 0v84.69l34.34-34.35a8 8 0 0 1 11.32 11.32l-48 48a8 8 0 0 1-11.32 0ZM240 136v64a16 16 0 0 1-16 16H32a16 16 0 0 1-16-16v-64a16 16 0 0 1 16-16h52.4a4 4 0 0 1 2.83 1.17L111 145a24 24 0 0 0 34 0l23.8-23.8a4 4 0 0 1 2.8-1.2H224a16 16 0 0 1 16 16m-40 32a12 12 0 1 0-12 12a12 12 0 0 0 12-12"
              />
            </svg>
            Download PNG
          </button>
        </div>

      </div>

      {/* Work area */}
      <div className="flex-1 items-center justify-center p-4 w-2/3 absolute right-4">
        <h1 className="text-xl font-bold mb-4">Pixelat</h1>
        <div className="text-gray-200 text-xs text-right ml-4 p-2">
          x:{hoveredPixel.x}, y:{hoveredPixel.y}
        </div>
        <DrawingPanel
          pixelWidth={pixelWidth}
          xPixelsCount={panelWidth}
          yPixelsCount={panelHeight}
          selectedColor={selectedColor}
          panelRef={panelRef}
          onPixelHover={handlePixelHover}
        />
      </div>
      
    </div>

  );
}

export default Editor;
