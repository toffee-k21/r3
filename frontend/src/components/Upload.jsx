import React, { useState } from 'react';
import { ref, uploadBytes } from "firebase/storage";
import { storage } from '../firebase';
import { v4 } from "uuid";


const Upload = ({ set }) => {
    console.log(set)
  const [img, setImg] = useState();
   const [msg, setMsg] = useState();
  // const [imgUrl, setImgUrl] = useState("");
  

const handleUpload = ( ) =>{
    const val = v4();
 const imgRef = ref(storage, `files/${val}`);

  uploadBytes(imgRef, img).then((snapshot) => {
  set(`https://firebasestorage.googleapis.com/v0/b/r-cube-90296.appspot.com/o/files%2F${val}?alt=media`);
  setMsg("uploaded")
});
}

  // or 
  // const handleUpload = async (e) => {
  //   e.preventDefault();
  //   const formData = new FormData();
  //   formData.append("file", file);

  //   try {
  //     const res = await fetch("http://localhost:5000/upload", {
  //       method: "post",
  //       body: formData,
  //     });
  //     set(res.data.filePath);
  //     const data = await res.json();
  //     console.log(data);
  //   } catch (err) {
  //     set("Error uploading file");
  //   }
  // };

  return (
    <div>
      <div>
        
          <input
            type="file"
            accept=".png, .jpg, .jpeg"
            enctype="multipart/form-data"
            // value={img}
            onChange={(e) => setImg(e.target.files[0])}
          />
          <button className='bg-black text-white m-2 p-1' onClick={handleUpload} type="submit">Upload</button>
          <div>{msg}</div>
    
      </div>
    </div>
  );
};

export default Upload