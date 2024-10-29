import React, { useEffect, useState } from "react";
import CardContainer from "../components/CardContainer";
import { useUserContext } from "../utils/UserContext";
import Cookies from "js-cookie";
import { BackgroundBeamsWithCollision } from "../components/ui/background-beams-with-collision";
import { ShootingStars } from "../components/ui/shooting-stars";
import { StarsBackground } from "../components/ui/stars-background";

const Reuse = () => {
  const val = useUserContext();

  const [uId, setUId] = useState("");

  useEffect(() => {
    const ID = Cookies.get("userId");
    // console.log("cookee id",typeof(ID));
    if (ID == " " || undefined) {
      setUId(val.userId);
    } else {
      setUId(ID);
      val.setUserId(ID);
    }
  }, []);

  return (
    <div className="lg:h-[40rem] rounded-md bg-neutral-900 flex flex-col w-full ">
      <CardContainer />
      <div className="fixed h-[40rem] rounded-md bg-neutral-900 flex flex-col w-full z-0 ">
        <ShootingStars />
        <StarsBackground />
      </div>
    </div>
  );
};

export default Reuse;
