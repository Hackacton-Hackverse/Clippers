import { FaUserGroup } from "react-icons/fa6";
import './Navbar.css';
import { FaUserCircle } from "react-icons/fa";

function Navbar(props) {
    const handleSectionClick = (section) => {
        props.setActiveSection(section);
    };

    return (
        <div className="navbar-container">
            <div
                className={`nav-item ${props.activeSection === 'personnel' ? 'active' : ''}`}
                onClick={() => handleSectionClick('personnel')}
            >
                <span><FaUserCircle className="nav-icon" /></span>
                <span>Personnels</span>
            </div>
            <div
                className={`nav-item ${props.activeSection === 'groupe' ? 'active' : ''}`}
                onClick={() => handleSectionClick('groupe')}
            >
                <div><FaUserGroup className="nav-icon" /></div>
                <span>Groups</span>
            </div>
            <div className="nav-item"></div>
        </div>
    );
}

export default Navbar;