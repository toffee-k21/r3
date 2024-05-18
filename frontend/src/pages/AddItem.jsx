import React, { useEffect, useState } from 'react'

const AddItem = () => {
      const [position, setPosition] = useState({
        latitude: null,
        longitude: null,
      });

useEffect(() => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {
      setPosition({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  } else {
    console.log("Geolocation is not available in your browser.");
  }
}, []);

  return (
    <div>
      Latitude: {position.latitude}, Longitude: {position.longitude}
    </div>
  );
}

export default AddItem