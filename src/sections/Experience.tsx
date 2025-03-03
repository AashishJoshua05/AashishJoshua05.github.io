import { motion } from "framer-motion";
import { Briefcase, Calendar } from "lucide-react";

interface Experience {
  id: number;
  company: string;
  position: string;
  period: string;
  description: string[];
  technologies: string[];
}

const Experience = () => {
  const experiences: Experience[] = [
    {
      id: 1,
      company: "AidenAI",
      position: "Senior AI Engineer",
      period: "2024 - Present",
      description: [
        "Developed and optimized a Retrieval-Augmented Generation (RAG) pipeline, improving document retrieval accuracy for large-scale PDFs",
        "Built a hierarchical multi-agent system using LangGraph and LangChain, enabling structured, chat-like interactions for AI-driven workflows",
        "Implemented a FastAPI-based service for extracting and highlighting named entities (NER) from PDFs using advanced NLP techniques",
        "Mentored junior engineers, conducted rigorous code reviews, and established best practices for AI development and deployment",
      ],
      technologies: [
        "Python",
        "Hugging Face",
        "FastAPI",
        "AWS",
        "React",
        "LangGraph",
        "LangChain",
        "Retrieval-Augmented Generation (RAG)",
      ],
    },
  ];

  return (
    <section id="experience" className="py-20 bg-dark-light/30">
      <div className="container-custom">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title">Work Experience</h2>
          <p className="text-light/70 max-w-2xl mx-auto mt-4">
            My professional journey in software development and AI integration.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-primary/30 transform md:translate-x-[-0.5px]"></div>

          {/* Experience items */}
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              className={`relative mb-12 md:mb-24 ${
                index % 2 === 0
                  ? "md:pr-12 md:text-right md:ml-auto md:mr-auto"
                  : "md:pl-12 md:ml-auto md:mr-auto"
              } md:w-1/2`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Timeline dot */}
              <div
                className={`absolute top-0 ${
                  index % 2 === 0
                    ? "left-0 md:right-0 md:translate-x-1/2"
                    : "left-0 md:left-0 md:-translate-x-1/2"
                } w-5 h-5 rounded-full bg-primary z-10 transform md:translate-y-1.5`}
              ></div>

              {/* Content card */}
              <motion.div
                className="bg-dark-light p-6 rounded-xl shadow-lg ml-8 md:ml-0"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-2 text-primary mb-2">
                  <Briefcase size={18} />
                  <h3 className="text-xl font-bold">{exp.position}</h3>
                </div>

                <h4 className="text-lg font-semibold mb-1">{exp.company}</h4>

                <div className="flex items-center gap-2 text-light/60 mb-4">
                  <Calendar size={16} />
                  <span>{exp.period}</span>
                </div>

                <ul className="space-y-2 mb-4">
                  {exp.description.map((item, i) => (
                    <li key={i} className="text-light/80 flex items-start">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-2"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-dark-lighter rounded-full text-xs font-medium text-primary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
