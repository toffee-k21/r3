import React, { useState } from 'react';
import { v4 } from "uuid";


const Upload = ({ set }) => {
    // console.log(set)
  const [img, setImg] = useState();
   const [msg, setMsg] = useState();
  // const [imgUrl, setImgUrl] = useState("");
  

const handleUpload = ( ) =>{

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