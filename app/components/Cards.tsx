import React from "react";
import Image from "next/image";
import Dish_1 from '@/public/assets/img-1.svg'
import Dish_2 from '@/public/assets/img-2.svg'
import '../css/Card.css'


function Cards() {
  return (
    <>
      <div className="container">
        <div className="container-1">
       
        <Image className="image" src={Dish_1} width={100} height={100} alt="Squibble"/>

         
           <div className="text">
           <h3>Shopping Lists</h3>
           <p>Automatically Generated</p>
           </div>
        </div>
        <div className="container-1">
        <Image className="image" src={Dish_2} width={100} height={100} alt="Squibble"/>
           <div className="text">
           <h3 >Staying Informed</h3>
           <p>Important Notifications</p>
           </div>
        </div>
      </div>
    </>
  );
}

export default Cards;
