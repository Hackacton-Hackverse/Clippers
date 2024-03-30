import Home from "./Home/Home.jsx";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import LoginForm from "./LoginForm/LoginForm.jsx";
import RegisterForm from "./Register/RegisterForm.jsx";
import {useState} from "react";
import ProtectedRoute from "./ProtectedRoute.jsx";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userInfo, setUserInfo] = useState({})

    const handleLogin = (username, email) =>{
        setIsAuthenticated(true);
        setUserInfo({username, email})
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setUserInfo({});
    };

  return (
    <div className="container">
        {<BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace/>}/>
                <Route path="/Login" about element={<LoginForm onLogin={handleLogin}/>}/>
                <Route path="/register" about element={<RegisterForm onLogin={handleLogin}/>}/>
                <Route
                    path="/Home/:username"
                    about element={
                    <ProtectedRoute isAuthenticated={isAuthenticated}>
                        <Home userInfo={userInfo} onLogout={handleLogout}/>
                    </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>}
    </div>
  )
}

export default App;
