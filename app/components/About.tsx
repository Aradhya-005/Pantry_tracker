"use client"

import React, { useEffect, useState } from 'react';
import Image from 'next/image'
import celebration from '@/public/assets/celebration.svg'
import Grocery from '@/public/assets/grocery.jpg'
import Bottle from '@/public/assets/bottle.jpeg'
import Box from '@/public/assets/box.jpg'
import Packet  from '@/public/assets/packet.jpg'
import '../css/About.css'
import Lottie from 'lottie-react';// import squibble_1 from '@/public/assets/squibble.jpg';


const About = () => {
  const [animationData, setAnimationData] = useState(null);
  const animationDataUrl = 'https://lottie.host/65993272-0b18-4d10-886b-2ccde9271cf0/YQSrCHNP01.json';


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
    <>
     <div className='welcome-section'>
       <div className='welcome-image'> 
        <Lottie
        className="hero-image"
        animationData={animationData}
        loop={true}
        autoplay={true}
        style={{ width: '380px', height: '380px' }}
      /></div>
       <div className='text'>
       <h2>Welcome</h2>
       <p>Be the culinary genius you were meant to be with Pantry Tracker, your personal sous chef and a tool that slaps chaos into order.</p>
       </div>
    </div>
     <div className='section'>
     <div className='about-section'>
      <div className='about-text'>
      <h2>Manage Your Pantry Like A Pro</h2>
      <p>Keep track of your pantry items, quantities, and expiration dates. We’ll alert you about low stock and expiring items</p>
      </div>
      <div>
      <Image className='img' src={ Grocery} width={470} height={480} alt='grocery'/>
      </div>
    </div>
    <div className='about-section'>
      <div>
      <Image className='img' src={ Bottle} width={470} height={480} alt='grocery'/>
      </div>
      <div className='about-text'>
      <h2>Culinary Inspiration At Your Fingertips</h2>
      <p>Get personalized recipe suggestions based on what’s in your pantry. Say goodbye to food wastage!</p>
      </div>
    </div>
     </div>
    </>
  )
}

export default About