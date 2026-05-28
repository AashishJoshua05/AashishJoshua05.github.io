import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

const sections = [
  { id: "home", label: "Home", number: "00" },
  { id: "about", label: "About", number: "01" },
  { id: "projects", label: "Projects", number: "02" },
  { id: "experience", label: "Experience", number: "03" },
  { id: "skills", label: "Skills", number: "04" },
  { id: "contact", label: "Contact", number: "05" },
];

const menuLinks = sections.slice(1);

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/AashishJoshua05",
    icon: Github,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/aashish-joshua-james/",
    icon: Linkedin,
  },
  {
    label: "Email",
    href: "mailto:aashishjames05@gmail.com",
    icon: Mail,
  },
];

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredDot, setHoveredDot] = useState<string | null>(null);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.3 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-4">
        {sections.map(({ id, label }) => {
          const isActive = activeSection === id;
          const isHovered = hoveredDot === id;

          return (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              onMouseEnter={() => setHoveredDot(id)}
              onMouseLeave={() => setHoveredDot(null)}
              className="relative flex items-center justify-end group"
              aria-label={`Scroll to ${label}`}
            >
              <AnimatePresence>
                {isHovered && (
                  <motion.span
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 8 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute right-5 mr-2 text-xs font-medium text-light uppercase tracking-wider whitespace-nowrap select-none pointer-events-none"
                  >
                    {label}
                  </motion.span>
                )}
              </AnimatePresence>

              <motion.span
                className="block rounded-full border"
                animate={{
                  width: isActive ? 10 : 8,
                  height: isActive ? 10 : 8,
                  backgroundColor: isActive ? "#8B5CF6" : "transparent",
                  borderColor: isActive
                    ? "#8B5CF6"
                    : "rgba(255,255,255,0.2)",
                  boxShadow: isActive
                    ? "0 0 10px rgba(139,92,246,0.5)"
                    : "0 0 0px rgba(139,92,246,0)",
                }}
                whileHover={{
                  borderColor: "rgba(139,92,246,0.6)",
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </button>
          );
        })}
      </nav>

      <button
        onClick={() => setMenuOpen((prev) => !prev)}
        className="fixed top-6 right-6 z-50 w-10 h-10 flex flex-col items-center justify-center gap-0"
        aria-label="Toggle menu"
      >
        <motion.span
          className="block w-6 h-[1.5px] bg-light origin-center"
          animate={
            menuOpen
              ? { rotate: 45, y: 0 }
              : { rotate: 0, y: -3 }
          }
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.span
          className="block w-6 h-[1.5px] bg-light origin-center"
          animate={
            menuOpen
              ? { rotate: -45, y: 0 }
              : { rotate: 0, y: 3 }
          }
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        />
      </button>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 bg-[#0a0a0a]/95 backdrop-blur-2xl z-40 flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <nav className="flex flex-col items-center gap-10">
              {menuLinks.map(({ id, label, number }, i) => (
                <motion.div
                  key={id}
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{
                    duration: 0.45,
                    delay: 0.05 + i * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <span className="text-sm text-light-muted font-sans mb-1 select-none">
                    {number}
                  </span>
                  <button
                    onClick={() => scrollTo(id)}
                    className="text-4xl md:text-5xl font-heading font-bold text-light hover:text-primary transition-colors duration-300"
                  >
                    {label}
                  </button>
                </motion.div>
              ))}
            </nav>

            <motion.div
              className="absolute bottom-10 flex flex-col items-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.45 }}
            >
              <div className="flex items-center gap-6">
                {socials.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target={label !== "Email" ? "_blank" : undefined}
                    rel={label !== "Email" ? "noopener noreferrer" : undefined}
                    className="text-light-dark hover:text-primary transition-colors duration-200"
                    aria-label={label}
                  >
                    <Icon size={20} />
                  </a>
                ))}
              </div>
              <span className="text-xs text-light-muted select-none">
                aashishjames05@gmail.com
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
