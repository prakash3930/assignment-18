import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser,faEnvelopeOpenText,faKey, faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons'
import { motion } from 'framer-motion';
import style from "../../assets/css/login/login.module.css";
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from "axios";
import {  toast } from 'react-toastify';



const RegistrationSection = () => {

  let navigate = useNavigate();

  const [valuee,setValue] = useState({
    name:"",
    email:"",
    password:""
 });


  const updateValue = (property,value)=>{
    setValue({...valuee,[property]:value});
  }
  const handleSubmit = async(e)=>{
         e.preventDefault();

    try {

      const url = "http://localhost:6500/api/v1";

      const {data} = await axios.post(`${url}/registration`,{name:valuee.name,email:valuee.email,password:valuee.password});

      if(data.status == "fail"){
        toast.error(<h2>{data.message}</h2>);
      }else{
        toast.success(<h2>Registration successful</h2>);
        navigate("/login")
      }

    } catch (err) {
      console.log(err.message);
      toast.error(<h2>Registration failed. Try again</h2>);
    }
  };

  return (
    <div className={style.kire}>
     
     <div className={style.form}>
          <h1>Registration</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name :</label>
          <motion.div className={style.conentt} whileHover={{ scale: 1.1 }}whileTap={{ scale: 0.9 }}transition={{ type: "spring", stiffness: 2000, damping: 20 }} >
              <div className={style.name}>
                  <FontAwesomeIcon icon={faUser} bounce size="2xl" />
                   <input onChange={(e)=>{updateValue('name',e.target.value)}} type="text"  id="name" placeholder="Inter Your Name" autoFocus autoComplete="off"/>
               </div>
          </motion.div>

          <label htmlFor="Email">Email :</label>
          <motion.div className={style.conentt} whileHover={{ scale: 1.1 }}whileTap={{ scale: 0.9 }}transition={{ type: "spring", stiffness: 2000, damping: 20 }} >
              <div className={style.name}>
                  <FontAwesomeIcon icon={faEnvelopeOpenText} bounce size="2xl" />
                   <input onChange={(e)=>{updateValue('email',e.target.value)}} type="email"  id="Email"  placeholder="Inter Your Email" autoComplete="off"/>
               </div>
          </motion.div>

          <label htmlFor="Password">Password :</label>
          <motion.div className={style.conentt} whileHover={{ scale: 1.1 }}whileTap={{ scale: 0.9 }}transition={{ type: "spring", stiffness: 2000, damping: 20 }} >
              <div className={style.name}>
                  <FontAwesomeIcon icon={faKey} bounce size="2xl" />
                  <input onChange={(e)=>{updateValue('password',e.target.value)}} type="password"  id="Password" placeholder="Inter Your Password"/>
               </div>
          </motion.div>

         <div className={style.one}>
            <motion.button whileHover={{ scale: 1.2 }}whileTap={{ scale: 0.8 }}transition={{ type: "spring", stiffness: 2000, damping: 17 }}>Submit<FontAwesomeIcon className={style.FontAwesomeIcon} icon={faArrowRightToBracket} bounce /></motion.button>
         </div>

        </form>
          <div className={style.border}></div>
        <h3 className={style.footer}>Already have an account <Link to="/login"><motion.button whileHover={{ scale: 1.2 }}whileTap={{ scale: 0.8 }}transition={{ type: "spring", stiffness: 2000, damping: 17 }}>signin</motion.button></Link></h3>
     </div>
        
    </div>
  );
};

export default RegistrationSection;