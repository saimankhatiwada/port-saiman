import { useEffect, useRef, useState } from "react";
import { Button } from "./components/ui/button";
import { ChevronDown, Github, Linkedin, Mail, Send } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Textarea } from "./components/ui/textarea";
import { Input } from "./components/ui/input";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("intro");
  const sectionsRef = useRef<{ [key: string]: HTMLElement | null }>({});
  const { scrollY } = useScroll();

  const opacity = useTransform(scrollY, [0, 200], [1, 0]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      Object.entries(sectionsRef.current).forEach(([key, section]) => {
        if (section) {
          const { offsetTop, offsetHeight } = section;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(key);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (section: string) => {
    sectionsRef.current[section]?.scrollIntoView({ behavior: "smooth" });
  };

  const sections = {
    intro: {
      title: "Saiman Khatiwada",
      subtitle: "Solution Architect | DevOps | Software Engineer",
      description: "I create elegant solutions to complex problems",
    },
    about: {
      title: "About Me",
      content:
        "With over 3+ years of experience in web development, Api development, System design and more, I specialize in creating modern, efficient, scalable, robust, fault-tolerent and user-friendly applications. My expertise spans across the full stack, from front-end design to back-end architecture.",
      skills: [
        "Solution Architecture",
        "Design Patterns",
        "DevOps Engineering",
        "Cloud Infrastructure",
        "Full Stack Development",
        "System Design",
        "Agile Methodologies",
        ".NET",
        "React",
        "TypeScript",
        "PostgreSql",
        "KeyCloak",
        "Docker",
        "API",
        "Python and more.",
      ],
    },
    contact: {
      title: "Get in Touch",
      description:
        "Interested in working together? Let's discuss your project.",
    },
  };

  if (isLoading) {
    return (
      <div className="h-screen w-screen bg-[#B7E4F9] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex gap-2"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 rounded-full bg-white"
              animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-[#B7E4F9] text-gray-900">
      <section
        ref={(el) => (sectionsRef.current.intro = el)}
        className="h-screen flex flex-col items-center justify-center relative p-4"
      >
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-6xl md:text-8xl font-bold mb-4 text-center"
        >
          {sections.intro.title}
        </motion.h1>
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-2xl md:text-3xl mb-8 text-center"
        >
          {sections.intro.subtitle}
        </motion.h2>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xl md:text-2xl mb-12 text-gray-700 text-center"
        >
          {sections.intro.description}
        </motion.p>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex gap-4"
        >
          <Button
            variant="outline"
            size="lg"
            className="rounded-full bg-white/80 hover:bg-white"
            onClick={() => scrollToSection("about")}
          >
            About Me
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="rounded-full bg-white/80 hover:bg-white"
            onClick={() => scrollToSection("contact")}
          >
            Get in Touch
          </Button>
        </motion.div>
        <motion.div
          style={{ opacity }}
          className="absolute bottom-8 flex flex-col items-center gap-2"
        >
          <span className="text-sm text-gray-600">Scroll to explore</span>
          <ChevronDown className="w-6 h-6 animate-bounce" />
        </motion.div>
      </section>

      <section
        ref={(el) => (sectionsRef.current.about = el)}
        className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8"
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl w-full space-y-12"
        >
          <div className="text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-4">
              {sections.about.title}
            </h2>
            <p className="text-xl text-gray-700">{sections.about.content}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {sections.about.skills.map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/80 rounded-lg p-4 text-center hover:bg-white transition-colors"
              >
                {skill}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center gap-4"
          >
            <a href="https://github.com/saimankhatiwada">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-white/80 hover:bg-white"
              >
                <Github className="w-5 h-5" />
              </Button>
            </a>
            <a href="https://www.linkedin.com/in/saiman-khatiwada-a07346163/">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-white/80 hover:bg-white"
              >
                <Linkedin className="w-5 h-5" />
              </Button>
            </a>
            <a href="mailto:saimankhatiwada9611@gmail.com">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-white/80 hover:bg-white"
              >
                <Mail className="w-5 h-5" />
              </Button>
            </a>
          </motion.div>
        </motion.div>
      </section>

      <section
        ref={(el) => (sectionsRef.current.contact = el)}
        className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8"
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-xl w-full"
        >
          <Card className="bg-white/80 border-none">
            <CardHeader>
              <CardTitle className="text-3xl text-center">
                {sections.contact.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="space-y-2">
                  <Input
                    placeholder="Your Name"
                    className="rounded-full bg-white border-none h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Input
                    type="email"
                    placeholder="Your Email"
                    className="rounded-full bg-white border-none h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Textarea
                    placeholder="Your Message"
                    className="min-h-[150px] rounded-3xl bg-white border-none resize-none"
                  />
                </div>
                <Button className="w-full rounded-full bg-gray-900 hover:bg-gray-800 text-white h-12" disabled={true}>
                  Send Message
                  <Send className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="fixed bottom-4 right-4 flex gap-2 text-sm"
      >
        {["intro", "about", "contact"].map((section) => (
          <button
            key={section}
            onClick={() => scrollToSection(section)}
            className={`w-2 h-2 rounded-full transition-colors ${
              activeSection === section ? "bg-gray-900" : "bg-gray-400"
            }`}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default App;
