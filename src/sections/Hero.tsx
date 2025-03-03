import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Github } from "lucide-react";

const Hero = () => {
  const [titleIndex, setTitleIndex] = useState(0);
  const titles = ["AI Engineer", "Full Stack Developer", "Problem Solver"];

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prevIndex) => (prevIndex + 1) % titles.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [titles.length]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        when: "beforeChildren",
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-20 z-10"
    >
      <div className="container-custom relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            className="text-primary font-medium mb-4"
            variants={itemVariants}
          >
            Welcome to my portfolio
          </motion.p>

          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6"
            variants={itemVariants}
          >
            Hi, I'm <span className="text-primary">Aashish J James</span>,<br />
            an AI Software Engineer
          </motion.h1>

          <motion.div
            className="h-12 mb-8 text-xl md:text-2xl text-light/80"
            variants={itemVariants}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={titleIndex}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {titles[titleIndex]}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={itemVariants}
          >
            <motion.a
              href="#projects"
              className="btn-primary flex items-center justify-center gap-2 relative z-20"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github size={20} />
              View Projects
            </motion.a>

            <motion.a
              href="/resume.pdf"
              className="btn-secondary flex items-center justify-center gap-2 relative z-20"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download size={20} />
              Download Resume
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
