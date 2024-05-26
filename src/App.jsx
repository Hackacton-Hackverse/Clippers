import './App.css';
import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar/Navbar.jsx";
import Accueil from "./Accueil/Accueil.jsx";
import Cv from "./CV/Cv.jsx";
import Offres from "./Offres/Offres.jsx";
import LoginForm from "./LoginForm/LoginForm.jsx";
import RegisterForm from "./Register/RegisterForm.jsx";
import Conversation from "./conversation/Conversation.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import Addjob from './AddJob/Addjob.jsx';
import axiosInstance from './axios';
import Managajob from "./manage-job/Managajob.jsx";
import EnhancedTable from "./ManageCvs/ManageCvs.jsx";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axiosInstance.get('/token/verify')
                .then(response => {
                    if (response.status === 200) {
                        setIsAuthenticated(true);
                        setIsLoading(false);
                    } else {
                        setIsAuthenticated(false);
                        localStorage.removeItem('token');
                        setIsLoading(false);
                    }
                })
                .catch(error => {
                    console.error('Token invalide :', error);
                    localStorage.removeItem('token');
                    setIsLoading(false);
                });
        } else {
            setIsAuthenticated(false);
            setIsLoading(false);
        }
    }, []);


    if (isLoading) {
        return <div>loading ....</div>;
    }

    return (
        <>
            <div>
                <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
            </div>
            <div className="route-container">
                <div>
                    <Routes>
                        <Route path="/" element={<Accueil />} />
                        <Route
                            path="/Offre"
                            element={
                                <ProtectedRoute isAuthenticated={isAuthenticated}>
                                    <Offres />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/cv"
                            element={
                                <ProtectedRoute isAuthenticated={isAuthenticated}>
                                    <Cv />
                                </ProtectedRoute>
                            }
                        />
                        <Route path="/login" element={<LoginForm setIsAuthenticated={setIsAuthenticated} />} />
                        <Route path="/register" element={<RegisterForm setIsAuthenticated={setIsAuthenticated} />} />
                        <Route
                            path="/conversation"
                            element={
                                <ProtectedRoute isAuthenticated={isAuthenticated}>
                                    <Conversation isAuthenticated={isAuthenticated} />
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
                        <Route
                            path='manage-offer'
                            element={
                                <ProtectedRoute isAuthenticated={isAuthenticated}>
                                    <Managajob isAuthenticated={isAuthenticated}/>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="manage-cv"
                            element={
                                <EnhancedTable />
                            }
                        />
                        <Route path="/*" element={<Navigate to="/" replace />} />
                    </Routes>
                </div>
            </div>
        </>
    );
}

export default App;
