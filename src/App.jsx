import {useEffect, useState} from 'react'
import './App.css'
import Navbar from "./Navbar/Navbar.jsx";
import ListDisc from "./ListDisc/ListDisc.jsx";
import Discussion from "./Discussion/Discussion.jsx";

function App() {
    const [selectedMessages, setSelectedMessages] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(null); // Ajout de l'état selectedIndex
    const [selectedProfilePicture, setSelectedProfilePicture] = useState(null);
    const [selectedName, setSelectedName] = useState(null);
    const [activeSection, setActiveSection] = useState('personnel');


    const resetDiscussionStates = () => {
        setSelectedMessages(null);
        setSelectedIndex(null);
        setSelectedProfilePicture(null);
        setSelectedName(null);
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
    }, []);

    return (
        <div className="app">
            <div className="navbar">
                <Navbar activeSection={activeSection} setActiveSection={handleSectionChange} />
            </div>
            <div className="listchat">
                <ListDisc
                    activeSection={activeSection}
                    setSelectedMessages={setSelectedMessages}
                    selectedIndex={selectedIndex}
                    setSelectedIndex={setSelectedIndex}
                    setSelectedProfilePicture={setSelectedProfilePicture}
                    setSelectedName={setSelectedName}
                />
            </div>
            <div className="discussion">
                {selectedMessages && <Discussion messages={selectedMessages}
                                                 profilePicture={selectedProfilePicture}
                                                 name={selectedName}
                                                 exitdiscussion = {exit_discussion}
                                    />
                }
            </div>
        </div>
    )
}

export default App
