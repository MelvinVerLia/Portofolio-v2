import React from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { Loader2 } from "lucide-react";
import CustomNotification from "../misc/CustomNotification";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = React.useState({
    name: "",
    message: "",
    email: "",
  });
  const [isLoading, setIsLoading] = React.useState(false);

  const [notification, setNotification] = React.useState<{
    isVisible: boolean;
    type?: "success" | "error";
    message: string;
  }>({
    isVisible: false,
    type: "success",
    message: "",
  });

  // Close notification helper
  const closeNotification = () => {
    setNotification((prev) => ({ ...prev, isVisible: false }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const fadeIn = {
    hidden: {
      opacity: 0,
      y: 40,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const socialLinks = [
    {
      name: "GitHub",
      icon: "github",
      url: "https://github.com/MelvinVerLia",
      color: "hover:text-purple-400",
    },
    {
      name: "LinkedIn",
      icon: "linkedin",
      url: "https://www.linkedin.com/in/melvin-verdinan-mulia/",
      color: "hover:text-blue-400",
    },
    {
      name: "Instagram",
      icon: "instagram",
      url: "https://www.instagram.com/cryodile/",
      color: "hover:text-indigo-400",
    },
  ];

  const SocialIcon: React.FC<{ icon: string }> = ({ icon }) => {
    switch (icon) {
      case "github":
        return <FaGithub className="w-6 h-6" />;
      case "linkedin":
        return <FaLinkedin className="w-6 h-6" />;
      case "instagram":
        return <FaInstagram className="w-6 h-6" />;
      default:
        return null;
    }
  };

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name || !formData.message || !formData.email) {
      setNotification({
        isVisible: true,
        type: "error",
        message: "Please fill all fields before sending.",
      });
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      emailjs
        .send(
          "service_ifnsa2a",
          "template_5lr6dgf",
          {
            email: formData.email,
            name: formData.name,
            message: formData.message,
            time: new Date().toLocaleString(),
          },
          "7AfJT0EbJc2pyfiN1"
        )
        .then(() => {
          console.log("SUCCESS");
          setIsLoading(false);
          setNotification({
            isVisible: true,
            type: "success",
            message: "Message sent successfully! I'll get back to you soon.",
          });
          setFormData({ email: "", name: "", message: "" });
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
          setNotification({
            isVisible: true,
            type: "error",
            message: "Something went wrong. Please try again later.",
          });
        });
    }, 1000);
  };

  return (
    <>
      {/* Custom Notification */}
      <CustomNotification
        isVisible={notification.isVisible}
        type={notification.type}
        message={notification.message}
        onClose={closeNotification}
      />
      {/* Background elements */}
      <div className="absolute inset-0 bg-[#0f0f1b] z-0">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-pink-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-1/3 w-40 h-40 bg-indigo-600/10 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.5 }}
          variants={fadeIn}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-purple-400 mb-2">
            Summon El Milord
          </h2>
          <div className="h-0.5 w-16 mx-auto bg-gradient-to-r from-purple-600 to-pink-500 mb-4"></div>
          <p className="text-gray-300 max-w-md mx-auto">
            Ready to collaborate or just want to say hi? Choose your preferred
            communication spell below.
          </p>
        </motion.div>

        {/* Contact methods */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left side - contact form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-[#1a1a2e]/70 backdrop-blur-sm border border-purple-800/30 rounded-2xl p-6 md:p-8 shadow-xl"
          >
            <h3 className="text-xl font-bold text-purple-300 mb-6">
              Send a direct message
            </h3>

            <form className="space-y-4" onSubmit={sendEmail}>
              <div>
                <input
                  type="text"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-[#0f0f1b]/50 border border-purple-800/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-[#0f0f1b]/50 border border-purple-800/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                />
              </div>
              <div>
                <textarea
                  placeholder="Your Message"
                  rows={4}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-[#0f0f1b]/50 border border-purple-800/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 resize-none"
                ></textarea>
              </div>

              {isLoading ? (
                <button className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 shadow-lg shadow-purple-600/20 opacity-70 cursor-not-allowed">
                  <Loader2 className="animate-spin w-5 h-5 text-white" />
                  Sending...
                </button>
              ) : (
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white  transition-colors duration-200 font-medium py-3 px-6 rounded-lg hover:cursor-pointer shadow-lg shadow-purple-600/20"
                >
                  Send Email
                </motion.button>
              )}
            </form>

            <div className="mt-6 text-center text-sm text-gray-400">
              <p>
                Or reach me directly at{" "}
                <a
                  href="mailto:melvin.mulia@binus.ac.id"
                  className="text-purple-400 hover:text-pink-400 transition-colors"
                >
                  mylordsavior@devmail.com
                </a>
              </p>
            </div>
          </motion.div>

          {/* Right side - fun interactive terminal */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-[#1a1a2e]/70 backdrop-blur-sm border border-purple-800/30 rounded-2xl p-6 md:p-8 shadow-xl flex flex-col"
          >
            <h3 className="text-xl font-bold text-purple-300 mb-6">
              Connect elsewhere
            </h3>

            {/* Terminal-style header */}
            <div className="bg-[#0f0f1b] rounded-t-lg border border-purple-900/40 p-2 flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              <div className="text-xs text-gray-400 ml-2">
                social_connect.sh
              </div>
            </div>

            {/* Terminal content */}
            <div className="bg-[#0f0f1b]/90 rounded-b-lg border-x border-b border-purple-900/40 p-4 font-mono text-sm flex-grow">
              <div className="text-green-400">$ ./find_me_on_socials</div>

              <div className="mt-2">
                <p className="text-purple-300">
                  ==== Running social detection... ====
                </p>
                <p className="text-gray-300 mt-1">Found connections at:</p>
              </div>

              {/* Social links */}
              <div className="mt-4 space-y-3">
                {socialLinks.map((link, i) => (
                  <motion.a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center p-3 rounded-lg bg-[#1a1a2e]/50 border border-purple-800/20 hover:bg-purple-900/20 transition-all duration-100 group ${link.color}`}
                    whileHover={{ x: 3 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0,
                      ease: "easeOut",
                    }}
                  >
                    <div className="mr-3 text-gray-400 ">
                      <SocialIcon icon={link.icon} />
                    </div>
                    <span className="">{link.name}</span>
                    <div className="ml-auto">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </motion.a>
                ))}
              </div>

              <div className="mt-4 text-green-400">$ _</div>
            </div>

            {/* Status message */}
            <div className="mt-4 text-center animate-pulse">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-green-400/10 text-green-400">
                <span className="mr-1 w-2 h-2 bg-green-400 rounded-full "></span>
                Dying
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Contact;
