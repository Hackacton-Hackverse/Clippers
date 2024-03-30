import {useState} from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function RegisterForm ({onLogin}) {
    const navigate = useNavigate()
    const [formdata, setFormdata] = useState({
        username: '',
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
        const {username, email, password} = formdata;
        let registerurl = 'http://127.0.0.1:8000/api/user/register';
        let data = {
            name: username,
            email: email,
            password: password
        };
        try {
            const response = await axios.post(registerurl, data);

            // Vérifier la réponse
            if (response.data.status === 200) {
                // Si l'enregistrement est réussi, afficher un message de succès
                alert("you have been sucefull register to edit your profiles go in account settings")
                onLogin(username, email);
                navigate(`/home/${username}`)
            } else if(response.data.status === 409){
                // Gérer l'échec de l'enregistrement
                alert('Registration failed: User already exist');
            }else {
                //en cas d'erreur inconnu
                alert("someting was happened retry register")
            }
        } catch (error) {
            // Gérer les erreurs de la requête
            alert(error);
        }
        //ici on met les actions de type verification d'email et etc (voir si on peut ajouter l'user)

    };

    return (
    <div className="wrapper">
        <form method='' action="">
            <h1>Register</h1>
            <div className="input-box">
                <span>Enter your name</span>
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
                <span>Enter your e-mail</span>
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
                <span>Enter your Password</span>
                <input
                    type='password'
                    name='password'
                    placeholder='password'
                    required
                    value={formdata.password}
                    onChange={handleChange}
                />
            </div>

            <button type="submit" onClick={handleClick}>Register</button>

            <div className="register-link">
                <p>Already have an account? <a href="/login">Login</a></p>
            </div>
        </form>
    </div>
    )
}

export default RegisterForm