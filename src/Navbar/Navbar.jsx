import './Navbar.css'
import {CgLogIn, CgProfile} from "react-icons/cg";
import {SlHome} from "react-icons/sl";
import { IoMdChatbubbles } from "react-icons/io";
import {TiBusinessCard} from "react-icons/ti";
import {IoMenuSharp} from "react-icons/io5";
import {NavLink, useNavigate} from 'react-router-dom';
import {useEffect, useState} from "react";
import {MdDashboardCustomize, MdWork} from "react-icons/md";
import { IoAddCircle } from "react-icons/io5";
import {CiLogout} from "react-icons/ci";
import axiosInstance from "../axios.js";



// eslint-disable-next-line react/prop-types
function Navbar({setIsAuthenticated,isAuthenticated}) {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = ()=> setIsOpen(!isOpen)
    const navigate = useNavigate()

    const logOut = () => {
        if(isAuthenticated){
            axiosInstance.post('/logout')
                .then(response => {
                    setIsAuthenticated(false);
                    localStorage.removeItem('token')
                    alert("vous etes actuellement deconnecte")
                    navigate('/cv',{replace:true})
                })
                .catch(error => {
                    console.error(error);
                })
        }
    }

    useEffect(() => {

    }, []);


    return (
        <>
            <nav id="navbar" style={{ width: isOpen ? "300px" : "70px" }}>
                <div className="logoMonSite">
                    <span style={{ display: isOpen ? "flex" : "none" }}><img src="/clippers.svg" className="logoSite"/></span>
                    <div className="menu-button" onClick={toggle} style={{ transform: isOpen ? "rotate(90deg)" : "rotate(180deg)" }}><IoMenuSharp className="menu-icon"/></div>
                </div>
                <div className="nav-item">
                    <ul>
                        <li className="nav-link">
                            <NavLink to="/" className={`nav-link-item ${({isActive}) => (isActive ? 'active' : '')}`}>
                                <div className="navbar-icon"><SlHome/></div>
                                <div style={{display: isOpen ? "block" : "none"}}>Accueil</div>
                            </NavLink>
                        </li>
                        <li className="nav-link">
                            <NavLink to="/offre"
                                     className={`nav-link-item ${({isActive}) => (isActive ? 'active' : '')}`}>
                                <div className="navbar-icon"><MdWork/></div>
                                <div style={{display: isOpen ? "block" : "none"}}>Offres</div>
                            </NavLink>
                        </li>
                        <li className="nav-link">
                            <NavLink to="/cv" className={`nav-link-item ${({isActive}) => (isActive ? 'active' : '')}`}>
                                <div className="navbar-icon"><TiBusinessCard/></div>
                                <div style={{display: isOpen ? "block" : "none"}}>votre CV</div>
                            </NavLink>
                        </li>
                        <li className="nav-link">
                            <NavLink to="/conversation"
                                     className={`nav-link-item ${({isActive}) => (isActive ? 'active' : '')}`}>
                                <div className="navbar-icon"><IoMdChatbubbles/></div>
                                <div style={{display: isOpen ? "block" : "none"}}>message</div>
                            </NavLink>
                        </li>
                        <li className="nav-link">
                            <NavLink to="/offer/new"
                                     className={`nav-link-item ${({isActive}) => (isActive ? 'active' : '')}`}>
                                <div className="navbar-icon"><IoAddCircle/></div>
                                <div style={{display: isOpen ? "block" : "none"}}>create-job</div>
                            </NavLink>
                        </li>
                        <li className="nav-link">
                            <NavLink to="/manage-offer"
                                     className={`nav-link-item ${({isActive}) => (isActive ? 'active' : '')}`}>
                                <div className="navbar-icon"><MdDashboardCustomize/></div>
                                <div style={{display: isOpen ? "block" : "none"}}>manage job</div>
                            </NavLink>
                        </li>

                        {isAuthenticated === true
                            ?
                            <li className="nav-link" onClick={logOut}>
                                <div className="navbar-icon"><CiLogout/></div>
                                <div style={{display: isOpen ? "block" : "none"}}>log-out</div>
                            </li>
                            :
                            <li className="nav-link">
                                <NavLink to="/login"
                                         className={`nav-link-item ${({isActive}) => (isActive ? 'active' : '')}`}>
                                    <div className="navbar-icon"><CgLogIn/></div>
                                    <div style={{display: isOpen ? "block" : "none"}}>log-in</div>
                                </NavLink>
                            </li>
                        }
                    </ul>
                </div>
            </nav>
        </>
    );
}

export default Navbar;