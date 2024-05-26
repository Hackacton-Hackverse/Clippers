import { useState, useEffect } from 'react';
import { SentMessage, ReceivedMessage } from "./Message.jsx";
import './Discussion.css'
import { IoSend } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";
import axiosInstance from "../../axios.js";

// eslint-disable-next-line react/prop-types
function Discussion({ receiver_id, conversation_id, profilePicture, name, messages, exitdiscussion }) {
    const [sentMessage, setSentMessage] = useState({
        message: '',
        receiver_id: null,
        conversation_id: null
    });

    const handleClick =  () => {
        if(sentMessage.message && sentMessage.receiver_id && sentMessage.conversation_id){
            const formdata = new FormData();
            formdata.append('message', sentMessage.message);
            formdata.append('receiver_id', sentMessage.receiver_id);
            formdata.append('conversation_id', sentMessage.conversation_id);

            axiosInstance.post('/message', sentMessage)
                .then(function (response) {
                    if (response.status !== 201) {
                        alert('your message was not sent');
                    } else {
                        setSentMessage({
                            message: '',
                            receiver_id: receiver_id,
                            conversation_id: conversation_id
                        });
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSentMessage({
            ...sentMessage, [name]: value
        });
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleClick(e);
            setSentMessage({ message: '' });
        }
    };

    useEffect(() => {
        // Mettre à jour receiver_id et conversation_id lorsqu'ils changent
        setSentMessage(prevState => ({
            ...prevState,
            receiver_id: receiver_id,
            conversation_id: conversation_id
        }));
    }, [receiver_id, conversation_id]);

    useEffect(() => {
        const input = document.querySelector('.input-message');
        input.addEventListener('keydown', handleKeyDown);

        return () => {
            input.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    return (
        <div className="discussion-container">
            <header className="header-discussion">
                <div className="back-icon-container" onClick={exitdiscussion}>
                    <IoIosArrowBack className="back-icon" />
                </div>
                <div className="header-image">
                    <img src={profilePicture} alt="Profile" />
                </div>
                <div className="header-name">{name}</div>
            </header>
            <div className="discussion-content">
                <div>
                    {messages && messages.map((message, index) => (
                        message.isSent
                            ?
                            <ReceivedMessage key={index} content={message.content} profilePicture={message.profilePicture ?? "/pexels-moh-adbelghaffar-771742.jpg"} />
                            : <SentMessage key={index} content={message.content} profilePicture={message.profilePicture ?? "/pexels-moh-adbelghaffar-771742.jpg"} />
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
                    onKeyDown={handleKeyDown}
                />
                <div onClick={handleClick}>
                    <IoSend className="send-icon" />
                </div>
            </footer>
        </div>
    );
}

export default Discussion;