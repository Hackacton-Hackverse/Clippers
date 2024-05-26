import TemplateSingle from "./TemplateSingle.jsx";
import './ListDisc.css';
import { FaUserCircle } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import {useEffect, useState} from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css'
import axiosInstance from "../../axios.js";

function StartConversation(props) {
    const [formdata, setFormdata] = useState({
        email:'',
    });


    const handleChange = (e) => {
        const {name, value} = e.target
        setFormdata({
            ...formdata, [name]:value
        })
        console.log(formdata)
    }

    const startChat = async (e) => {
        e.preventDefault();
        if(formdata.email)
        {
            try{
                const response = await axiosInstance.post('/conversation',formdata);
                console.log(response.data)
            }catch (error){
                alert(error.response.data.message);
            }
        }
    }




    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Modal heading
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Entrer l'Email du destinataire</h4>
                <input name="email" type="text" value={formdata.email} onChange={handleChange}/>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={startChat}>Start to Chat</Button>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>

        </Modal>
    );
}

function ListDisc(props) {
    const a = props.messages;
    const [modalShow, setModalShow] =useState(false)


    const handleClick = (index, profilePicture, name) => {
        props.setSelectedIndex(index);
        props.setSelectedProfilePicture(profilePicture);
        props.setSelectedName(name);
        props.setReceiver_id(a[index].destinataireId);
        props.setConversation_id(a[index].conversation_id)
        props.setCurrentMessages(a[index].messages);
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
                <Button variant="primary" onClick={() => setModalShow(true)}>
                    Start new Chat
                </Button>

                <StartConversation
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />
                {/* eslint-disable-next-line react/prop-types */}
                { a && a.map((i,message) => (
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