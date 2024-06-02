import React, { useState } from 'react'

const Upload = ({ set }) => {
    console.log(set)
  const [file, setFile] = useState();
  // const [imgUrl, setImgUrl] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:5000/upload", {
        method: "post",
        body: formData,
      });
      set(res.data.filePath);
      const data = await res.json();
      console.log(data);
    } catch (err) {
      set("Error uploading file");
    }
  };

  return (
    <div>
      <div>
        <form onSubmit={handleUpload}>
          <input
            type="file"
            accept=".png, .jpg, .jpeg"
            enctype="multipart/form-data"
            // value={file}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button type="submit">Upload</button>
        </form>
      </div>
    </div>
  );
};

export default Upload