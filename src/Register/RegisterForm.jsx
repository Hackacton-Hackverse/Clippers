import { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import axios from "axios";
import Cookies from 'js-cookie';
import './RegisterForm.css';

function RegisterForm({setIsAuthenticated}) {
    const navigate = useNavigate();
    const location = useLocation();
    const [formdata, setFormdata] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormdata({ ...formdata, [name]: value });
    };

    const handleClick = async (e) => {
        e.preventDefault();
        const { username, email, password } = formdata;
        let registerurl = 'http://127.0.0.1:8000/api/register';
        let data = {
            name: username,
            email: email,
            password: password,
            password_confirmation: password
        };

        try {
            const response = await axios.post(registerurl, data);

            if (response.status === 201) {
                // Enregistrement réussi
                setIsAuthenticated(true)
                localStorage.setItem('token', response.data.access_token);
                const redirectUrl = location.state?.from?.pathname || '/';
                navigate(redirectUrl, { replace: true });
            } else {
                alert("Une erreur s'est produite lors de l'enregistrement.");
            }
        } catch (error) {
            if (error.response && error.response.status === 409) {
                // Conflit (utilisateur existant)
                alert("Échec de l'enregistrement : Utilisateur existant");
            } else {
                // Autre erreur
                alert("Une erreur s'est produite lors de l'enregistrement. Veuillez réessayer.");
            }
        }
    };

    return (
        <div className="container-login">
    <div className="wrapper">
        <form method='' action="">
            <h1>Register</h1>
            <div className="input-box">
                <input
                    type='text'
                    name='username'
                    placeholder='username'
                    required
                    value = {formdata.username}
                    onChange={handleChange}
                />
            </div>
            <div className="input-box">
                <input
                    type='email'
                    name='email'
                    placeholder='email'
                    required
                    value = {formdata.email}
                    onChange={handleChange}

                />
            </div>
            <div className="input-box">
                <input
                    type='password'
                    name='password'
                    placeholder='password'
                    required
                    value={formdata.password}
                    onChange={handleChange}
                />
            </div>

            <div className="footer-login-register">

            <button type="submit" onClick={handleClick}>Register</button>

            <div className="register-link">
                <p>Already have an account? <a href="/login">Login</a></p>
            </div>
            </div>
        </form>
    </div>
        </div>
    )
}

export default RegisterForm