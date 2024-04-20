import './App.css'
import {useEffect} from "react";
import Navbar from "./Navbar/Navbar.jsx";
import Accueil from "./Accueil/Accueil.jsx";
import Cv from "./CV/Cv.jsx";
import Offres from "./Offres/Offres.jsx";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import LoginForm from "./LoginForm/LoginForm.jsx";
import RegisterForm from "./Register/RegisterForm.jsx";

function App() {
        useEffect(() => {
            document.title = 'Get a Job'; // Mettez ici le titre que vous souhaitezoppins, serif
        }, []);
        return (
            <>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Navigate to="/home" replace/> }/>
                        <Route path="/home" about element={<Accueil />}/>
                        <Route path="/Offre" about element={<Offres />}/>
                        <Route path="/cv" about element = {<Cv />}/>
                        <Route path="/login" about element = {<LoginForm />}/>
                        <Route path="/register" about element = {<RegisterForm />}/>
                    </Routes>
                </BrowserRouter>
            </>
        )
}

export default App
