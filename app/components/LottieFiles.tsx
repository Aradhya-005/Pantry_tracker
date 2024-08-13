
"use client"
import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';

function LottieFiles() {
  const [animationData, setAnimationData] = useState(null);
  const animationDataUrl = 'https://lottie.host/52b0503a-e05d-4431-a4dd-fa300af768e8/z9Q9SqtW7d.json';


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
    <div style={{ 
      width: '30%', 
      height: '100%', 
      overflow: 'hidden',
    }}>
      
        <Lottie
          animationData={animationData}
          loop={true}
          autoplay={true}
          style={{ 
            width: '100%', 
            height: '100%' 
          }}
        />
    </div>
  );
}

export default LottieFiles;
