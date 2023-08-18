import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket, faCaretLeft, faIdBadge } from '@fortawesome/free-solid-svg-icons'
import { motion } from 'framer-motion';
import style from "../assets/css/Demo.module.css";
import img from "../assets/img/profile.svg";
import { useState } from 'react';

const Demo = () => {

  const [isOpen, setIsOpen] = useState(false);

  return (

    <div className={style.kire}>
     
     <motion.nav animate={isOpen ? "open" : "closed"}>
      <motion.button whileHover={{ scale: 1.2 }}whileTap={{ scale: 0.8 }}transition={{ type: "spring", stiffness: 2000, damping: 17 }}onClick={() => setIsOpen(!isOpen)} className={style.button}>
          <motion.img src={img}></motion.img>
          <FontAwesomeIcon icon={faCaretLeft} bounce size="2xl" />
      </motion.button>

      <motion.ul className={style.div}
        variants={{
          open: {
            clipPath: "inset(0% 0% 0% 0% round 10px)",
            transition: {
              type: "spring",
              bounce: 0,
              duration: 0.7,
              delayChildren: 0.3,
              staggerChildren: 0.05
            }
          },
          closed: {
            clipPath: "inset(10% 50% 90% 50% round 10px)",
            transition: {
              type: "spring",
              bounce: 0,
              duration: 0.3
            }
          }
        }}
        style={{ pointerEvents: isOpen ? "auto" : "none" }}
      >
        <motion.button whileHover={{ scale: 1.2 }}whileTap={{ scale: 0.8 }}transition={{ type: "spring", stiffness: 2000, damping: 17 }}>Profile<FontAwesomeIcon className={style.FontAwesomeIcon} icon={faIdBadge} beat size="lg" /></motion.button>
        <motion.button whileHover={{ scale: 1.2 }}whileTap={{ scale: 0.8 }}transition={{ type: "spring", stiffness: 2000, damping: 17 }}>Logout<FontAwesomeIcon className={style.FontAwesomeIcon} icon={faArrowRightFromBracket} shake size="lg" /></motion.button>
        
      </motion.ul>
    </motion.nav>
        
    </div>
  );
};

export default Demo;