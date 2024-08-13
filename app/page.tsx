import About from "./components/About";
import BottomContent from "./components/BottomContent";
import Cards from "./components/Cards";
import HeroSection from "./components/HeroSection";
import LottieFiles from "./components/LottieFiles";

export default function Home() {
  return (
    <>
      <HeroSection />
      <About />
      <Cards />
      <BottomContent />
      <div className="bottom-animation">
        <div className="animation">
          <LottieFiles />
        </div>
        <div className="animation">
          <LottieFiles />
        </div>
        <div className="animation">
          <LottieFiles />
        </div>
      </div>
      <div className="footer">
        <div className="copyright">
          <p>&copy; 2024 PantryTracker. All rights reserved.</p>
        </div>
      </div>
    </>
  );
}
