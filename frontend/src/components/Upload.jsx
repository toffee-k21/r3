import React, { useState } from 'react';
import urls from "../utils/urls.json";
import Button from './Button';
const server_url = urls.server_url;


const Upload = ({ set }) => {

  const [img, setImg] = useState();
   const [msg, setMsg] = useState();

   const formData = new FormData();
   formData.append("item", img);
   console.log(formData)
  
const handleUpload = async ( ) =>{
const resp = await fetch(`${server_url}/upload/`, {
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
          <Button className='bg-black text-white m-2 p-1 w-[100px] inline-block' onClick={handleUpload} text={"Upload"}/>
          <div>{msg}</div>
      </div>
    </div>
  );
};

export default Upload