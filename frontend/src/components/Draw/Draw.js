import { Fragment, useState, useRef } from "react";
import CanvasDraw from "react-canvas-draw";
import "./Draw.css";
import { exportComponentAsJPEG } from "react-component-export-image";

const Draw = () => {
  const [width, setWidth] = useState(2000);
  const [height, setheight] = useState(2000);
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
      <button onClick={() => exportComponentAsJPEG(refCanvas, {fileName: "result"})} className="btn">
        Export As JPEG
      </button>
      <div className="canvas">
        <CanvasDraw
          hideInterface
          lazyRadius="1"
          hideGrid
          canvasWidth="1000px"
          canvasHeight="500px"
          ref={refCanvas}
        />
      </div>
    </Fragment>
  );
};

export default Draw;
