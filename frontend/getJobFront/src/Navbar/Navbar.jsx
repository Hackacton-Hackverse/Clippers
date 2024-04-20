import './Navbar.css'
import {CgLogIn, CgProfile} from "react-icons/cg";


function Navbar() {
    function toggleMenu() {
        const menu = document.querySelector('.nav-item')
        var menuBtn = document.querySelector('.menu-btn');
        menuBtn.style.display = 'flex'
        if (menuBtn.classList.contains('open')) {
            menu.style.transition = 'height 0.5s ease, z-index 0.5s ease';
            menu.style.height = '0'; // Réduire la hauteur du menu à 0 pour le cacher
        } else {
            menu.style.transition = 'height 0.5s ease, z-index 0.5s ease';
            menu.style.height = menu.scrollHeight + 'px'; // Régler la hauteur du menu à sa hauteur actuelle pour l'afficher
        }
        menuBtn.classList.toggle('open');

    }

    return (
        <>
            <nav className="navbar">
                <div className="logonomsite">
                    <span><img src="/clippers.png" className="logosite"/></span>
                    <span>GetJobsClippers</span>
                </div>
                <div className="menu-btn" onClick={toggleMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div className="nav-item" >
                    <ul>
                        <li className="nav-link"><a href="/home">Accueil</a> </li>
                        <li className="nav-link"><a href="/offre">Offres</a> </li>
                        <li className="nav-link"><a href="/cv">votre CV</a> </li>
                        <li className="nav-link hide">Profile</li>
                        <li className="nav-link hide">Logout</li>
                    </ul>
                </div>
                <div className="profile-manage">
                    <button className="account profile">
                        <CgProfile className="icon"/>
                    </button>
                    <button className="account logout">
                        <CgLogIn className="icon"/>
                    </button>
                </div>
            </nav>
        </>
    );
}

export default Navbar;