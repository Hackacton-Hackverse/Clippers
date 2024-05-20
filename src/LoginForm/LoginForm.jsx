import {useEffect, useState} from 'react';
import { FaLock, FaUser } from "react-icons/fa6";
import { useNavigate, useLocation} from "react-router-dom";
import './LoginForm.css'
import axiosInstance, {verifytoken} from "../axios.js";

// eslint-disable-next-line react/prop-types
function LoginForm({setIsAuthenticated, fetchConversations}) {
    const navigate = useNavigate();
    const location = useLocation();
    // const [searchParams] = useSearchParams();
    // const redirectUrl = searchParams.get('redirect') || '/';
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    useEffect(() => {
        const redirectUrl = location.state?.from?.pathname || '/';
        verifytoken({setIsAuthenticated,fetchConversations,navigate},redirectUrl)
    }, [fetchConversations, location.state?.from?.pathname, navigate, setIsAuthenticated]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

    };

    const handleClick = async (e) => {
        e.preventDefault();
        const { email, password } = formData;
        let loginurl = '/login';

        let data = {
            email: email,
            password: password
        };

        try {
            const response = await axiosInstance.post(loginurl, data);

            if (response.status === 200) {
                // Connexion réussie
                setIsAuthenticated(true)
                localStorage.setItem('token', response.data.access_token);
                const redirectUrl = location.state?.from?.pathname || '/';
                navigate(redirectUrl, { replace: true });
            } else {
                alert("Une erreur s'est produite lors de la connexion.");
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                // Authentification échouée
                alert('Échec de la connexion : Identifiants incorrects');
            } else {
                // Autre erreur
                alert("Une erreur s'est produite lors de la connexion. Veuillez réessayer.");
            }
        }
    };

    return (
        <div className="container-login">
        <div className="wrapper">
            <form>
                <h1>Login</h1>
                <div className="input-box">
                    <input
                        type='text'
                        name='email'
                        placeholder='email'
                        required
                        value = {formData.email}
                        onChange={handleChange}
                    />
                    <FaUser className="icon"/>
                </div>
                <div className="input-box">
                    <input
                        type='password'
                        name='password'
                        placeholder='password'
                        required
                        value= {formData.password}
                        onChange={handleChange}
                    />
                    <FaLock className="icon"/>
                </div>

                <div className="footer-login-register">
                <button type="submit" onClick={handleClick} >Login</button>

                <div className="register-link">
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    <p>Don't have an account? <a href="/register">Register</a></p>
                </div>
                </div>
            </form>
        </div>
        </div>
    )
}


export default LoginForm