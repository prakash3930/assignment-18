import RightSection from "../components/Home/RightSection";
import style from "../assets/css/HomeSectin css/HomePage.module.css"
import LeftSection from '../components/Home/LeftSection';





const HomePage = () => {
    return (
        <div className="container">
             <div className={style.left}><LeftSection></LeftSection></div>
             <div  className={style.right}><RightSection/></div> 
        </div>
    );
};

export default HomePage;