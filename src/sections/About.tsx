import { motion } from "framer-motion";
import { Code, Brain, Rocket, Coffee } from "lucide-react";

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
    <section id="about" className="py-20 bg-dark-light/30">
      <div className="container-custom">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title">About Me</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              <motion.div
                className="w-full h-[400px] rounded-2xl overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src="/Vakesy.JPEG"
                  alt="Profile"
                  className="w-full h-full object-fit"
                />
              </motion.div>

              {/* Decorative elements */}
              <motion.div
                className="absolute -bottom-5 -left-5 w-24 h-24 bg-primary/20 rounded-lg"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute -top-5 -right-5 w-32 h-32 bg-primary/10 rounded-full"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h3
              className="text-2xl md:text-3xl font-bold mb-4"
              variants={itemVariants}
            >
              AI Software Engineer with a passion for building intelligent
              solutions
            </motion.h3>

            <motion.p className="text-light/80 mb-6" variants={itemVariants}>
              I'm an AI/ML engineer and full-stack developer with expertise in
              building intelligent, scalable applications. With experience in
              fine-tuning large language models, retrieval-augmented generation
              (RAG), and multi-agent architectures, I develop AI-driven
              solutions that enhance automation and decision-making.
            </motion.p>

            <motion.p className="text-light/80 mb-8" variants={itemVariants}>
              My skill set spans the entire development stack—from crafting
              responsive, dynamic UIs with React and Tailwind CSS to
              architecting robust back-end systems with Python, and
              FastAPI. I specialize in integrating AI into applications,
              optimizing model performance, and deploying scalable solutions on
              AWS. Passionate about combining AI with intuitive design, I focus
              on delivering seamless user experiences powered by cutting-edge
              technology.
            </motion.p>

            <motion.div
              className="grid grid-cols-2 gap-4"
              variants={itemVariants}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/20 rounded-lg text-primary">
                  <Code size={20} />
                </div>
                <div>
                  <h4 className="font-semibold">Full Stack</h4>
                  <p className="text-sm text-light/70">
                    End-to-end development
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/20 rounded-lg text-primary">
                  <Brain size={20} />
                </div>
                <div>
                  <h4 className="font-semibold">AI Integration</h4>
                  <p className="text-sm text-light/70">Smart solutions</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/20 rounded-lg text-primary">
                  <Rocket size={20} />
                </div>
                <div>
                  <h4 className="font-semibold">Optimization</h4>
                  <p className="text-sm text-light/70">Performance focused</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/20 rounded-lg text-primary">
                  <Coffee size={20} />
                </div>
                <div>
                  <h4 className="font-semibold">Problem Solver</h4>
                  <p className="text-sm text-light/70">Creative solutions</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
