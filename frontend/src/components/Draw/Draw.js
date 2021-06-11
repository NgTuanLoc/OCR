import { Fragment, useState, useRef } from "react";
import CanvasDraw from "react-canvas-draw";
import "./Draw.css";
import { exportComponentAsJPEG } from "react-component-export-image";

const Draw = () => {
  // const [width, setWidth] = useState(2000);
  // const [height, setheight] = useState(2000);
  const [brushRadius, setBrushRadius] = useState(15);
  const [lazyRadius, setLazyRadius] = useState(1);
  const refCanvas = useRef();

  const clearCanvasHandle = () => {
    if (refCanvas.current) {
      refCanvas.current.clear();
    }
  };
  const undoCanvasHandle = () => {
    if (refCanvas.current) {
      refCanvas.current.undo();
    }
  };

  return (
    <Fragment>
      {/* <div
        style={{
          margin: "0rem 2rem 2rem 2rem",
        }}
      >
        <label>Brush-Radius:</label>
        <input
          type="number"
          value={brushRadius}
          onChange={(e) => setBrushRadius(parseInt(e.target.value, 10))}
        />

        <label>Lazy-Radius:</label>
        <input
          type="number"
          value={lazyRadius}
          onChange={(e) => setLazyRadius(parseInt(e.target.value, 10))}
        />
      </div> */}

      <button
        onClick={clearCanvasHandle}
        className="btn"
        style={{
          margin: "2rem",
        }}
      >
        clear
      </button>
      <button
        onClick={undoCanvasHandle}
        className="btn"
        style={{
          marginRight: "2rem",
        }}
      >
        undo
      </button>
      <button
        onClick={() => exportComponentAsJPEG(refCanvas, { fileName: "result" })}
        className="btn"
        style={{
          marginRight: "2rem",
        }}
      >
        Export As JPEG
      </button>

      <label
        style={{
          marginRight: "1rem",
        }}
      >
        Brush-Radius:
      </label>
      <input
        type="number"
        value={brushRadius}
        onChange={(e) => setBrushRadius(parseInt(e.target.value, 10))}
      />

      <label
        style={{
          margin: "0rem 1rem 0rem 1rem",
        }}
      >
        Lazy-Radius:
      </label>
      <input
        type="number"
        value={lazyRadius}
        onChange={(e) => setLazyRadius(parseInt(e.target.value, 10))}
      />

      <div className="canvas">
        <CanvasDraw
          hideInterface
          lazyRadius={lazyRadius}
          brushRadius={brushRadius}
          hideGrid
          canvasWidth="1359px"
          canvasHeight="500px"
          ref={refCanvas}
        />
      </div>
    </Fragment>
  );
};

export default Draw;
