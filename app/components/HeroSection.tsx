"use client"

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import '../css/Herosection.css';
import Lottie from 'lottie-react';// import squibble_1 from '@/public/assets/squibble.jpg';


import Navbar from './Navbar';

const HeroSection = () => {
  const [animationData, setAnimationData] = useState(null);
  const animationDataUrl = 'https://lottie.host/b2e54989-dbff-4066-8dbc-57f7003dfa57/YS7gJEBzRs.json';


  useEffect(() => {
    fetch(animationDataUrl)
      .then(response => response.json())
      .then(data => setAnimationData(data))
      .catch(error => console.error('Error fetching animation data:', error));
  }, []);

  if (!animationData) {
    return <div>Loading...</div>;
  }
  return (
    <div className="hero-section">
      <Lottie
        className="hero-image"
        animationData={animationData}
        loop={true}
        autoplay={true}
        style={{ width: '700px', height: '700px' }}
      />
      <div className="hero-text">
        <h1>PantryTracker</h1>
        <Navbar />
      </div>
    </div>
  );
};

export default HeroSection;
