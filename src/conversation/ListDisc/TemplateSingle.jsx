import React from 'react';
import './ListDisc.css'
import { useEffect } from 'react';
function TemplateSingle(props) {
    const messages = props.messages;

    useEffect(() => {
        
        console.log('messages', messages);
    }, []);
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