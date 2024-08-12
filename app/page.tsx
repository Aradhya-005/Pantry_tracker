
import About from "./components/About";
import BottomContent from "./components/BottomContent";
import Cards from "./components/Cards";
import Footer from "./components/footer";
import HeroSection from "./components/HeroSection";
import LottieFiles from "./components/LottieFiles";
import styles from "./page.module.css";
import { BrowserRouter as Router } from 'react-router-dom';

export default function Home() {
  return (
  <>
 
  <HeroSection/>
   <About/>
   <Cards/>
   <BottomContent/>
   <div style={{ 
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'center', 
        width: '100vw', 
        height: '50vh', 
        overflow: 'hidden',
        opacity:'0.6'
      }}>
        <LottieFiles delay={0} />   
        <LottieFiles delay={0} /> 
        <LottieFiles delay={0} /> 
      </div>

 
   
  </>
  );
}
