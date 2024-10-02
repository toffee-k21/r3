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
    <div className="h-[40rem] rounded-md bg-neutral-900 flex flex-col items-center justify-center relative w-full">
      <h2 className="relative flex-col md:flex-row z-10 text-3xl md:text-5xl md:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-white to-white flex items-center gap-2 md:gap-8">
      <CardContainer />
      
      </h2>
      <ShootingStars />
      <StarsBackground />
    </div>
  );
};

export default Reuse;

