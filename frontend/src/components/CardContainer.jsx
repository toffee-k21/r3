import React, { useEffect, useState } from "react";
import  ItemCard from "./ItemCard";
import useFetchItemList from "../utils/useFetchItemList";
import { useSelector } from "react-redux";

const CardContainer = () => {
  const [ItemsList, setItemsList] = useState([]);

  const data = useSelector((state) => state.item);
  console.log("bhr wala data", data.itemList);

  // const data = useFetchItemList();
  useEffect(() => {
    console.log("data", data.itemList);
    setItemsList(data.itemList);
  }, [data]); // not [] bcuse
  // note:here ItemsList is not updating because useSelector takes time to execute , and before the useselector the component is mounted and itemLIst is executed at once and then selector   gets the value

  //key warning solve
  // let count = 0;

  return (
    <div className="flex justify-center items-center flex-wrap mt-36 z-10 mx-16">
      {ItemsList?.map((r) => {
        return (
          <div className="lg:m-6 mx-1 my-2">
            <ItemCard details={r} />
          </div>
        );
      })}
    </div>
  );
};

export default CardContainer;
