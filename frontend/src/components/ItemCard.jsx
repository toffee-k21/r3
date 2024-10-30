import React from "react";
import { BackgroundGradient } from "./ui/background-gradient";
import { useUserContext } from "../utils/UserContext";
import { Link } from "react-router-dom";
import Button from "./Button";

export default function ItemCard({ details }) {
  const { itemName, desc, priceForDay, location, userId, category, imgUrl } =
    details;

  const uId = useUserContext();
  return (
    <div>
      <div className="lg:w-[260px] w-[250px] lg:h-[440px] h-[370px] border-[0.1px] rounded-lg">
        {imgUrl ? (
          <img
            src={imgUrl}
            alt="Laptop"
            className="lg:h-[200px] h-[120px] w-full  object-cover"
          />
        ) : (
          <img
            src="https://images.unsplash.com/photo-1522199755839-a2bacb67c546?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGJsb2d8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
            alt="Laptop"
            className="lg:h-[200px] h-[120px] w-full rounded-t-[22px]  object-cover"
          />
        )}
        <div className="p-4">
          <h1 className="inline-flex items-center text-lg font-semibold text-white">
            {itemName}
          </h1>
          <p className="mt-3 text-sm text-gray-300 overflow-hidden h-[50px]">{desc}</p>
          <div className="mt-4">
            <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[12px] font-semibold text-gray-900">
              #{category}
            </span>
          </div>
          {userId == uId.userId ? (
            <div></div>
          ) : (
            <Link to={`/reuse/${userId}`}>
            <Button text={"reuse"}/>
            </Link>
          )}
          <p className="text-gray-300 p-2">{userId}</p>
        </div>
      </div>
    </div>
  );
}
