import React from 'react';
import axios from "axios";

function Login() {
    let response = axios.post("localhost:8000/api/login");
    return (
        {response}
    );
}

export default Login;

