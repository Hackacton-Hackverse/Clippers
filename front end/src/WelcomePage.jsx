import {useNavigate} from "react-router-dom";


function WelcomePage() {
    const navigate = useNavigate()
   navigate('/Login')
}

export default WelcomePage