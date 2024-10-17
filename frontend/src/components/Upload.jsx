import React, { useState } from 'react';


const Upload = ({ set }) => {

  const [img, setImg] = useState();
   const [msg, setMsg] = useState();

   const formData = new FormData();
   formData.append("item", img);
   console.log(formData)
  
const handleUpload = async ( ) =>{
const resp = await fetch("http://localhost:5000/upload/", {
  method: "POST",
  body: formData,
  headers: {
    // "Content-Type" : "multipart/form-data", no need
  },
});

const data = await resp.json();
console.log(data.secure_url);
set(data.secure_url);
}

  return (
    <div>
      <div>
          <input
            type="file"
            accept=".png, .jpg, .jpeg"
            // enctype="multipart/form-data"
            onChange={(e) => setImg(e.target.files[0])}
          />
          <button className='bg-black text-white m-2 p-1' onClick={handleUpload} type="submit">Upload</button>
          <div>{msg}</div>
      </div>
    </div>
  );
};

export default Upload