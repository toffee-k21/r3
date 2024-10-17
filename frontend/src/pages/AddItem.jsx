import React, { useEffect, useState } from "react";
import { useUserContext } from "../utils/UserContext";
import Upload from "../components/Upload";
import { ShootingStars } from "../components/ui/shooting-stars";
import { StarsBackground } from "../components/ui/stars-background";
import HoverBorderGradient from "../components/ui/hover-border-gradient";
import urls from "../utils/urls.json";
import { useNavigate } from "react-router-dom";
import useFetchItemList from "../utils/useFetchItemList";
const server_url = urls.server_url;
// import { Button } from "../components/ui/moving-border";
//  itemName:String,
// category:String,
// priceForDay:Number,
// desc:String,
// location:String,
// userId:String,
const AddItem = () => {
  const [position, setPosition] = useState({
    latitude: null,
    longitude: null,
  });
  const [itemName, setItemName] = useState("");
  const [priceForDay, setPriceForDay] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("others");
  const [imgUrl, setImgUrl] = useState("please upload img url");
  const [msg, setMsg] = useState(null);
  //   const [userId,setUserId] = useState('');
  const user = useUserContext();
  const navigate = useNavigate();
  const handleAdd = async () => {
    // console.log(user.userId, itemName, priceForDay, desc, category, position);
    const result = await fetch(`${server_url}/item/add`, {
      method: "post",
      body: JSON.stringify({
        itemName: itemName,
        category: category,
        priceForDay: priceForDay,
        desc: desc,
        location: position,
        userId: user.userId,
        imgUrl: imgUrl,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await result.json();
    // console.log(data);
    if (data) {
      setMsg(data.result);
      if (data.result == "Successfully added !") {
        navigate("/");
      }
    }
  };
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    } else {
      // console.log("Geolocation is not available in your browser.");
    }
  }, []);

  return (
    <div className="">
      <div className=" mx-28 ">
        {/* Latitude: {position.latitude}, Longitude: {position.longitude} */}
        <div className="w-full md:w-1/2 m-4 mt-36">
          <Upload set={setImgUrl} />
          <input
            className="text-white border-white flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 my-4"
            type="text"
            placeholder="Product Name"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          ></input>
        </div>
        <div className="w-full md:w-1/2 m-4">
          <input
            className="text-white border-white flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            type="number"
            placeholder="Price per day"
            value={priceForDay}
            onChange={(e) => setPriceForDay(e.target.value)}
          ></input>
        </div>
        <div className="w-full md:w-1/2 m-4">
          <textarea
            className="text-white border-white flex h-20 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            //   type=""
            //   placeholder="Email"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </div>
        <div className="w-full md:w-1/2 m-4">
          <select onChange={(e) => setCategory(e.target.value)}>
            <option value="electronics">Electronics</option>
            <option value="toy">Toy</option>
            <option value="mobile">Mobile</option>
            <option value="clothing">Clothing</option>
            <option value="books">Books</option>
            <option value="others">Others</option>
          </select>
        </div>
        <button
          type="button"
          className=" m-4 rounded-full bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          onClick={handleAdd}
        >
          Add
        </button>

        <div>{msg}</div>
      </div>
      <div className=" absolute top-0 z-[-1] h-[40rem] rounded-md bg-neutral-900 flex flex-col w-full ">
        <ShootingStars />
        <StarsBackground />
      </div>
    </div>
  );
};

export default AddItem;
