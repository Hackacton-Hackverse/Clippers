import TemplateSingle from "./TemplateSingle.jsx";
import './ListDisc.css';
import { FaUserCircle } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { useEffect } from "react";


function ListDisc(props) {
    const a = props.messages;

    useEffect(() => {
        console.log("a",a[0].conversation_id);
    }, [a]);


    const handleClick = (index, profilePicture, name) => {
        console.log(a.destinataireId)
        props.setSelectedIndex(index);
        props.setSelectedProfilePicture(profilePicture);
        props.setSelectedName(name);
        props.setReceiver_id(a[index].destinataireId);
        props.setConversation_id(a[index].conversation_id)
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
                {a.map((i,message) => (
                    <div key={message}>
                        <TemplateSingle
                            index={message}
                            isSelected={i === props.selectedIndex}
                            setSelectedMessages={props.setSelectedMessages}
                            handleClick={handleClick}
                            name = {a[message].destinataire}
                            lastmessage = {a[message].messages.length >0 ? a[message].messages[a[message].messages.length-1].content : "nothing"}
                            messages = {a[message].messages}
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