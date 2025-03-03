import { useState } from "react";
import { motion } from "framer-motion";
import { Code } from "lucide-react";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  // github: string;
  // demo: string;
  category: "ai" | "fullstack" | "frontend" | "automation";
}

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState<
    "all" | "ai" | "fullstack" | "frontend" | "automation"
  >("all");

  const projects: Project[] = [
    {
      id: 1,
      title: "AI-Powered Document Retrieval System",
      description:
        "A FastAPI-based RAG pipeline that extracts, chunks, and retrieves relevant information from large PDFs with high accuracy.",
      image:
        "/RAG.JPEG",
      technologies: [
        "Python",
        "FastAPI",
        "FAISS",
        "Hugging Face",
        "LangChain",
        "AWS",
      ],
      // github: "https://github.com",
      // demo: "https://demo.com",
      category: "ai",
    },
    {
      id: 2,
      title: "Hierarchical Multi-Agent System",
      description:
        "A structured AI agent framework using LangGraph and LangChain, enabling intelligent decision-making and automation through inter-agent communication.",
      image:
        "/AgentsImage.jpg",
      technologies: [
        "Python",
        "LangGraph",
        "LangChain",
        "Hugging Face",
        "FastAPI",
        "AWS",
      ],
      // github: "https://github.com",
      // demo: "https://demo.com",
      category: "ai",
    },
    {
      id: 3,
      title: "AI-Powered Email Monitoring System",
      description:
        "A Gmail API-based email monitoring service integrated into a FastAPI backend, enabling automated email processing and response generation.",
      image:
        "https://images.unsplash.com/photo-1594764657037-19a84a31728f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      technologies: ["Python", "FastAPI", "Gmail API", "AWS", "Hugging Face"],
      // github: "https://github.com",
      // demo: "https://demo.com",
      category: "automation",
    },
    {
      id: 4,
      title: "Personal Portfolio with Interactive UI",
      description:
        "A visually engaging and performant portfolio website featuring floating particle effects, a curved timeline for experience, and smooth animations.",
      image:
        "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      technologies: ["React", "Framer Motion", "Tailwind CSS", "ShadCN"],
      // github: "https://github.com",
      // demo: "https://demo.com",
      category: "frontend",
    },
  ];

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  return (
    <section id="projects" className="py-20">
      <div className="container-custom">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title">My Projects</h2>
          <p className="text-light/70 max-w-2xl mx-auto mt-4">
            Here are some of my recent projects that showcase my skills in AI
            integration, full stack development, and frontend design.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.button
            className={`px-4 py-2 rounded-full ${
              activeFilter === "all"
                ? "bg-primary text-white"
                : "bg-dark-lighter text-light/80 hover:bg-dark-light"
            } transition-colors`}
            onClick={() => setActiveFilter("all")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            All Projects
          </motion.button>
          <motion.button
            className={`px-4 py-2 rounded-full ${
              activeFilter === "ai"
                ? "bg-primary text-white"
                : "bg-dark-lighter text-light/80 hover:bg-dark-light"
            } transition-colors`}
            onClick={() => setActiveFilter("ai")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            AI Projects
          </motion.button>
          <motion.button
            className={`px-4 py-2 rounded-full ${
              activeFilter === "fullstack"
                ? "bg-primary text-white"
                : "bg-dark-lighter text-light/80 hover:bg-dark-light"
            } transition-colors`}
            onClick={() => setActiveFilter("fullstack")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Full Stack
          </motion.button>
          <motion.button
            className={`px-4 py-2 rounded-full ${
              activeFilter === "frontend"
                ? "bg-primary text-white"
                : "bg-dark-lighter text-light/80 hover:bg-dark-light"
            } transition-colors`}
            onClick={() => setActiveFilter("frontend")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Frontend
          </motion.button>
          <motion.button
            className={`px-4 py-2 rounded-full ${
              activeFilter === "automation"
                ? "bg-primary text-white"
                : "bg-dark-lighter text-light/80 hover:bg-dark-light"
            } transition-colors`}
            onClick={() => setActiveFilter("automation")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            automation
          </motion.button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className="bg-dark-light rounded-xl overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="relative overflow-hidden h-60">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent opacity-70"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-xl font-bold">{project.title}</h3>
                </div>
              </div>

              <div className="p-6">
                <p className="text-light/80 mb-4">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-dark-lighter rounded-full text-xs font-medium text-primary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* <div className="flex gap-4">
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-light/80 hover:text-primary transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Github size={18} />
                    <span>Code</span>
                  </motion.a>

                  <motion.a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-light/80 hover:text-primary transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink size={18} />
                    <span>Live Demo</span>
                  </motion.a>
                </div> */}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <motion.a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-light transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Code size={20} />
            <span>View more projects on GitHub</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
