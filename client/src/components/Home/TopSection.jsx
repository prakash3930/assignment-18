/* eslint-disable react/prop-types */
import { useState } from "react";
import style from "../../assets/css/HomeSectin css/TopSection.module.css"
import img from "../../assets/img/titileIcon.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightToBracket,faMagnifyingGlass,faXmark } from '@fortawesome/free-solid-svg-icons'
import { AnimatePresence, motion } from 'framer-motion';
import {Link} from "react-router-dom";
import ProfileSection from "./ProfileSection";



const TopSection = ({value}) => {
    const [selectedId ,setSelectedId] = useState(null);
    const items = [{ id: 1}];
    return (
       <div className="container">
         <div className={style.main_div}>
                <div className={style.one}>
                    <Link to="/"><motion.img whileHover={{ scale: 1.2 }}whileTap={{ scale: 0.8 }}transition={{ type: "spring", stiffness: 2000, damping: 17 }} src={img}></motion.img></Link>
                </div>

                <div className={style.two}>
                {items.map(item => (
                      <motion.div className={style.conentt} key={item.id} layoutId={item.id} onClick={() => setSelectedId(item.id)}>
                                <FontAwesomeIcon icon={faMagnifyingGlass} size="xl" spin />   
                                <input type="text" disabled={true} placeholder="Serarch"/>
                      </motion.div>
                ))}

              <div className={style.div}>
                  <AnimatePresence>
                      {selectedId && (
                         <motion.div className={style.animat} layoutId={selectedId} transition={{ type: "spring", stiffness: 2000, damping: 17 }}>
                                <FontAwesomeIcon icon={faMagnifyingGlass} size="xl" spin />   
                                <input type="search" placeholder="Serarch" autoFocus/>
                          <motion.button onClick={() => setSelectedId(null)}> <FontAwesomeIcon icon={faXmark} bounce size="xl" /></motion.button>
                         </motion.div>
                      )}
                 </AnimatePresence>
              </div>
              </div>

                <div className={style.there}>
                 {value ? <ProfileSection></ProfileSection>:
                  <Link to="/login"><motion.button whileHover={{ scale: 1.2 }}whileTap={{ scale: 0.8 }}transition={{ type: "spring", stiffness: 2000, damping: 17 }}>Login<FontAwesomeIcon className={style.FontAwesomeIcon} icon={faArrowRightToBracket} bounce /></motion.button></Link>
                 }
                </div>
        </div>
       </div>
    );
};

export default TopSection;