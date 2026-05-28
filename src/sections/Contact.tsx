import { Github, Linkedin, Instagram } from "lucide-react";
import SplitText from "../components/ui/SplitText";
import ShinyText from "../components/ui/ShinyText";
import Magnet from "../components/ui/Magnet";

const socials = [
  {
    label: "GitHub",
    icon: <Github size={20} />,
    href: "https://github.com/AashishJoshua05",
  },
  {
    label: "LinkedIn",
    icon: <Linkedin size={20} />,
    href: "https://www.linkedin.com/in/aashish-joshua-james/",
  },
  {
    label: "Instagram",
    icon: <Instagram size={20} />,
    href: "https://www.instagram.com/sup_imaashish/",
  },
];

const Contact = () => {
  return (
    <section id="contact" className="section-padding">
      <div className="container-custom">
        <div className="mb-10">
          <h2 className="text-6xl md:text-7xl font-bold font-heading leading-tight">
            <SplitText text="Let's Build" splitBy="words" stagger={0.08} />
            <br />
            <SplitText
              text="Something Great"
              splitBy="words"
              stagger={0.08}
              delay={0.3}
            />
          </h2>

          <p className="text-light-dark text-lg mt-6 max-w-xl">
            Have a project or opportunity in mind? Let's talk.
          </p>
        </div>

        <div className="mb-12">
          <Magnet strength={0.2} tolerance={120}>
            <a
              href="mailto:aashishjames05@gmail.com"
              className="inline-block text-2xl md:text-4xl font-medium text-light hover:text-primary transition-colors"
            >
              <ShinyText text="aashishjames05@gmail.com" speed={4} />
            </a>
          </Magnet>
        </div>

        <div className="flex flex-wrap gap-4 mb-24">
          {socials.map((s) => (
            <Magnet key={s.label} strength={0.15} tolerance={80}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 border border-[#2a2a2a] rounded-full px-6 py-3 text-light-dark hover:text-light hover:border-light-muted transition-colors"
              >
                {s.icon}
                <span>{s.label}</span>
              </a>
            </Magnet>
          ))}
        </div>

        <div className="border-t border-[#1e1e1e] pt-8 text-center">
          <p className="text-sm text-light-muted">
            Designed &amp; Built by Aashish Joshua James
          </p>
          <p className="text-sm text-light-muted mt-1">
            &copy; 2025 All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
