import React, { useState } from "react";

const ObjectDetection = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [results, setResults] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:5002/detect", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image_urls: [imageUrl],
      }),
    });
    const data = await response.json();
    setResults(data[0][0].name);
    // console.log(data[0][0].name)
  };

  return (
    <div>
      <h1>Object Detection</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="Enter image URL"
        />
        <button type="submit">Detect Objects</button>
      </form>
      {results && (
        <div>
          <h2>Detection Results</h2>
          {/* <pre>{JSON.stringify(results, null, 2)}</pre> */}
          <div>{results}</div>
        </div>
      )}
    </div>
  );
};

export default ObjectDetection;
