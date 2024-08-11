import React from "react";
import Image from "next/image";
import Box from "@/public/assets/box.jpg";
import Packet from "@/public/assets/packet.jpg";
import "../css/BottomContent.css";

function BottomContent() {
  return (
    <>
      <div className="Bottom_content">
        <div className="bottom_img">
          <div className="box-1">
            <Image
              className="img"
              src={Box}
              width={490}
              height={480}
              alt="Box"
            />
            <div className="text">
              <h3>Delicious Creations</h3>
              <p>Create tasty meals with what you have</p>
            </div>
          </div>
          <div className="box-2">
            <Image
              className="img"
              src={Packet}
              width={490}
              height={480}
              alt="Box"
            />
            <div className="text">
              <h3>Seamless Shopping</h3>
              <p>Never forget a grocery item again</p>
            </div>
          </div>
        </div>
        <div className="bottom_subscription">
          <h2>Join Our Community</h2>
          <p>
            Join the Pantry Tracker community to receive the latest tips,
            tricks, and recipes! Yes! We have cookies.
          </p>
          <div className="subscription_form">
            <input
              type="email"
              placeholder="name@email.com"
              className="email_input"
            />
            <button type="submit" className="subscribe_button">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default BottomContent;
