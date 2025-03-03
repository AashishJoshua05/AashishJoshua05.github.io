import { motion } from "framer-motion";
import { Github, Linkedin, Instagram, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-light py-12">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <motion.h3
              className="text-xl font-bold mb-4 text-primary"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-white">Dev - </span>Vakes
            </motion.h3>
            <motion.p
              className="text-light/80 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Building intelligent solutions at the intersection of AI and web
              development.
            </motion.p>
            <motion.div
              className="flex space-x-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.a
                href="https://github.com/AashishJoshua05"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-dark-lighter hover:bg-primary/20 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Github size={20} />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/aashish-joshua-james/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-dark-lighter hover:bg-primary/20 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Linkedin size={20} />
              </motion.a>
              <motion.a
                href="https://www.instagram.com/sup_imaashish/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg bg-dark-lighter hover:bg-primary/20 transition-colors text-light hover:text-primary"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Instagram size={24} />
              </motion.a>
              <motion.a
                href="mailto:aashishjames05@gmail.com"
                className="p-2 rounded-full bg-dark-lighter hover:bg-primary/20 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Mail size={20} />
              </motion.a>
            </motion.div>
          </div>

          <div>
            <motion.h3
              className="text-xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Quick Links
            </motion.h3>
            <motion.ul
              className="space-y-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <li>
                <a
                  href="#home"
                  className="text-light/80 hover:text-primary transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-light/80 hover:text-primary transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  className="text-light/80 hover:text-primary transition-colors"
                >
                  Projects
                </a>
              </li>
              <li>
                <a
                  href="#experience"
                  className="text-light/80 hover:text-primary transition-colors"
                >
                  Experience
                </a>
              </li>
              <li>
                <a
                  href="#skills"
                  className="text-light/80 hover:text-primary transition-colors"
                >
                  Skills
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-light/80 hover:text-primary transition-colors"
                >
                  Contact
                </a>
              </li>
            </motion.ul>
          </div>

          <div>
            <motion.h3
              className="text-xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              Contact
            </motion.h3>
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <p className="text-light/80">
                <span className="font-semibold">Email:</span>{" "}
                aashishjames05@gmail.com
              </p>
              <p className="text-light/80">
                <span className="font-semibold">Location:</span> Hyderabad,
                India
              </p>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="border-t border-dark-lighter mt-8 pt-8 text-center text-light/60"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <p>© {currentYear} Aashish Joshua James. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
