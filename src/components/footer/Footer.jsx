import React from "react";
import fb from "../../assets/facebook-app-symbol.svg";
import tw from "../../assets/twitter.png";
import insta from "../../assets/insta.png";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HOME } from "../../assets";

export default function Footer() {
  const fadeInAnimationVarience = {
    initial: {
      opacity: 0,
      y: 150,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeIn",
      },
    },
  };

  return (
    <motion.footer
      variants={fadeInAnimationVarience}
      initial="initial"
      whileInView="animate"
      className="w-full flex flex-col items-center text-center py-8"
    >

      <div className="flex flex-col lg:flex-row gap-5 mb-5 text-xl font-felixTitling">
        <Link to="/home"><p>HOME</p></Link>
        <Link to="/accommodation"><p>ACCOMMODATION</p></Link>
        <Link to="/facilities"><p>FACILITIES</p></Link>
        <Link to="/ayurvedha"><p>AYURVEDHA</p></Link>
        <Link to="/contact"><p>CONTACT US</p></Link>
      </div>


      <div className="w-[25%] lg:w-[15%] h-auto mb-5">
        <img src={HOME.R_LOGO} alt="Rustic Leisures Logo" className="w-full h-auto object-cover" />
      </div>

   
      <div className="flex gap-8 mb-5">
        <a href="https://www.instagram.com/rustic_leisures?igsh=bzd2aThmOHljbjRt">
          <img src={insta} alt="Instagram" className="w-[20px] h-[20px]" />
        </a>
        <a href="https://www.facebook.com/your-facebook-url">
          <img src={fb} alt="Facebook" className="w-[20px] h-[20px]" />
        </a>
        <a href="https://www.twitter.com/your-twitter-url">
          <img src={tw} alt="X (formerly Twitter)" className="w-[20px] h-[20px]" />
        </a>
      </div>

    
      <div className="flex flex-col pb-10 md:flex-row gap-3 text-sm font-extralight">
        <Link to="/underconstruction">
          <p>Privacy Policy</p>
        </Link>
        <span className="hidden md:inline">|</span>
        <Link to="/terms">
          <p>General Terms and Conditions</p>
        </Link>
      </div>
    </motion.footer>
  );
}
