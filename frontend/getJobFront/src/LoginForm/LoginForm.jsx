import {useState} from 'react'
import "./LoginForm.css"
import {FaLock, FaUser} from "react-icons/fa6";
import {useNavigate} from "react-router-dom";
import axios from "axios";
// eslint-disable-next-line react/prop-types
function LoginForm  ({onLogin})  {
    const navigate = useNavigate()
    const [formdata, setFormdata] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        const {name, value} = e.target
        setFormdata({
            ...formdata, [name]:value
        })
    }

    const handleClick = async (e) => {
        e.preventDefault();
        //recuperer l'adresse mail au cas ou le username est correct et l'envoyer dans le front
        const {email, password} = formdata
        let loginurl = 'http://127.0.0.1:8000/api/user/login'

        let data = {
            email: email,
            password: password
        };

        try {
            //ici on verifie que le user entrer est bien dans la base de donne
            const response = await axios.post(loginurl,data);
            if (response.data.message === 'Login successful'){
                const username = response.data.name;
                onLogin(username, email);
                navigate(`/home/${username}`)
            }
        }catch (error){
            alert("something was happened retry");
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
                        value = {formdata.email}
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
                        value= {formdata.password}
                        onChange={handleChange}
                    />
                    <FaLock className="icon"/>
                </div>

                <div className="footer-login-register">
                <button type="submit" onClick={handleClick} >Login</button>

                <div className="register-link">
                    <p>Don't have an account? <a href="/register">Register</a></p>
                </div>
                </div>
            </form>
        </div>
        </div>
    )
}


export default LoginForm