import './App.css'
import {useEffect, useState} from "react";
import Navbar from "./Navbar/Navbar.jsx";
import Accueil from "./Accueil/Accueil.jsx";
import Cv from "./CV/Cv.jsx";
import Offres from "./Offres/Offres.jsx";
import {Navigate, Route, Routes} from "react-router-dom";
import LoginForm from "./LoginForm/LoginForm.jsx";
import RegisterForm from "./Register/RegisterForm.jsx";
import Conversation from "./conversation/Conversation.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import Addjob from './AddJob/Addjob.jsx'
import axiosInstance from './axios';


function App() {
    
    const [isAuthenticated, setIsAuthenticated] = useState(false );
    const [messages, setMessages] = useState([]);
    const [conversations, setConversations] = useState([])

    const fetchConversations = () => {
            setInterval(() => {
                if(isAuthenticated) {
                    axiosInstance.get(`/conversation`)
                        .then(function (response) {
                            setMessages(response.data[0]?.messages || []);
                            setConversations(response.data);
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }
            }, 1000);
    };

        useEffect(() => {
            const token = localStorage.getItem('token');
            if (token) {
                console.log(token)
                axiosInstance.get('/token/verify')
                    .then(response => {
                        if (response.status === 200) {
                            console.log('good',response,isAuthenticated)
                            setIsAuthenticated(true);
                        }else {
                            console.log('errorrrrr',response)
                            setIsAuthenticated(false);
                            localStorage.removeItem('token'); // Supprimer le token invalide du localStorage
                        }
                    })
                    .catch(error => {
                        console.error('Token invalide :', error);
                    });
            } else {
                setIsAuthenticated(false);
            }
        }, [isAuthenticated]);

    useEffect(() => {
        document.title = 'Pipo-app';
        if(isAuthenticated){
            fetchConversations();
        }
    }, [fetchConversations, isAuthenticated]);


    return (
        <>
            <div>
                <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>
            </div>
            <div className="route-container">
                <div>
                    <Routes>
                        <Route path="/" element={<Accueil/>}/>
                        <Route
                            path="/Offre"
                            element={
                                <ProtectedRoute isAuthenticated={isAuthenticated}>
                                    <Offres/>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/cv"
                            element={
                                <ProtectedRoute isAuthenticated={isAuthenticated}>
                                    <Cv/>
                                </ProtectedRoute>
                            }
                        />
                        <Route path="/login" element={<LoginForm setIsAuthenticated={setIsAuthenticated } fetchConversations={fetchConversations}/>}/>
                        <Route path="/register" element={<RegisterForm setIsAuthenticated={setIsAuthenticated} fetchConversations={fetchConversations}/>}/>
                        <Route
                            path="/conversation"
                            element={
                                <ProtectedRoute isAuthenticated={isAuthenticated}>
                                    <Conversation conversations ={conversations} />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/offer/new"
                            element={
                                <ProtectedRoute isAuthenticated={isAuthenticated}>
                                    <Addjob />
                                </ProtectedRoute>
                            }
                        />
                        <Route path="/*" element={<Navigate to="/" replace/>}/>
                    </Routes>
                </div>
            </div>
        </>
    )
}
export default App
