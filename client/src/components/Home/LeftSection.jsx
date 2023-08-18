import style from "../../assets/css/HomeSectin css/LeftSection.module.css"
import { AiFillGithub } from "react-icons/ai"
import { BsFacebook } from "react-icons/bs"
import { BiSolidMessageAltDetail } from "react-icons/bi"
import {  motion } from 'framer-motion';


const LeftSection = () => {
    return (
        <div className={style.left}>
                <div className={style.one}>
                    <h1>cobra.com</h1>
                    <h3>Minimal and Clean Blog</h3>
                    <h3>cobra Theme</h3>
                    <hr/>
                </div>
                <div className={style.two}>
                    <motion.a target="_black" title="Github" href="https://github.com/prakash3930" whileHover={{ scale: 1.2 }} transition={{ type: "spring", stiffness: 2000, damping: 17 }}><AiFillGithub/></motion.a>
                    <motion.a target="_black" title="Facebook" href="https://www.facebook.com/prokash.sarkerr" whileHover={{ scale: 1.2 }} transition={{ type: "spring", stiffness: 2000, damping: 17 }}><BsFacebook/></motion.a>
                    <motion.a target="_black" title="What's App" href="https://web.whatsapp.com/" whileHover={{ scale: 1.2 }} transition={{ type: "spring", stiffness: 2000, damping: 17 }}><BiSolidMessageAltDetail/></motion.a>
                </div>
                <div className={style.there}>
                        <h3>@2023 cobra</h3>
                </div>
        </div>
    );
};

export default LeftSection;