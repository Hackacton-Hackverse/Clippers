import {useState, useEffect} from 'react';
import NavbarChat from "./Navbar-chat/Navbar-chat.jsx";
import ListDisc from "./ListDisc/ListDisc.jsx";
import Discussion from "./Discussion/Discussion.jsx";
import './conversation.css'
import axiosInstance from "../axios.js";

function Conversation(props) {
    const [selectedMessages, setSelectedMessages] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(null); // Ajout de l'état selectedIndex
    const [selectedProfilePicture, setSelectedProfilePicture] = useState(null);
    const [selectedName, setSelectedName] = useState(null);
    const [activeSection, setActiveSection] = useState('personnel');
    const [receiver_id, setReceiver_id] = useState(null)
    const [conversations, setConversations] = useState([]);
    const isAuthenticated = props.isAuthenticated
    const [conversation_id, setConversation_id] = useState(null)
    const [currentMessages, setCurrentMessages] = useState([]);


    const resetDiscussionStates = () => {
        setSelectedMessages(null);
        setSelectedIndex(null);
        setSelectedProfilePicture(null);
        setSelectedName(null);
        setReceiver_id(null)
    };

    const handleSectionChange = (section) => {
        setActiveSection(section);
        resetDiscussionStates();
    };

    const exit_discussion = () =>{
        resetDiscussionStates()
        const activeDiscussion = document.getElementsByClassName("discussion")
        activeDiscussion[0].style.display = "none"
    }

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                exit_discussion();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [exit_discussion]);

    useEffect(() => {
        let intervalId;
        if (isAuthenticated === true) {
            intervalId = setInterval(() => {
                axiosInstance.get(`/conversation`)
                    .then(function (response) {
                        const updatedConversations = response.data;
                        setConversations(updatedConversations);

                        // Mettre à jour currentMessages avec les messages de la conversation sélectionnée
                        const selectedConversationIndex = updatedConversations.findIndex(
                            conv => conv.conversation_id === conversation_id
                        );
                        if (selectedConversationIndex !== -1) {
                            setCurrentMessages(updatedConversations[selectedConversationIndex].messages);
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }, 1000);
        }

        return () => clearInterval(intervalId);
    }, [isAuthenticated, conversation_id]);

    return (
        <div className="conversation">
            <div className="navbar-chat">
                <NavbarChat activeSection={activeSection} setActiveSection={handleSectionChange} />
            </div>
            <div className="listchat">
                <ListDisc
                    activeSection={activeSection}
                    setSelectedMessages={setSelectedMessages}
                    selectedIndex={selectedIndex}
                    setSelectedIndex={setSelectedIndex}
                    setSelectedProfilePicture={setSelectedProfilePicture}
                    setSelectedName={setSelectedName}
                    messages = {conversations}
                    setReceiver_id = {setReceiver_id}
                    setConversation_id = {setConversation_id}
                    setCurrentMessages={setCurrentMessages}
                />
            </div>
            <div className="discussion">
                {selectedMessages && <Discussion messages={currentMessages}
                                                 profilePicture={selectedProfilePicture}
                                                 name={selectedName}
                                                 exitdiscussion = {exit_discussion}
                                                 receiver_id={receiver_id}
                                                 conversation_id={conversation_id}
                />
                }
            </div>
        </div>
    )
}

export default Conversation;