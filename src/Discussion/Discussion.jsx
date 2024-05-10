import React from 'react';
import { SentMessage, ReceivedMessage } from "./Message.jsx";
import './Discussion.css'
import { IoSend } from "react-icons/io5";
import {FcPrevious} from "react-icons/fc";
import { IoIosArrowBack } from "react-icons/io";


function Discussion(props) {
    return (
        <div className="discussion-container">
            <header className="header-discussion">
                <div className="back-icon-container" onClick={props.exitdiscussion}>
                    <IoIosArrowBack  className="back-icon"/>
                </div>
                <div className="header-image">
                    <img src={props.profilePicture} alt="Profile"/>
                </div>
                <div className="header-name">{props.name}</div>
            </header>
            <div className="discussion-content">
                <div>
                    {props.messages && props.messages.map((message, index) => (
                        message.isSent
                            ?
                            <SentMessage key={index} content={message.content} profilePicture={message.profilePicture}/>
                            : <ReceivedMessage key={index} content={message.content}
                                               profilePicture={message.profilePicture}/>
                    ))}
                </div>
            </div>
            <footer className="footer-discussion">
                <input className="input-message"/>
                <div>
                    <IoSend className="send-icon"/>
                </div>
            </footer>
        </div>
    );
}

export default Discussion;