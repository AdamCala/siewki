import Logo from "../components/icons/logo";
import { Link, redirect, useNavigate } from "react-router-dom";
import styles from "../styles/index.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const Root = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);
  const [animate, setAnimate] = useState(0);

  const handleLogoClick = () => {
    setAnimate(1);
    // Trigger your Framer animations here
    setIsVisible(false); // Hide the elements during animations

    // Assuming your animations take 3 seconds, adjust accordingly
    setTimeout(() => {
      // Redirect to /siweki after animations finish
      navigate("/siewki");
    }, 2000);
  };

  return (
    <div className="w-full h-full flex flex-row">
      <div className={`absolute w-screen h-screen z-0 ${styles.right}`}></div>
      <AnimatePresence mode="wait">
        <motion.div
          key={animate}
          initial={{}}
          exit={{ width: "100%" }}
          transition={{ duration: 1, delay: 1 }}
          className={`${styles.left} w-2/3 h-screen flex flex-col justify-center z-10`}
        >
          <motion.p
            key={animate}
            exit={{ y: -1000, scale: 0, type: "tween" }}
            transition={{ duration: 1 }}
            className={`${styles.text} tracking-widest text-9xl font-black italic z-10`}
          >
            {isVisible && <p>SIEWKI</p>}
          </motion.p>

          <div className="w-full h-3/6 z-10"></div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute w-full h-full flex flex-row z-10">
        <div className="w-1/3 z-10"></div>
        <AnimatePresence mode="popLayout">
          <motion.div
            key={animate}
            exit={{ y: -1000, scale: 0, type: "tween" }}
            transition={{ duration: 1 }}
            className="w-2/3 flex justify-center items-center z-10"
          >
            {isVisible && <Logo onClick={handleLogoClick}></Logo>}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Root;
