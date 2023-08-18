// https://mat6tube.com/watch/-115913711_456239138
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginSection from './components/Home/LoginSection';
import TopSection from './components/Home/TopSection';
import RegistrationSection from './components/Home/RegistrationSection';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";

const App = () => {

  const [visial,setVisial] = useState(false);

  return (
   
   <BrowserRouter>
        <TopSection value={visial}/>
        <ToastContainer position="top-left" autoClose={2000} limit={3} hideProgressBar={false} newestOnTop={false}closeOnClickrtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark"/>
        <Routes>
            <Route path="/" element={<HomePage></HomePage>}></Route>
            <Route path="/login" element={<LoginSection value={setVisial}></LoginSection>} ></Route>
            <Route path="/register" element={<RegistrationSection></RegistrationSection>}></Route>
        </Routes>
   </BrowserRouter>
  );
};

export default App;