import './Navbar.css'
import {CgLogIn, CgProfile} from "react-icons/cg";
import {SlHome} from "react-icons/sl";
import { IoMdChatbubbles } from "react-icons/io";
import {TiBusinessCard} from "react-icons/ti";
import {IoMenuSharp} from "react-icons/io5";
import { NavLink } from 'react-router-dom';
import {useState} from "react";
import {MdWork} from "react-icons/md";
import { IoAddCircle } from "react-icons/io5";




function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = ()=> setIsOpen(!isOpen)


    return (
        <>
            <nav className="navbar" style={{ width: isOpen ? "300px" : "70px" }}>
                <div className="logonomsite">
                    <span style={{ display: isOpen ? "flex" : "none" }}><img src="/clippers.svg" className="logosite"/></span>
                    <div className="menu-button" onClick={toggle} style={{ transform: isOpen ? "rotate(90deg)" : "rotate(180deg)" }}><IoMenuSharp className="menu-icon"/></div>
                </div>
                {/*<div className="menu-btn" onClick={toggleMenu}>*/}
                {/*    <span></span>*/}
                {/*    <span></span>*/}
                {/*    <span></span>*/}
                {/*</div>*/}
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
                    </ul>
                </div>
                {/*<div className="profile-manage">*/}
                {/*    <button className="account profile">*/}
                {/*        <CgProfile className="icon"/>*/}
                {/*    </button>*/}
                {/*    <button className="account logout">*/}
                {/*        <CgLogIn className="icon"/>*/}
                {/*    </button>*/}
                {/*</div>*/}
            </nav>
        </>
    );
}

export default Navbar;