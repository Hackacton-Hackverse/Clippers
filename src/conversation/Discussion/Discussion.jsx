import React, {useState} from 'react';
import { SentMessage, ReceivedMessage } from "./Message.jsx";
import './Discussion.css'
import { IoSend } from "react-icons/io5";
import {FcPrevious} from "react-icons/fc";
import { IoIosArrowBack } from "react-icons/io";
import axiosInstance from "../../axios.js";


function Discussion(props) {
    const [sentMessage, setSentMessage] = useState({
        message : '',
        receiver_id : props.receiver_id,
        conversation_id : props.conversation_id
    })

    const handleClick = async (e) => {
        e.preventDefault()
        if(!sentMessage.message || !sentMessage.receiver_id){
            alert("you mustn't sent an empty message")
        }else {
            const formdata = new FormData();
            formdata.append('message', sentMessage.message);
            formdata.append('receiver_id',sentMessage.receiver_id);
            formdata.append('conversation_id',sentMessage.conversation_id);

            const response = await axiosInstance.post('/message',formdata);
            if(response.status !== 201) {
                alert('your message was not sent');
            } else {
                setSentMessage({
                    ...sentMessage, [me]:null
                })
            }
        }
    }
    const handleChange = (e) => {
        const {name, value} = e.target
        setSentMessage({
            ...sentMessage, [name]:value
        })
    }

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
                             <ReceivedMessage key={index} content={message.content} profilePicture={message.profilePicture ?? "/pexels-moh-adbelghaffar-771742.jpg"}/>
                            :<SentMessage key={index} content={message.content} profilePicture={message.profilePicture ?? "/pexels-moh-adbelghaffar-771742.jpg"}/>


                    ))}
                </div>
            </div>
            <footer className="footer-discussion">
                <input
                    type='text'
                    name='message'
                    placeholder='votre mesage'
                    required
                    value={sentMessage.message}
                    onChange={handleChange}
                    className="input-message"
                />
                <div onClick={handleClick}>
                    <IoSend className="send-icon"/>
                </div>
            </footer>
        </div>
    );
}

export default Discussion;