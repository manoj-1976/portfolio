import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Github, Linkedin, Mail, Instagram, ChevronRight, Menu, X, ExternalLink, ArrowRight } from 'lucide-react';
import emailjs from '@emailjs/browser';

function App() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.05], [1, 0.98]);

  // Detect active section on scroll
  useEffect(() => {
    const sections = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 300;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (!element) continue;
        
        const offsetTop = element.offsetTop;
        const offsetHeight = element.offsetHeight;
        
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection(section);
          break;
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const skills = [
    { 
      category: "Backend", 
      icon: "🔧",
      items: ["Python", "Laravel", "Node.js", "Django"] 
    },
    { 
      category: "Databases", 
      icon: "🗄️",
      items: ["MySQL", "MongoDB"] 
    },
    { 
      category: "AI & ML", 
      icon: "🤖",
      items: [ "NLP", "Voice Agents", "Chatbots"] 
    },
    { 
      category: "Tools & Others", 
      icon: "🛠️",
      items: ["Git", "REST APIs","FastAPI"] 
    }
  ];

  const projects = [
    {
      title: "Super MN Auto",
      description: "A comprehensive platform connecting mechanics, distributors, and sales employees. Built with Laravel.",
      image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&w=500&q=60",
      tech: ["Laravel", "MySQL", "REST APIs"]
    },
    {
      title: "Sales CRM Project",
      description: "Robust APIs and dashboard functionality using Node.js for efficient sales management.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&w=500&q=60",
      tech: ["Node.js", "React JS", "MySQL"]
    },
    {
      title: "AI Voice Agent",
      description: "Advanced conversational AI agents with natural language processing capabilities.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&w=500&q=60",
      tech: ["Python", "Langchain", "NLP"]  
    },
    {
      title: "AI Chatbot",
      description: "Advanced Chatbot AI agents with personalization and multi-agent capabilities.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&w=500&q=60",
      tech: ["Python", "Langchain"]
    }
  ];

  const experiences = [
    {
      company: "Kambaa Incorporation",
      role: "Full Stack Developer",
      period: "2023 - Present",
      description: "Leading development of enterprise applications, implementing modern architectures and AI solutions."
    },
    // {
    //   company: "Previous Experience",
    //   role: "API Developer",
    //   period: "2020 - 2023",
    //   description: "Developed and maintained RESTful APIs, microservices, and backend systems."
    // }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsSubmitting(true);
    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      setSubmitStatus('success');
      formRef.current.reset();
    } catch (error) {
      console.error('Email error:', error);
      setSubmitStatus('error');
    }
    setIsSubmitting(false);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-dark-900 text-white">
      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-primary-400 origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-dark-900/80 backdrop-blur-md z-40 border-b border-dark-700/50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              className="text-2xl font-display font-bold"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <span className="text-white">Manoj</span>
              <span className="text-primary-400">kumar BR</span>
            </motion.div>
            
            {/* Desktop Navigation */}
            <motion.div 
              className="hidden md:flex space-x-8"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            >
              {['home', 'skills', 'projects', 'experience', 'about', 'contact'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item}`} 
                  className={`nav-link ${activeSection === item ? 'text-primary-400' : 'text-white'}`}
                  onClick={() => setActiveSection(item)}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                  {activeSection === item && (
                    <motion.span 
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-400"
                      layoutId="activeSection"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              ))}
            </motion.div>

            {/* Social Icons */}
            <motion.div 
              className="hidden md:flex space-x-5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            >
              <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" 
                className="text-dark-400 hover:text-primary-400 transition-colors duration-300">
                <Github size={20} />
              </a>
              <a href="www.linkedin.com/in/manojkumar-rajendran-36b8042a6" target="_blank" rel="noopener noreferrer" 
                className="text-dark-400 hover:text-primary-400 transition-colors duration-300">
                <Linkedin size={20} />
              </a>
              <a href="manojkumjarrajendran22@gmail.com" target="_blank" rel="noopener noreferrer" 
                className="text-dark-400 hover:text-primary-400 transition-colors duration-300">
                <Mail size={20} />
              </a>
              <a href="https://instagram.com/yourusername" target="_blank" rel="noopener noreferrer" 
                className="text-dark-400 hover:text-primary-400 transition-colors duration-300">
                <Instagram size={20} />
              </a>
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden text-white focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileTap={{ scale: 0.95 }}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="fixed inset-0 bg-dark-900/95 backdrop-blur-md z-30 md:hidden pt-20 px-6"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <motion.div 
              className="flex flex-col space-y-6 items-center"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {['home', 'skills', 'projects', 'experience', 'about', 'contact'].map((item) => (
                <motion.a 
                  key={item} 
                  href={`#${item}`} 
                  className={`text-xl font-medium ${activeSection === item ? 'text-primary-400' : 'text-white'}`}
                  onClick={() => {
                    setActiveSection(item);
                    setMobileMenuOpen(false);
                  }}
                  variants={fadeInUp}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </motion.a>
              ))}

              <motion.div 
                className="flex space-x-6 mt-8 pt-8 border-t border-dark-700 w-full justify-center"
                variants={fadeInUp}
              >
                <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" 
                  className="text-dark-400 hover:text-primary-400 transition-colors">
                  <Github size={22} />
                </a>
                <a href="www.linkedin.com/in/manojkumar-rajendran-36b8042a6" target="_blank" rel="noopener noreferrer" 
                  className="text-dark-400 hover:text-primary-400 transition-colors">
                  <Linkedin size={22} />
                </a>
                <a href="manojkumjarrajendran22@gmail.com" target="_blank" rel="noopener noreferrer" 
                  className="text-dark-400 hover:text-primary-400 transition-colors">
                  <Mail size={22} />
                </a>
                <a href="https://instagram.com/yourusername" target="_blank" rel="noopener noreferrer" 
                  className="text-dark-400 hover:text-primary-400 transition-colors">
                  <Instagram size={22} />
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-primary-400/5 to-transparent opacity-60"></div>
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
          >
            <div className="relative inline-block">
              <img
                src=""
                alt="Profile"
                className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-primary-400 shadow-glow"
              />
              <motion.div 
                className="absolute inset-0 rounded-full border-4 border-primary-400/30"
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.7, 0.3, 0.7]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6 font-display"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            Modern <span className="text-primary-400">API Developer</span> &
            <br />AI Agents <span className="text-primary-400">Developer</span>
          </motion.h1>
          
          <motion.p
            className="text-xl text-dark-400 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            Crafting innovative solutions with cutting-edge technologies
          </motion.p>
          
          <motion.div
            className="flex flex-wrap gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
          >
            <a href="#projects" className="btn btn-primary">
              View Projects <ChevronRight className="ml-1 h-4 w-4" />
            </a>
            <br />
            <a href="#contact" className="btn btn-outline">
              Get in Touch
            </a>
          </motion.div>
          <br />
          <br />
          <br />
          <br />
          <motion.div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-12 border-2 border-dark-400 rounded-full mt-16 mb-8 hidden md:flex justify-center cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.7 }}
            onClick={() => {
              const sections = ['home', 'skills', 'projects', 'experience', 'about', 'contact'];
              const currentIndex = sections.indexOf(activeSection);
              const nextSection = sections[currentIndex + 1] || sections[0];
              document.getElementById(nextSection)?.scrollIntoView({ behavior: 'smooth' });
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div 
              className="w-1.5 h-1.5 bg-primary-400 rounded-full mt-2"
              animate={{ 
                y: [0, 16, 0],
              }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 bg-dark-950 relative">
        <div className="absolute inset-0 bg-gradient-dots opacity-30"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Skills & Technologies
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((skillGroup, index) => (
              <motion.div
                key={index}
                className="glass-card p-6 hover:shadow-glow transition-all duration-500"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="flex items-center mb-4">
                  <span className="text-2xl mr-2">{skillGroup.icon}</span>
                  <h3 className="text-xl font-semibold text-primary-400">{skillGroup.category}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill, i) => (
                    <motion.span
                      key={i}
                      className="px-3 py-1 bg-dark-700/50 backdrop-blur-sm rounded-full text-sm"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + (i * 0.05), duration: 0.3 }}
                      whileHover={{ 
                        backgroundColor: "rgba(0, 235, 141, 0.15)",
                        color: "#fff",
                        transition: { duration: 0.2 }
                      }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Featured Projects
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                className="project-card group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
              >
                <div className="relative overflow-hidden rounded-lg mb-6 aspect-video">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transform transition-all duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-0 w-0 h-1 bg-primary-400 transition-all duration-300 group-hover:w-full"></div>
                </div>
                
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-400 transition-colors duration-300">{project.title}</h3>
                <p className="text-dark-400 mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="text-xs bg-dark-700/50 backdrop-blur-sm px-3 py-1 rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <motion.a 
                  href="#" 
                  className="inline-flex items-center text-sm text-primary-400 hover:text-primary-300 transition-colors"
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  View Project <ArrowRight className="ml-1 h-4 w-4" />
                </motion.a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-4 bg-dark-950 relative">
        <div className="absolute inset-0 bg-gradient-dots opacity-30"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Work Experience
          </motion.h2>
          
          <div className="experience-timeline">
            {experiences.map((exp, index) => (
              <motion.div 
                key={index}
                className="mb-12"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
              >
                <div className="timeline-dot" />
                <motion.div 
                  className="glass-card p-6"
                  whileHover={{ x: 5, transition: { duration: 0.2 } }}
                >
                  <h3 className="text-xl font-semibold mb-1">{exp.company}</h3>
                  <p className="text-primary-400 mb-2 font-medium">{exp.role}</p>
                  <p className="text-dark-400 mb-3 text-sm">{exp.period}</p>
                  <p className="text-gray-300">{exp.description}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 relative">
        <div className="max-w-4xl mx-auto">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            About Me
          </motion.h2>
          
          <motion.div
            className="glass-card p-8 space-y-6 text-lg text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <p>
              Hi, I'm <span className="text-primary-400 font-medium">Manojkumar BR</span> — a passionate developer with hands-on experience in building powerful backend systems, intelligent AI solutions, and seamless dashboards. My tech stack spans across Python, Laravel, Node.js, and AI Agents, allowing me to craft solutions that are not only functional but also intelligent and scalable.
            </p>
            
            <p>
              Over the years, I've contributed to a variety of impactful projects:
            </p>
            
            <ul className="space-y-4 pl-4">
              {[
                {
                  name: "Super MN Auto",
                  description: "A platform connecting mechanics, distributors, and sales employees. I worked on APIs and dashboards using Laravel."
                },
                {
                  name: "Sales CRM Project",
                  description: "Built robust APIs and interactive dashboards using Node.js to streamline sales operations."
                },
                {
                  name: "Meraki Document Classification",
                  description: "Developed backend APIs using Python and Django for automating document classification with precision."
                },
                {
                  name: "AI Voice Agent & Chatbot",
                  description: "Engineered conversational AI systems to enhance customer interactions and automate support."
                }
              ].map((project, index) => (
                <motion.li
                  key={index}
                  className="flex items-start"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + (index * 0.1), duration: 0.5 }}
                >
                  <span className="text-primary-400 mr-2">•</span>
                  <div>
                    <span className="text-primary-400 font-medium">{project.name}</span> – {project.description}
                  </div>
                </motion.li>
              ))}
            </ul>
            
            <p>
              I thrive on solving complex problems, turning ideas into reality, and continuously learning new things. Whether it's building scalable APIs, designing user-friendly dashboards, or crafting AI-driven experiences — I'm all in.
            </p>
            
            <p className="text-primary-400 font-semibold">
              Let's build something great together.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-dark-950 relative">
        <div className="absolute inset-0 bg-gradient-dots opacity-30"></div>
        <div className="max-w-3xl mx-auto relative z-10">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Get In Touch
          </motion.h2>
          
          <motion.div
            className="glass-card p-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  placeholder="Your name"
                  className="w-full"
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  placeholder="your.email@example.com"
                  className="w-full"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows={6}
                  required
                  placeholder="How can I help you?"
                  className="w-full"
                />
              </motion.div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary w-full"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </motion.button>

              <AnimatePresence>
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="bg-green-500/20 border border-green-500/30 text-green-400 p-3 rounded-lg text-center"
                  >
                    Message sent successfully! I'll get back to you soon.
                  </motion.div>
                )}
                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="bg-red-500/20 border border-red-500/30 text-red-400
                    p-3 rounded-lg text-center"
                  >
                    Oops! Something went wrong. Please try again later.
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </section>
      {/* Footer */}
      <footer className="py-10 px-4 bg-dark-900 relative">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            className="text-sm text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            © {new Date().getFullYear()} Manojkumar BR. All rights reserved.
          </motion.div>
        </div>
        <div className="absolute inset-0 bg-gradient-dots opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-radial from-primary-400/5 to-transparent opacity-60"></div>
      </footer>
    </div>
  );
}
export default App;

