import React from 'react';
import './ListDisc.css'
function TemplateSingle(props) {
    const messages = [
        { content: "Salut", isSent: true, profilePicture: "pexels-moh-adbelghaffar-771742.jpg" },
        { content: "Salut c'est comment?", isSent: false, profilePicture: "pexels-moh-adbelghaffar-771742.jpg" },
        { content: "je vais bien et toi?", isSent: true, profilePicture: "pexels-moh-adbelghaffar-771742.jpg" },
        { content: "je vais bien merci", isSent: false, profilePicture: "pexels-moh-adbelghaffar-771742.jpg" },
        { content: "et le hackaton?", isSent: true, profilePicture: "pexels-moh-adbelghaffar-771742.jpg" },
        { content: "Lourd", isSent: false, profilePicture: "pexels-moh-adbelghaffar-771742.jpg" },
        { content: "Salut", isSent: true, profilePicture: "pexels-moh-adbelghaffar-771742.jpg" },
        { content: "Salut c'est comment?", isSent: false, profilePicture: "pexels-moh-adbelghaffar-771742.jpg" },
        { content: "je vais bien et toi?", isSent: true, profilePicture: "pexels-moh-adbelghaffar-771742.jpg" },
        { content: "je vais bien merci", isSent: false, profilePicture: "pexels-moh-adbelghaffar-771742.jpg" },
        { content: "et le hackaton?", isSent: true, profilePicture: "pexels-moh-adbelghaffar-771742.jpg" },
        { content: "Lourd", isSent: false, profilePicture: "pexels-moh-adbelghaffar-771742.jpg" },
        { content: "Salut", isSent: true, profilePicture: "pexels-moh-adbelghaffar-771742.jpg" },
        { content: "Salut c'est comment?", isSent: false, profilePicture: "pexels-moh-adbelghaffar-771742.jpg" },
        { content: "je vais bien et toi?", isSent: true, profilePicture: "pexels-moh-adbelghaffar-771742.jpg" },
        { content: "je vais bien merci", isSent: false, profilePicture: "pexels-moh-adbelghaffar-771742.jpg" },
        { content: "et le hackaton?", isSent: true, profilePicture: "pexels-moh-adbelghaffar-771742.jpg" },
        { content: "Lourd", isSent: false, profilePicture: "pexels-moh-adbelghaffar-771742.jpg" },
        { content: "Salut", isSent: true, profilePicture: "pexels-moh-adbelghaffar-771742.jpg" },
        { content: "Salut c'est comment?", isSent: false, profilePicture: "pexels-moh-adbelghaffar-771742.jpg" },
        { content: "je vais bien et toi?", isSent: true, profilePicture: "pexels-moh-adbelghaffar-771742.jpg" },
        { content: "je vais bien merci", isSent: false, profilePicture: "pexels-moh-adbelghaffar-771742.jpg" },
        { content: "et le hackaton?", isSent: true, profilePicture: "pexels-moh-adbelghaffar-771742.jpg" },
        { content: "Lourd", isSent: false, profilePicture: "pexels-moh-adbelghaffar-771742.jpg" }
    ];

    const setDiscussion = () => {
        const activediscussion = document.getElementsByClassName("discussion")
        activediscussion[0].style.display = "block"
        props.setSelectedMessages(messages);
        props.handleClick(props.index, "/pexels-moh-adbelghaffar-771742.jpg", "shadow");
    }

    return (
        <div className={`templateSingle ${props.isSelected ? 'selected' : ''}`} onClick={setDiscussion}>
            <div className="container-photo-profile">
                <img src='/pexels-moh-adbelghaffar-771742.jpg' className="photo-profile"/>
            </div>
            <div className='disc-info'>
                <div className="name-destinataire">
                    {props.name}
                </div>
                <div className="last-message">
                    {props.lastmessage}
                </div>
            </div>
        </div>
    );
}

export default TemplateSingle;