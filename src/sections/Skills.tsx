import { motion } from "framer-motion";
import { Code, Server, Database, Cloud, Brain, Terminal } from "lucide-react";

interface Skill {
  name: string;
  level: number;
}

interface SkillCategory {
  id: number;
  title: string;
  icon: React.ReactNode;
  skills: Skill[];
}

const Skills = () => {
  const skillCategories: SkillCategory[] = [
    {
      id: 1,
      title: "Frontend",
      icon: <Code size={24} />,
      skills: [
        { name: "React", level: 90 },
        { name: "Angular", level: 60 },
        { name: "Tailwind CSS", level: 95 },
        { name: "TypeScript", level: 80 },
        { name: "Component Libraries", level: 80 },
      ],
    },
    {
      id: 2,
      title: "Languages",
      icon: <Server size={24} />,
      skills: [
        { name: "Javascript", level: 70 },
        { name: "Java", level: 40 },
        { name: "Python", level: 80 },
        // { name: "ChromaDB", level: 75 },
        // { name: "GraphQL", level: 70 },
      ],
    },
    {
      id: 3,
      title: "Databases",
      icon: <Database size={24} />,
      skills: [
        { name: "PostgreSQL", level: 60 },
        { name: "MongoDB", level: 40 },
        { name: "Redis", level: 20 },
        { name: "Firebase", level: 60 },
        { name: "ChromaDB", level: 70 },
      ],
    },
    {
      id: 4,
      title: "DevOps & Cloud",
      icon: <Cloud size={24} />,
      skills: [
        { name: "AWS", level: 70 },
        { name: "Docker", level: 50 },
        { name: "CI/CD", level: 60 },
        { name: "Kubernetes", level: 5 },
        // { name: "Terraform", level: 60 },
      ],
    },
    {
      id: 5,
      title: "AI & ML",
      icon: <Brain size={24} />,
      skills: [
        { name: "AI Agents", level: 80 },
        { name: "Hugging Face", level: 85 },
        { name: "Langchain", level: 75 },
        { name: "RAG", level: 90 },
        { name: "Langgraph", level: 70 },
      ],
    },
    {
      id: 6,
      title: "Tools & Others",
      icon: <Terminal size={24} />,
      skills: [
        { name: "Git", level: 95 },
        { name: "Agile/Scrum", level: 70 },
        { name: "Testing", level: 70 },
        { name: "UI/UX", level: 65 },
        { name: "Performance Optimization", level: 70 },
      ],
    },
  ];

  return (
    <section id="skills" className="py-20">
      <div className="container-custom">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title">Skills & Expertise</h2>
          <p className="text-light/70 max-w-2xl mx-auto mt-4">
            My technical skills and proficiency levels across different areas of
            software development and AI.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.id}
              className="bg-dark-light rounded-xl p-6"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-primary/20 rounded-lg text-primary">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold">{category.title}</h3>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-light/60">{skill.level}%</span>
                    </div>
                    <div className="skill-bar">
                      <motion.div
                        className="skill-progress"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.1 * i }}
                      ></motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
