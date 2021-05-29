import React, { useState } from "react";

import "./Feature.css";
import axios from "axios";

const Feature = () => {
  const [previewImage, setPreviewImage] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePrediction, setImagePrediction] = useState("");

  const generatePreviewImage = (file, callback) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = (e) => callback(reader.result);
  };

  const handleChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    setImageFile(file);
    generatePreviewImage(file, (previewImageUrl) => {
      setPreviewImage(previewImageUrl);
      setImagePrediction("");
    });
  };

  const uploadHandler = (event) => {
    const formData = new FormData();
    formData.append("file", imageFile, "img.png");

    let t0 = performance.now();
    axios.post("http://127.0.0.1:5000/upload", formData).then((res, data) => {
      data = res.data;
      setImagePrediction(data);
      let t1 = performance.now();
      console.log(
        "The time it took to predict the image " + (t1 - t0) + " milliseconds."
      );
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="App-upload">
          <p>Upload an image for classification</p>

          {/* Button for choosing an image */}
          <div>
            <input type="file" name="file" onChange={handleChange} className='btn'/>
          </div>

          {/* Button for sending image to backend */}
          <div>
            <input type="submit" onClick={uploadHandler} className='btn'/>
          </div>

          {/* Field for previewing the chosen image */}
          <div>{previewImage && <img alt="inputimg" src={previewImage} />}</div>

          {/* Text for model prediction */}
          <div>
            {imagePrediction && <p>The model predicted: {imagePrediction}</p>}
          </div>
        </div>
      </header>
    </div>
  );
};

export default Feature;
