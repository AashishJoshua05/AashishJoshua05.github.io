import { useState, useEffect } from "react";
import { useReducedMotion } from "./hooks/useReducedMotion";
import SmoothScroll from "./components/SmoothScroll";
import CustomCursor from "./components/CustomCursor";
import GrainOverlay from "./components/GrainOverlay";
import Preloader from "./components/Preloader";
import ClickSpark from "./components/ui/ClickSpark";
import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Experience from "./sections/Experience";
import Skills from "./sections/Skills";
import Contact from "./sections/Contact";

function App() {
  const reducedMotion = useReducedMotion();
  const [isLoading, setIsLoading] = useState(!reducedMotion);

  useEffect(() => {
    if (reducedMotion) setIsLoading(false);
  }, [reducedMotion]);

  const content = (
    <>
      {!reducedMotion && <CustomCursor />}
      {!reducedMotion && <GrainOverlay />}
      <Navbar />

      <main>
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Skills />
        <Contact />
      </main>
    </>
  );

  return (
    <>
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}

      {reducedMotion ? (
        content
      ) : (
        <SmoothScroll>
          <ClickSpark>{content}</ClickSpark>
        </SmoothScroll>
      )}
    </>
  );
}

export default App;
