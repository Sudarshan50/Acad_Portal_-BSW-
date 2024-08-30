// components/AutoplayBanner.js

import React, { useState, useEffect } from "react";
import { ComplexNavbar } from "./newAppbar";

const AutoplayBanner = () => {
  const images = [
    "https://bsw.iitd.ac.in/images/carousel2.jpg",
    "https://bsw.iitd.ac.in/images/carousel3.png",
    "https://bsw.iitd.ac.in/images/carousel4.jpg",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, [images.length]);

  return (
    <div className=" mt-90 relative w-full h-[500px] overflow-hidden rounded-lg">
      <div className="absolute inset-0 flex transition-opacity duration-7500 ease-in-out">
        {/* add text at the centre */}
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              currentImageIndex === index ? "opacity-100" : "opacity-0"
            } rounded-lg`} // Added rounded-lg for rounded corners
          />
        ))}
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-2 p-2 bg-opacity-50">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full ${
              currentImageIndex === index ? "bg-white" : "bg-gray-400"
            }`}
            onClick={() => setCurrentImageIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default AutoplayBanner;
