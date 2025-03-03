import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Experience from "./sections/Experience";
import Skills from "./sections/Skills";
// import Testimonials from "./sections/Testimonials";
import Contact from "./sections/Contact";
import Footer from "./components/Footer";
import BackgroundAnimation from "./components/BackgroundAnimation";

function App() {
  return (
    <div className="relative min-h-screen bg-dark text-light overflow-hidden">
      {/* Background is at z-0 */}
      <BackgroundAnimation />

      {/* Navbar should be at highest z-index */}
      <div className="relative z-50">
        <Navbar />
      </div>

      {/* Main content is at z-10, above background but below navbar */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Skills />
        {/* <Testimonials /> */}
        <Contact />
      </main>

      {/* Footer should also be above background */}
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}

export default App;
