import React from 'react';
import { X, Github, Mail, Phone, MapPin, Download, ExternalLink } from 'lucide-react';
import { ModalData } from '../types/GameTypes';

interface ModalProps {
  data: ModalData;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ data, onClose }) => {
  const renderContent = () => {
    switch (data.type) {
      case 'code':
        return (
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              {[
                {
                  title: "E-Commerce Platform",
                  description: "Full-stack React application with Stripe integration, user authentication, and admin dashboard.",
                  tech: ["React", "Node.js", "MongoDB", "Stripe"],
                  github: "#",
                  demo: "#"
                },
                {
                  title: "Task Management App",
                  description: "Collaborative project management tool with real-time updates and team collaboration features.",
                  tech: ["Vue.js", "Firebase", "Tailwind CSS"],
                  github: "#",
                  demo: "#"
                },
                {
                  title: "Weather Dashboard",
                  description: "Beautiful weather application with location-based forecasts and interactive maps.",
                  tech: ["JavaScript", "OpenWeather API", "Chart.js"],
                  github: "#",
                  demo: "#"
                },
                {
                  title: "Portfolio Game",
                  description: "This interactive portfolio you're exploring right now! Built with Phaser.js and React.",
                  tech: ["Phaser.js", "React", "TypeScript"],
                  github: "#",
                  demo: "#"
                }
              ].map((project, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-blue-300 transition-colors">
                  <h3 className="font-bold text-lg mb-2 text-gray-800">{project.title}</h3>
                  <p className="text-gray-600 mb-3 text-sm">{project.description}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.tech.map((tech, techIndex) => (
                      <span key={techIndex} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <a href={project.github} className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600 transition-colors">
                      <Github size={14} />
                      Code
                    </a>
                    <a href={project.demo} className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600 transition-colors">
                      <ExternalLink size={14} />
                      Demo
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'resume':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto">
                <Download size={18} />
                Download Resume PDF
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-lg mb-4 text-gray-800">Experience</h3>
                <div className="space-y-4">
                  {[
                    {
                      title: "Senior Frontend Developer",
                      company: "Tech Innovations Inc.",
                      period: "2022 - Present",
                      description: "Led development of responsive web applications using React and TypeScript."
                    },
                    {
                      title: "Full Stack Developer",
                      company: "Digital Solutions Co.",
                      period: "2020 - 2022",
                      description: "Built and maintained full-stack applications with modern web technologies."
                    },
                    {
                      title: "Junior Developer",
                      company: "StartUp Ventures",
                      period: "2019 - 2020",
                      description: "Contributed to various projects and learned modern development practices."
                    }
                  ].map((job, index) => (
                    <div key={index} className="border-l-4 border-blue-200 pl-4">
                      <h4 className="font-semibold text-gray-800">{job.title}</h4>
                      <p className="text-blue-600 font-medium text-sm">{job.company}</p>
                      <p className="text-gray-500 text-sm">{job.period}</p>
                      <p className="text-gray-600 text-sm mt-1">{job.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-bold text-lg mb-4 text-gray-800">Education</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-green-200 pl-4">
                    <h4 className="font-semibold text-gray-800">Computer Science Degree</h4>
                    <p className="text-green-600 font-medium text-sm">University of Technology</p>
                    <p className="text-gray-500 text-sm">2015 - 2019</p>
                    <p className="text-gray-600 text-sm mt-1">Bachelor's degree with focus on web development and software engineering.</p>
                  </div>
                </div>
                
                <h3 className="font-bold text-lg mb-4 mt-6 text-gray-800">Certifications</h3>
                <div className="space-y-2">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="font-medium text-gray-800">AWS Certified Developer</p>
                    <p className="text-gray-600 text-sm">Amazon Web Services - 2023</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="font-medium text-gray-800">React Professional Certificate</p>
                    <p className="text-gray-600 text-sm">Meta - 2022</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-gray-600 mb-6">Let's connect and discuss opportunities!</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-bold text-lg mb-4 text-gray-800">Contact Information</h3>
                <div className="space-y-3">
                  <a href="mailto:hello@example.com" className="flex items-center gap-3 text-gray-600 hover:text-blue-600 transition-colors p-3 rounded-lg hover:bg-blue-50">
                    <Mail size={20} />
                    <span>hello@example.com</span>
                  </a>
                  <a href="tel:+1234567890" className="flex items-center gap-3 text-gray-600 hover:text-blue-600 transition-colors p-3 rounded-lg hover:bg-blue-50">
                    <Phone size={20} />
                    <span>+1 (234) 567-8900</span>
                  </a>
                  <div className="flex items-center gap-3 text-gray-600 p-3">
                    <MapPin size={20} />
                    <span>San Francisco, CA</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-bold text-lg mb-4 text-gray-800">Send a Message</h3>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input 
                      type="email" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea 
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your message..."
                    ></textarea>
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        );

      case 'skills':
        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  category: "Frontend",
                  skills: [
                    { name: "React", level: 95 },
                    { name: "TypeScript", level: 90 },
                    { name: "Vue.js", level: 85 },
                    { name: "Tailwind CSS", level: 92 },
                    { name: "SASS/SCSS", level: 88 }
                  ]
                },
                {
                  category: "Backend",
                  skills: [
                    { name: "Node.js", level: 90 },
                    { name: "Python", level: 85 },
                    { name: "PostgreSQL", level: 82 },
                    { name: "MongoDB", level: 88 },
                    { name: "GraphQL", level: 78 }
                  ]
                },
                {
                  category: "Tools & Others",
                  skills: [
                    { name: "Git", level: 95 },
                    { name: "Docker", level: 80 },
                    { name: "AWS", level: 75 },
                    { name: "Figma", level: 85 },
                    { name: "Jest", level: 88 }
                  ]
                }
              ].map((category, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-bold text-lg mb-4 text-gray-800">{category.category}</h3>
                  <div className="space-y-3">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skillIndex}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                          <span className="text-sm text-gray-500">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${skill.level}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200">
              <h3 className="font-bold text-lg mb-3 text-gray-800">Currently Learning</h3>
              <div className="flex flex-wrap gap-2">
                {['Rust', 'Web3', 'Machine Learning', 'Three.js', 'Kubernetes'].map((tech, index) => (
                  <span key={index} className="bg-white text-purple-700 px-3 py-1 rounded-full text-sm font-medium border border-purple-200">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return <div>Content not found</div>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-purple-600">
          <h2 className="text-2xl font-bold text-white">{data.title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X size={24} className="text-white" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Modal;