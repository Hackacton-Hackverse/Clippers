import React from 'react';
import './Discussion.css'; // Fichier de styles CSS

// Composant pour un message envoyé
const SentMessage = ({ content, profilePicture }) => {
    return (
        <div className="message-sent">
            <div className="message-content">
                <p>{content}</p>
            </div>
            <div className="container-profile-picture">
                <img src={profilePicture} className="profile-picture" alt="Photo de profil" />
            </div>
        </div>
    );
};

// Composant pour un message reçu
const ReceivedMessage = ({ content, profilePicture }) => {
    return (
        <div className="message-received">
            <div className="container-profile-picture">
                <img src={profilePicture} className="profile-picture" alt="Photo de profil" />
            </div>
            <div className="message-content">
                <p>{content}</p>
            </div>
        </div>
    );
};

export { SentMessage, ReceivedMessage };
