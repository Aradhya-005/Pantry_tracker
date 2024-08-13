"use client";

import React from "react";
import "../css/Herosection.css";
import Lottie from "lottie-react";
import HeroAnimation from "@/public/assets/hero_animation.json";


import Navbar from "./Navbar";

const HeroSection = () => {
  return (
    <div className="hero-section">
      <Lottie
        className="hero-image"
        animationData={HeroAnimation}
        loop={true}
        autoplay={true}
        style={{ width: "100%", height: "100%" }}
      />
      <div className="hero-text">
        <h1>PantryTracker</h1>
        <Navbar />
      </div>
    </div>
  );
};

export default HeroSection;
