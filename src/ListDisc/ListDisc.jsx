import TemplateSingle from "./TemplateSingle.jsx";
import './ListDisc.css';
import { FaUserCircle } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";


function ListDisc(props) {
    const a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

    const handleClick = (index, profilePicture, name) => {
        props.setSelectedIndex(index);
        props.setSelectedProfilePicture(profilePicture);
        props.setSelectedName(name);
        // Ajoutez ici la logique pour passer les messages à setSelectedMessages
    };

    return (
        <div>
            <header className="type-chat">
                {props.activeSection === 'personnel' ? (
                    <>
                        <FaUserCircle className="type-chat-icon" />
                        PERSONNELS
                    </>
                ) : (
                    <>
                        <FaUserGroup className="type-chat-icon" />
                        GROUPES
                    </>
                )}
            </header>
            <div className="container-list-chat">
                {a.map((i) => (
                    <div key={i}>
                        <TemplateSingle
                            index={i}
                            isSelected={i === props.selectedIndex}
                            setSelectedMessages={props.setSelectedMessages}
                            handleClick={handleClick}
                            name = "shadow"
                            lastmessage = "lourd"
                        />
                        <div className="end-contact">
                            <hr className="separation-contact" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ListDisc;